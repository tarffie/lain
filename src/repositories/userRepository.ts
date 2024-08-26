import { db } from '@database/db.js';
import { users } from '@database/schema';
import { User } from '@interfaces/user';
import { eq } from 'drizzle-orm/expressions';

export const getUserById = async (id: bigint): Promise<User | undefined> => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
  return user !== undefined
    ? { id: user.id, user: user.user, count: user.count }
    : undefined;
};

export const createUser = async (user: User) => {
  await db.insert(users).values(user);
};

export const updateUser = async (user: User) => {
  await db
    .update(users)
    .set({ count: user.count })
    .where(eq(users.id, user.id));
};
