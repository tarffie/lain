import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      if (!(interaction.guild == undefined)) {
        interaction.reply(
          `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`,
        );
      }
    } catch (e) {
      const error = e as Error;
      console.error(`There was an exception: ${error}. "${error.message}"`);
    }
  },
};
