import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

import { i18n } from '@utils/i18n';
import { getItemById, getItemRowsSize } from '@repositories/itemRepository';

/**
 * Sets up the command.
 */
const data = new SlashCommandBuilder()
  .setName(i18n.__mf('drop.name'))
  .setDescription('drop.description');

/**
 * Handles the execution of the command.
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  let tableSize = await getItemRowsSize();
  if (tableSize === undefined) tableSize = 1

  let seed = Math.ceil(Math.random() * tableSize)

  let item = await getItemById(seed);

  const drop = new EmbedBuilder()
    .setTitle(item!.name)
    .setDescription(`${item!.description}\nreact with an emoji to claim it`)
    .setColor(0xc6a0f6)

  if (drop) {
    await interaction.reply(`here's your drop: `);
    await interaction.channel!.send({ embeds: [drop] })
  } else {
    await interaction.reply(`there was an item here but it's gone now. Try again later..`);
  }
};


export default {
  cooldown: 15,
  data,
  execute,
};
