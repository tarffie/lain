import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageReaction,
  User,
} from 'discord.js';

import { i18n } from '@utils/i18n';
import { getItemById, getItemRowsSize } from '@repositories/itemRepository';
import { getOrCreateInventory, updateInventory } from '@repositories/inventoryRepository';
import { getUserById } from '@repositories/userRepository';
import { getOrCreatePlayer } from '@repositories/playerRepository';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName(i18n.__mf('drop.name'))
  .setDescription('drop.description')

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  // TODO: refactor execute command
  const userDb = await getUserById(BigInt(interaction.user.id))
  const playerDb = await getOrCreatePlayer(userDb!)


  let tableSize = await getItemRowsSize();
  if (tableSize === undefined || tableSize === 2) tableSize = 1;

  let seed = Math.ceil(Math.random() * tableSize);

  let item = await getItemById(seed);

  let inventoryDb = await getOrCreateInventory(playerDb?.id!);

  const drop = new EmbedBuilder()
    .setTitle(item!.name)
    .setDescription(`${item!.description}\nreact with an emoji to claim it`)
    .setColor(0xc6a0f6)

  const dropMessage = await interaction.reply({ embeds: [drop], fetchReply: true });

  const collectorFilter = (reaction: MessageReaction, user: User) => {
    return reaction.emoji.name !== undefined && !user.bot// Make sure bots are excluded
  };

  const collector = dropMessage.createReactionCollector({ filter: collectorFilter, time: 15000 });

  collector.on('collect', async () => {
    await interaction.followUp(`${interaction.user.username} claimed the item! ${item!.name}`);

    inventoryDb!.item_id = item!.id;
    inventoryDb!.quantity += 1;

    await updateInventory(inventoryDb!);

    collector.stop();
  })

  collector.on('end', async collected => {
    if (collected.size === 0) {
      await interaction.followUp('No one claimed the item');
    }
  })
}

export default {
  cooldown: 15,
  data,
  execute,
};
