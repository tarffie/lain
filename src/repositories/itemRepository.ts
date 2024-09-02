import { db } from '@database/db'
import { Item } from '@interfaces/item'

export const getItemById = async (id: number): Promise<Item | undefined> => {
  const item = await db.query.ItemSchema.findFirst({
    where: (item, { eq }) => eq(item.id, id)
  })

  return item
};

export const getItemRowsSize = async (): Promise<number | undefined> => {
  const rows = await db.query.ItemSchema.findMany();
  return Object.keys(rows).length
}