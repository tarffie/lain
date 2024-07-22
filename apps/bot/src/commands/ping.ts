import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { bot } from '../index.js'
//import { i18n } from '../utils/i18n'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Pong');
    },
};
