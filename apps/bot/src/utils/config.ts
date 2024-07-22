import { Config } from '../interfaces/Config.js'
import dotenv from 'dotenv'
let config: Config

await dotenv.config()

config = {
    TOKEN: process.env.TOKEN || "",
    CLIENTID: process.env.CLIENTID || "",
    GUILDID: process.env.GUILDID || "",
    LOCALE: process.env.LOCALE || "en",
}

export { config }
