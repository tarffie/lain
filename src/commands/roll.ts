import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandIntegerOption,
  SlashCommandBooleanOption,
} from 'discord.js';

import { Die } from '../structs/die.js';
import { i18n } from '../utils/i18n.js';

/**
 * The time in seconds to the user to be able to use the command aga
 */
const cooldown = 5;

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName(i18n.__mf('roll.name'))
  .setDescription(i18n.__mf('roll.description'))
  .addIntegerOption((option: SlashCommandIntegerOption) =>
    option
      .setName(i18n.__mf('roll.qty.name'))
      .setDescription(i18n.__mf('roll.qty.description')),
  )
  .addIntegerOption((option: SlashCommandIntegerOption) =>
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
  );

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const opts = interaction.options;

  const quantity = opts.getInteger(i18n.__mf('roll.qty.name')) ?? 1;
  const sides = opts.getInteger(i18n.__mf('roll.dice.name')) ?? 20;
  const mod = opts.getInteger(i18n.__mf('roll.modifiers.name')) ?? 0;
  const dis = opts.getBoolean(i18n.__mf('roll.disadvantage.name')) ?? false;
  const adv = opts.getBoolean(i18n.__mf('roll.advantage.name')) ?? false;

  const modifiers = { mod, disadvantage: dis, advantage: adv };
  const die = new Die(sides, quantity, modifiers);

  const message = i18n.__mf('roll.action', { number: die.rollDice(die) });
  await interaction.reply(message);
};

export default {
  cooldown,
  data,
  execute
};