import { text, pgTable, bigint, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  user: text('username'),
  count: integer('count').notNull(),
});
