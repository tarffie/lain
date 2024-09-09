import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';

import { i18n } from '@utils/i18n';
import { getOrCreateInventory } from '@repositories/inventoryRepository';
import { getUserById } from '@repositories/userRepository';
import { getOrCreatePlayer } from '@repositories/playerRepository';

/**
 * The time in seconds to the user to be able to use the command again
 */
const cooldown = 5;

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName(i18n.__mf('inventory.name'))
  .setDescription(i18n.__mf('inventory.description'))

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const userDb = await getUserById(BigInt(interaction.user.id))
  const playerDb = await getOrCreatePlayer(userDb!)

  let inventoryDb = await getOrCreateInventory(playerDb?.id!);

  await interaction.reply({ content: String(inventoryDb), ephemeral: true }) // [object Object]
  /** I need to threat the ouput for content */
}

export default {
  cooldown,
  data,
  execute,
};
