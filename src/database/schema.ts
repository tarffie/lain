import { text, pgTable, bigint, integer, uniqueIndex, serial } from 'drizzle-orm/pg-core';

// define users schema
export const UserSchema = pgTable('users', {
  id: bigint('id', { mode: 'bigint' }).primaryKey(),
  level: integer('level').default(1).notNull(),
});

// Define items schema
export const ItemSchema = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

// Define InventorySchema
export const InventorySchema = pgTable('inventory', {
  id: serial('id').primaryKey().notNull(),
  user_id: bigint('user_id', { mode: 'bigint' }).notNull().references(() => UserSchema.id),
  item_id: integer('item_id').notNull().references(() => ItemSchema.id),
  quantity: integer('quantity').default(1).notNull(),
}, (table) => ({
  uniquePlayerItem: uniqueIndex('unique_player_item').on(table.user_id, table.item_id),
}));