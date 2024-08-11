import { SlashCommandBuilder,
  ChatInputCommandInteraction,
  Collection,
  DMMessageManager,
  GuildMessageManager,     
  Message,
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

    const messages: GuildMessageManager | DMMessageManager | undefined = interaction.channel?.messages
    const target: Collection<string, Message<boolean>> | undefined = await messages?.fetch()

    if(target !== undefined)  {
      for(const message of target.keys()) {
        await messages?.delete(message)
      }
      interaction.reply('cleared')
    } else {
      interaction.reply('there were nothing to clear')
    }
  }
}

