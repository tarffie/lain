import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('moderators can clear the channel when needed');

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const messages = interaction.channel!.messages;
  const target = await messages?.fetch();

  if (target) {
    for (const message of target.keys()) {
      try {
        await messages?.delete(message);
      } catch (err) {
        break
      }
    }
  }

  interaction.reply('Cleared.');
};

export default {
  cooldown: 2,
  data,
  execute,
};
