import { text, pgTable, bigint, integer } from 'drizzle-orm/pg-core';

// Define players schema
export const PlayerSchema = pgTable('players', {
  id: integer('id').primaryKey(),
  username: text('username').notNull().unique()
  .references(() => UserSchema.username),
  level: integer('level').default(1).notNull(),
});

// define users schema
export const UserSchema = pgTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  username: text('username').notNull().unique(),
  count: integer('count').notNull().default(0)
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