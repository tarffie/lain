import { Config } from '@interfaces/config.js';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

/**
 * Validates that all required environment variables are set and returns the configuration object.
 * Throws an error if any required environment variable is missing.
 */
function validateConfig(): Config {
  const {
    TOKEN,
    CLIENTID,
    GUILDID,
    LOCALE,
    POSTGRESDB_USER,
    POSTGRESDB_ROOT_PASSWORD,
    POSTGRESDB_URL,
    POSTGRESDB_DATABASE,
    POSTGRESDB_LOCAL_PORT,
  } = process.env;

  const requiredEnvVars = {
    TOKEN,
    CLIENTID,
    GUILDID,
    POSTGRESDB_USER,
    POSTGRESDB_ROOT_PASSWORD,
    POSTGRESDB_URL,
    POSTGRESDB_DATABASE,
    POSTGRESDB_LOCAL_PORT,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter((config) => !config[1])
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }

  return {
    TOKEN: TOKEN!,
    CLIENTID: CLIENTID!,
    GUILDID: GUILDID!,
    LOCALE: LOCALE || 'en',
    POSTGRESDB_USER: POSTGRESDB_USER!,
    POSTGRESDB_ROOT_PASSWORD: POSTGRESDB_ROOT_PASSWORD!,
    POSTGRESDB_URL: POSTGRESDB_URL!,
    POSTGRESDB_DATABASE: POSTGRESDB_DATABASE!,
    POSTGRESDB_LOCAL_PORT: POSTGRESDB_LOCAL_PORT!,
  };
}

/**
 * Checks if the config is valid and then sets the object.
 */
const config: Config = validateConfig();

export { config };
