import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandStringOption,
} from 'discord.js';

import { i18n } from '@utils/i18n';
import { getOrCreateUser, updateUser } from '@repositories/userRepository';


/**
 * The time in seconds to the user to be able to use the command again
 */
const cooldown = 5;

/**
 * Sets up the command.
 */

const data = new SlashCommandBuilder()
  .setName(i18n.__mf('register.name'))
  .setDescription(i18n.__mf('register.description'))
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setRequired(true)
      .setName(i18n.__mf('register.user.name'))
      .setDescription(i18n.__mf('register.user.description')),
  );

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {

  const opt = interaction.options;
  const id = BigInt(interaction.user.id);
  const user = opt.getString(i18n.__mf('register.user.name'));

  let dbUser = await getOrCreateUser({ id: id, user: user })

  if (!dbUser) {
    await interaction.reply(`${user} was registered succesfully.`);
  } else {
    dbUser.count! += 1

    await updateUser(dbUser);

    await interaction.reply(
      `${user} was already registered, count: ${dbUser.count}`,
    );
  }
};

export default {
  cooldown,
  data,
  execute,
};
