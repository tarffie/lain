import { db } from '@database/db';
import { PlayerSchema as players } from '@database/schema';
import { Player } from '@interfaces/player';
import { eq } from 'drizzle-orm/expressions';

export const getPlayerById = async (id: number): Promise<Player | undefined> => {
  const player = await db.query.PlayerSchema.findFirst({
    where: (player, { eq }) => eq(player.id, id),
  });

  return player
}

export const updatePlayer = async (player: Player) => {
  await db
    .update(players)
    .set({ level: player.level })
    .where(eq(players.id, player.id));
};