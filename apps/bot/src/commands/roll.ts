import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
//import { rollDices } from '../utils/rollDice.ts';
import { rollDices } from '../utils/rollDice.js';
import { Die } from '../structs/Die.js';
//import { Die } from '../structs/Die.ts';

const testDie = new Die(20, 1, { advantage: 1, mod: 5 }, 1, 20, null);
export default {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('rolls n dice'),
  async execute(interaction: ChatInputCommandInteraction) {
    console.log(await rollDices(testDie));
    interaction.reply(`dice roll -> ${await rollDices(testDie)}`);
  },
};
