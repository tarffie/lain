import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageReaction,
  User,
} from 'discord.js';

import { i18n } from '@utils/i18n';
import { getItemById, getItemRowsSize } from '@repositories/itemRepository';
import { createInventory, findInventory,  inventoryHasItem, updateInventory } from '@repositories/inventoryRepository';
import { getOrCreateUser } from '@repositories/userRepository';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName(i18n.__mf('drop.name'))
  .setDescription(i18n.__mf('drop.description'))

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  // TODO: refactor execute command
  const userDb = await getOrCreateUser(BigInt(interaction.user.id))


  let tableSize = await getItemRowsSize() || 1;

  let seed = Math.ceil(Math.random() * tableSize);
  let item = await getItemById(seed);

  const drop = new EmbedBuilder()
    .setTitle(item!.name)
    .setDescription(`${item!.description}\nreact with an emoji to claim it`)
    .setColor(0xc6a0f6)

  const dropMessage = await interaction.reply({ embeds: [drop], fetchReply: true });

  const collectorFilter = (reaction: MessageReaction, user: User) => reaction.emoji.name !== undefined && !user.bot;
  const collector = dropMessage.createReactionCollector({ filter: collectorFilter, time: 15000 });

  collector.on('collect', async () => {
    await interaction.followUp(`${interaction.user.username} claimed the item! ${item!.name}`);

    if (await inventoryHasItem(item!, userDb!)) {
      let inventory = await findInventory(item!, userDb!);

      inventory!.quantity += 1;

      await updateInventory(inventory);
    } else {

      await createInventory(userDb.id, item!.id, 1);
    }
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
