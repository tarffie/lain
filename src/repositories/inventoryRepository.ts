import { db } from '@database/db';
import { InventorySchema as inventories } from '@database/schema';
import { Inventory } from '@interfaces/inventory';
import { eq } from 'drizzle-orm/expressions'

export const getInventoryById = async (id: number): Promise<Inventory | undefined> => {
  const inventory = await db.query.InventorySchema.findFirst({
    where: (inventory, { eq }) => eq(inventory.id, id),
  });

  return inventory
}

const createInventory = async (inventory: Inventory) => {
  await db.insert(inventories).values(inventory);
}

export const getInventoryByPlayerId = async (id: number): Promise<Inventory | undefined> => {
  const inventory = await db.query.InventorySchema.findFirst({
    where: (inventory, { eq }) => eq(inventory.player_id, id),
  });

  return inventory
}

const getInventoryRowCount = async (): Promise<number | undefined> => {
  const rows = await db.query.InventorySchema.findMany();
  return Object.keys(rows).length
}

export const updateInventory = async (inventory: Inventory) => {
  await db
    .update(inventories)
    .set({ item_id: inventory.item_id, quantity: inventory.quantity })
    .where(eq(inventories.id, inventory.id))
}

export const getOrCreateInventory = async (id: number): Promise<Inventory | void> => {
  let dbInventory = await getInventoryByPlayerId(id);

  if (!dbInventory) {
    const idInv = await getInventoryRowCount();

    // item_id = -1 means inventory is empty
    dbInventory = { id: idInv!, player_id: id, item_id: -1, quantity: 1 }

    await createInventory(dbInventory);
  } else {
    return dbInventory;
  }
}
