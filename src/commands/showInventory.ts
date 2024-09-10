import {
  EmbedBuilder,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';

import { eq } from 'drizzle-orm/expressions';

import { i18n } from '@utils/i18n';
import { getUserById } from '@repositories/userRepository';
import { db } from '@database/db';
import { InventorySchema as inventories, ItemSchema as items } from '@database/schema';

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

  const inventory = await db.select()
    .from(inventories)
    .innerJoin(items, eq(items.id, inventories.item_id))
    .where(eq(inventories.user_id, userDb!.id));

  const itemsStr = inventory.map((join) =>
    `${join.inventory.quantity}x ${join.items.name}`).join("\n")
  const inv = new EmbedBuilder()
    .setTitle('your inventory')
    .setDescription(itemsStr)
    .setColor(0xEAAA00)

  await interaction.reply({ embeds: [inv], ephemeral: true }) // [object Object]
  /** I need to threat the ouput for content */
}

export default {
  cooldown,
  data,
  execute,
};
