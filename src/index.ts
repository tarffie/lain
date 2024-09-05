import { Client, GatewayIntentBits } from 'discord.js';
import { Bot } from '@structs/bot.js';

export const bot = new Bot(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions
    ],
  })
);
