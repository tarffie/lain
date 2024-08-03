import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandBooleanOption,
} from 'discord.js';
import { Die } from '../structs/Die.js';
import { i18n } from '../utils/i18n.js';
//import { Die } from '../structs/Die.ts';

const testDie = new Die(
  20,
  1,
  { mod: 5, advantage: true, disadvantage: false },
  null,
);
export default {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName(i18n.__mf('roll.name'))
    .setDescription(i18n.__mf('roll.description'))
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName(i18n.__mf('roll.dice.name'))
        .setDescription(i18n.__mf('roll.dice.description')),
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName(i18n.__mf('roll.option1.name'))
        .setDescription(i18n.__mf('roll.option1.description')),
    )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName(i18n.__mf('roll.advantage.name'))
        .setDescription(i18n.__mf('roll.advantage.description')),
    )
    .addBooleanOption((option: SlashCommandBooleanOption) =>
      option
        .setName(i18n.__mf('roll.disadvantage.name'))
        .setDescription(i18n.__mf('roll.disadvantage.description')),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply(
      `${i18n.__mf('roll.action')} ${await testDie.rollDice(testDie)}`,
    );
  },
};
