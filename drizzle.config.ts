import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

const assemblePostgresConnectionString = () => {
  const user = process.env.POSTGRESDB_USER || 'postgres';
  const password = process.env.POSTGRESDB_ROOT_PASSWORD || '';
  const url = process.env.POSTGRESDB_URL || 'localhost';
  const database = process.env.POSTGRESDB_DATABASE || 'postgres';
  const port = process.env.POSTGRESDB_DOCKER_PORT|| '5433';

  return `postgresql://${user}:${password}@${url}:${port}/${database}`;
};

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: assemblePostgresConnectionString()!,
  },
});
