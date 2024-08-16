import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

/**
 * Represents a command for the Discord bot.
 */
export interface Command {
  permissions?: string[];
  cooldown?: number;
  data: SlashCommandBuilder;
  execute(...args: unknown[]): ChatInputCommandInteraction<CacheType>;
}
