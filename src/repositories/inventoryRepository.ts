import { db } from '@database/db';
import { InventorySchema as inventories } from '../database/schema';
import { Inventory } from '@interfaces/inventory';
import { eq } from 'drizzle-orm/expressions'

export const getInventoryById = async (id: number): Promise<Inventory | undefined> => {
  const inventory = await db.query.InventorySchema.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, id),
  });

  return inventory !== undefined
    ? {
      id: inventory.id,
      player_id: inventory.player_id,
      item_id: inventory.item_id,
      quantity: inventory.quantity
    }
    : undefined;
}

export const updateInventory = async (inventory: Inventory) => {
  await db
    .update(inventories)
    .set({ quantity: inventory.quantity })
    .where(eq(inventories.id, inventory.id))
}