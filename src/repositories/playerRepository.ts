import { db } from '@database/db';
import { PlayerSchema as players } from '@database/schema';
import { Player } from '@interfaces/player';
import { getOrCreateUser } from '@repositories/userRepository'
import { User } from '@interfaces/user'
import { eq } from 'drizzle-orm/expressions';

export const getPlayerById = async (id: number): Promise<Player | undefined> => {
  const player = await db.query.PlayerSchema.findFirst({
    where: (player, { eq }) => eq(player.id, id),
  });

  return player
}

const getPlayerByUsername = async (username: string): Promise<Player | undefined> => {
  const player = await db.query.PlayerSchema.findFirst({
    where: (player, { eq }) => eq(player.username, username),
  });

  return player
}

export const createPlayer = async (player: Player) => {
  await db.insert(players).values(player);
};


export const getPlayerRowCount = async (): Promise<number | undefined> => {
  const rows = await db.query.PlayerSchema.findMany();
  return Object.keys(rows).length
}

export const updatePlayer = async (player: Player) => {
  await db
    .update(players)
    .set({ level: player.level })
    .where(eq(players.id, player.id));
};

export const getOrCreatePlayer = async (user: User): Promise<Player | void> => {
  let dbUser = await getOrCreateUser(user);
  let dbPlayer = await getPlayerByUsername(String(dbUser?.username))
  if (!dbPlayer) {
    let id = await getPlayerRowCount();
    if (!id) id = 0;
    dbPlayer = { id: id, username: user.username, level: 0 }
    createPlayer(dbPlayer);
  } else {
    return dbPlayer; 
  }
}