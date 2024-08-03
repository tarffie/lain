import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { i18n } from '../utils/i18n.js';
//import { i18n } from '../utils/i18n.ts';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: ChatInputCommandInteraction) {
    const name = interaction.guild?.name
    const memberCount = interaction.guild?.memberCount
    try {
      if (!(interaction.guild == undefined)) {
        await interaction.reply({
          content: `${i18n.__mf('server.serverStatus', name, memberCount)}`,
//          content: i18n.__mf('server.serverStatus', name, memberCount),
          ephemeral: false,
        });
                }
    } catch (e) {
      const error = e as Error;
      console.error(`There was an exception: ${error}. "${error.message}"`);
    }
  },
};
//`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`,

