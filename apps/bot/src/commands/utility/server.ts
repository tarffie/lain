export {}; // there must be a better way to solve this ... 
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),
  async execute(interaction: any) {
    await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`);
  },
};

