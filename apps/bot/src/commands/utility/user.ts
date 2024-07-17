//export {};
import { SlashCommandBuilder } from 'discord.js';
export default {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction: any) {
        await interaction.reply(
            `This·command·was·run·by·${interaction.user.username},·who·joined·on${interaction.member.joinedAt}`,
        );
    },
};
