/**
 * Configuration settings for the application.
 */
export interface Config {
  // bot parameters
  TOKEN: string;
  CLIENTID: string;
  GUILDID: string;
  LOCALE: string;

  // database parameters
  POSTGRESDB_USER: string;
  POSTGRESDB_ROOT_PASSWORD: string;
  POSTGRESDB_URL: string;
  POSTGRESDB_DATABASE: string;
  POSTGRESDB_DOCKER_PORT: string;
}
