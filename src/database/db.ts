// Drizzle & neondatabase for database connection with postgres
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
// our config files
import { config } from '@utils/config.js';
import * as schema from './schema';

const assemblePostgresConnectionString = () => {
  const user = config.POSTGRESDB_USER || 'postgres';
  const password = config.POSTGRESDB_ROOT_PASSWORD || '';
  const url = config.POSTGRESDB_URL || 'localhost';
  const database = config.POSTGRESDB_DATABASE || 'postgres';
  const port = config.POSTGRESDB_DOCKER_PORT || '5433';

  return `postgresql://${user}:${password}@${url}:${port}/${database}`;
};

const pool = new pg.Pool({
  connectionString: assemblePostgresConnectionString(),
});

export const db = drizzle(pool, { schema });
