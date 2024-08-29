import { varchar, text, pgTable, bigint, integer } from 'drizzle-orm/pg-core';

// define users schema
export const users = pgTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  user: varchar('username'),
  count: integer('count').notNull().default(0)
});

// Define players schema
export const PlayerSchema = pgTable('players', {
  id: integer('id').primaryKey(),
  level: integer('level').default(1).notNull(),
});

// Define items schema
export const ItemSchema = pgTable('items', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

// Define InventorySchema
export const InventorySchema = pgTable('inventory', {
  id: integer('id').primaryKey(),
  player_id: integer('player_id')
    .notNull()
    .references(() => PlayerSchema.id), // Foreign key referencing PlayerSchema
  item_id: integer('item_id')
    .notNull()
    .unique()
    .references(() => ItemSchema.id), // Foreign key referencing ItemSchema
  quantity: integer('quantity').default(1).notNull(), // Assuming default quantity is 1
});