import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { i18n } from '../utils/i18n.js';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('ping.description');

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  interaction.reply({
    content: i18n.__mf('ping.message'),
    ephemeral: true,
  });
};

export default {
  cooldown: 5,
  data,
  execute,
};
