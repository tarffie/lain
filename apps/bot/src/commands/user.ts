import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      // this part for some reason breaks when compared with strict equal operator
      if (!(interaction.member === undefined)) {
        interaction.reply(
          `This command was run by·${interaction.user.username}`,
        );
      }
    } catch (e: unknown) {
      console.error('interaction.user was undefined.\n');
      console.error(e as Error);
    }
  },
};
