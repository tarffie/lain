import { Client, GatewayIntentBits } from 'discord.js'
import { Bot } from "./structs/Bot.js"

export const bot = new Bot(
    new Client({
        intents: [GatewayIntentBits.Guilds]
    })
)
