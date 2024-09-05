import { db } from '@database/db';
import { UserSchema as users } from '@database/schema';
import { User } from '@interfaces/user';
import { eq } from 'drizzle-orm/expressions';

export const getUserById = async (id: bigint): Promise<User | undefined> => {
  const user = await db.query.UserSchema.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });

  return user
};

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
  const user = await db.query.UserSchema.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  return user
}


export const createUser = async (user: User) => {
  await db.insert(users).values(user);
};


export const updateUser = async (user: User) => {
  await db
    .update(users)
    .set({ count: user.count })
    .where(eq(users.id, user.id));
};

export const getOrCreateUser = async (user: User): Promise<User | void> => {
  let dbUser = await getUserById(user.id)
  if (!dbUser) {
    dbUser = { id: user.id, username: user.username }
    createUser(dbUser!)
  } else {
    return dbUser;
  }
}