import { SlashCommandBuilder,
  ChatInputCommandInteraction,
  GuildMessageManager,     
  MessageResolvable,
} from 'discord.js'
//import { checkPermissions } from '../utils/checkPermissions.js'

export default {
    cooldown: 2,
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('moderators can clear the channel when needed'),
  async execute(interaction: ChatInputCommandInteraction) {
    
    /*
     * for now the command only deletes 100 messages and they cannot be older than 0 days
     */

    const messages: GuildMessageManager = interaction.channel.messages
    const target: Promise<Message> = await messages.fetch()
    
    
    for(const message of target.keys()) {
      await messages.delete(message)
    }
    
    await interaction.reply('clear command was used here ..')
  }
}

