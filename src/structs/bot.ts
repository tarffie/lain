import {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  Interaction,
  REST,
  Routes,
  Snowflake,
  CacheType,
} from 'discord.js';

import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from '@utils/config.js';
import { i18n } from '@utils/i18n.js';
import { checkPermissions } from '@utils/checkPermissions.js';
import { MissingPermissionsException } from '@errors/permissionMissing.js';
import { Command } from '@interfaces/commands.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/*
 * The base class for the `quest-aventure` bot :D. It store commands and all the stuff needed to run
 * the entire application.
 */
export class Bot {
  public readonly prefix = '/';
  public commands = new Collection<string, Command>();
  public slashCommands = new Array<ApplicationCommandDataResolvable>();
  public slashCommandsMap = new Collection<string, Command>();
  public cooldowns = new Collection<string, Collection<Snowflake, number>>();

  public constructor(public readonly client: Client) {
    this.initializeClient();
  }

  /*
   * Method for starting all the listeners for discord events.
   */
  private initializeClient(): void {
    console.log("Starting bot...");

    this.client.login(config.TOKEN).catch(console.error);

    this.client.on(
      Events.InteractionCreate,
      this.onInteractionCreate.bind(this),
    );
    this.client.on(Events.ClientReady, this.onReady.bind(this));
    this.client.on(Events.Warn, console.warn);
    this.client.on(Events.Error, console.error);
  }

  /**
   * Event handler for when the client is ready.
   * Registers slash commands and logs the bot's username.
   */
  private onReady(): void {
    console.log(`${this.client.user!.username} is ready!`);
    this.registerSlashCommands().catch(console.error);
  }

  /**
   * Reads the command files from the commands directory.
   * @returns {string[]} An array of command file names.
   */
  private getCommandFiles(): string[] {
    return readdirSync(join(__dirname, '..', 'commands')).filter(
      (file) => file.endsWith('.js') || file.endsWith('.ts'),
    );
  }

  /**
   * Register a single slash command out of a file. If it fails then it just logs the error.
   */
  private async registerSlashCommand(file: string) {
    try {
      const path = join(__dirname, '..', 'commands', file);
      const command = await import(path);
      const commandData = command.default.data;
      this.slashCommands.push(commandData);
      this.slashCommandsMap.set(commandData.name, command.default);
      this.cooldowns.set(commandData.name, new Collection());
    } catch (e) {
      const error = e as Error;
      console.error(`Failed to load command file ${file}:`, error);
    }
  }

  /**
   * Register slash commands using the `commands` folder.
   */
  private async registerSlashCommands() {
    const rest = new REST({ version: '9' }).setToken(config.TOKEN);

    const commandFiles = this.getCommandFiles();

    for (const file of commandFiles) {
      await this.registerSlashCommand(file);
    }

    await rest.put(Routes.applicationCommands(this.client.user!.id), {
      body: this.slashCommands,
    });
  }

  /**
   * On interaction create event that we receive from discord.
   */
  private async onInteractionCreate(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = this.slashCommandsMap.get(interaction.commandName);

    if (!command) return;

    if (await this.isInCooldown(interaction, command.cooldown || 0)) {
      return;
    }

    try {
      const permissionsCheck = await checkPermissions(command, interaction);

      if (permissionsCheck.result) {
        command.execute(interaction as ChatInputCommandInteraction<CacheType>);
      } else {
        throw new MissingPermissionsException(permissionsCheck.missing);
      }
    } catch (e) {
      this.handleErrorMessage(e, interaction);
    }
  }

  /**
   * Handles errors related to commands and replies to the user.
   */
  private async handleErrorMessage(e: unknown, interaction: ChatInputCommandInteraction<CacheType>) {
    const error = e as Error;
    console.error(error);

    const content = error instanceof MissingPermissionsException
      ? error.toString()
      : i18n.__('common.errorCommand');

    await interaction.reply({ content, ephemeral: true }).catch(console.error);
  }

  /**
   * Function that checks if some user is in cooldown.
   */
  private async isInCooldown(
    interaction: ChatInputCommandInteraction<CacheType>,
    cooldown: number,
  ): Promise<boolean> {
    const now = Date.now();
    const timestamps = this.cooldowns.get(interaction.commandName)!;
    const cooldownAmount = cooldown * 1000;

    const timestamp = timestamps.get(interaction.user.id);

    if (timestamp) {
      const expirationTime = timestamp + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;

        await interaction.reply({
          content: i18n.__mf('common.cooldownMessage', {
            time: timeLeft.toFixed(1),
            name: interaction.commandName,
          }),
          ephemeral: true,
        });
        return true;
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    return false;
  }
}
