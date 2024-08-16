import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { i18n } from '../utils/i18n.js';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Provides information about the server.');

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const name = interaction.guild?.name;
  const memberCount = interaction.guild?.memberCount;
  const content = i18n.__mf('server.serverStatus', name, memberCount);
  await interaction.reply({ content, ephemeral: false });
};

export default {
  data,
  execute
};