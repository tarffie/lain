import { Config } from '../interfaces/Config.js';
import dotenv from 'dotenv';

await dotenv.config();

const config: Config = {
  TOKEN: process.env.TOKEN || '',
  CLIENTID: process.env.CLIENTID || '',
  GUILDID: process.env.GUILDID || '',
  LOCALE: process.env.LOCALE || 'en',
};

export { config };
