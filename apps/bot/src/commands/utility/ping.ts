//export {};
import { SlashCommandBuilder } from 'discord.js';
export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction: any) {
        await interaction.reply('Pong');
    },
};
