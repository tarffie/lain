import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export interface Command {
  permissions?: string[];
  cooldown?: number;
  data: SlashCommandBuilder;
  execute(...args: unknown[]): ChatInputCommandInteraction<CacheType>;
}
