import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { i18n } from '../utils/i18n.js';

export default {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping.description'),
  async execute(interaction: ChatInputCommandInteraction) {
    return await interaction.reply({
      content: i18n.__mf('ping.message'),
      ephemeral: true,
    });
  },
};
