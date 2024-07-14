// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { clientId, guildId, token } = require('../config.json');
const { Client, Collection, Events, GatewayIntentBits, Routes } = require('discord.js');

//create a new client instance 
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token);
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.ts'));
    for (const file of commandsFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
	    client.commands.set(command.data.name, command);
	} else {
	    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property!`);
	}
    }
}

client.once(Events.ClientReady, (readyClient: any) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async( interaction: any) => {
    if(!interaction.isChatInputCommand()) return; 
    const command = interaction.client.commands.get(interaction.commandName);
    
    if(!command) {
	console.error(`No command matching ${interaction.commandName} was found.`);
	return;
    }

    try { 
	await command.execute(interaction);
    } catch(error) {
	console.error(error);
	if (interaction.replied || interaction.deferred) {
	    await interaction.followUp({ content: 'There was an error while executing command!', ephemeral: true });
	} else { 
	    await interaction.reply({ content: 'There was an error while executing command!', ephemeral: true });
	}
    }
});
