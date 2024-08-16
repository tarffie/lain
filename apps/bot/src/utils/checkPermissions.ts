import { ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';
import { Command } from '../interfaces/commands.js';

export interface PermissionResult {
  result: boolean;
  missing: string[];
}

/**
 * Checks if the user executing the command has the required permissions.
 *
 * @param command - The command to be executed.
 * @param interaction - The interaction containing the command execution context.
 * @returns An object indicating whether the user has the required permissions and any missing permissions.
 */
export async function checkPermissions(
  command: Command,
  interaction: ChatInputCommandInteraction,
): Promise<PermissionResult> {
  const member = await interaction.guild!.members.fetch({
    user: interaction.client.user!.id,
  });

  const requiredPermissions = command.permissions as PermissionResolvable[];

  if (!command.permissions) return { result: true, missing: [] };
  const missing = member.permissions.missing(requiredPermissions);

  return { result: !missing.length, missing };
}
