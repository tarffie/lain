import { ChatInputCommandInteraction, PermissionResolvable } from 'discord.js'
import { Command } from '../interfaces/Commands.js'

export interface PermissionResult {
    result: boolean
    missing: string[]
}

export async function checkPermissions(
    command: Command,
    interaction: ChatInputCommandInteraction
): Promise<PermissionResult> {

    const member = await interaction
        .guild!
        .members
        .fetch({ user: interaction.client.user!.id })
    const requiredPermissions = command.permissions as PermissionResolvable[]

    if (!(command.permissions)) return { result: true, missing: [] }
    const missing = member.permissions.missing(requiredPermissions)
    return { result: !missing.length, missing }
}
