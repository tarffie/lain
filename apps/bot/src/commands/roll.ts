import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandBooleanOption,
} from 'discord.js';
import { Die } from '../structs/Die.js';
import { i18n } from '../utils/i18n.js';
//import { Die } from '../structs/Die.ts';

export default {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName(i18n.__mf('roll.name'))
    .setDescription(i18n.__mf('roll.description'))
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName(i18n.__mf('roll.qty.name'))
        .setDescription(i18n.__mf('roll.qty.description')),
    ).addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName(i18n.__mf('roll.dice.name'))
        .setDescription(i18n.__mf('roll.dice.description')),
    )
    .addIntegerOption((option: SlashCommandIntegerOption) =>
      option
        .setName(i18n.__mf('roll.modifiers.name'))
        .setDescription(i18n.__mf('roll.modifiers.description')),
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
    const qty = interaction.options.getInteger(i18n.__mf('roll.qty.name')) ?? 1 
    const sides = interaction.options.getInteger(i18n.__mf('roll.dice.name')) ?? 20
    const modifiers = {
      mod: interaction.options.getInteger(i18n.__mf('roll.modifiers.name')) ?? 0,
      disadvantage: interaction.options.getBoolean(i18n.__mf('roll.advantage.name')) ?? false,
      advantage: interaction.options.getBoolean(i18n.__mf('roll.disadvantage.name')) ?? false
    }
    const die = new Die(sides, qty, {mod: modifiers.mod, advantage: modifiers.advantage, disadvantage: modifiers.disadvantage})
    console.log(
      await die.rollDice(die)
    )
    interaction.reply(
      `${i18n.__mf('roll.action')} ${await die.rollDice(die)}`,
    );
  },
};
