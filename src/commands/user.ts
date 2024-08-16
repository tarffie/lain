import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.');

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply(`This command was run by·${interaction.user.username}`);
}

export default {
  data,
  execute
};
