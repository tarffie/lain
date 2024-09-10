import { db } from '@database/db';
import { InventorySchema as inventories } from '@database/schema';
import { Inventory } from '@interfaces/inventory';
import { Item } from '@interfaces/item';
import { User } from '@interfaces/user';
import { and, eq } from 'drizzle-orm/expressions'

/**
 * Get inventory by Inventory ID
 */
export const getInventoryById = async (id: number): Promise<Inventory | undefined> => {
  const inventory = await db.query.InventorySchema.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, id),
  });

  return inventory
}
/**
 * Find specific inventory by player id and item id 
 */
export const findInventory = async (item: Item, user: User): Promise<Inventory> => {
  const inventory = await db.query.InventorySchema.findFirst({
    where: (inventory, { eq }) => and(
      eq(inventory.user_id, user.id),
      eq(inventory.item_id, item.id),
    )
  });

  return inventory!;
}

// create new inventory 
export const createInventory = async (user_id: bigint, item_id: number, quantity: number) => {
  let inventory = { user_id, item_id, quantity }
  await db.insert(inventories).values(inventory);
}

/**
 * Search for all inventory owned by certain player
 */
export const getInventoryByUserId = async (id: bigint): Promise<Inventory | Inventory[] | undefined> => {
  const inventory = await db.query.InventorySchema.findMany({
    where: (inventory, { eq }) => eq(inventory.user_id, id),
  });

  return inventory
}

/**
 * check how many inventory rows we have stored
 */
export const getInventoryRowCount = async (): Promise<number | undefined> => {
  const rows = await db.query.InventorySchema.findMany();
  return Object.keys(rows).length
}

/**
 * update specific inventory, one at a time
 */
export const updateInventory = async (inventory: Inventory) => {
  await db
    .update(inventories)
    .set({ item_id: inventory.item_id, quantity: inventory.quantity })
    .where(eq(inventories.id, inventory.id))
}

/** 
 * check if player has specific item
 */
export const inventoryHasItem = async (item: Item, user: User): Promise<boolean> => {
  const inventoryDb = await db.query.InventorySchema.findFirst({
    where: (fields, { eq }) => and(
      eq(fields.item_id, item.id),
      eq(fields.user_id, user.id),
    )
  });

  return inventoryDb !== undefined ? true : false
}
