// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { clientId, guildId, token } = require('../config.json');
const { Client, Collection, Events, GatewayIntentBits, Routes } = require('discord.js');

//create a new client instance 
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
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

const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs.readdirSync(eventsPath).filter((file: any) => file.endsWith('.ts'));

for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) { 
        client.once(event.name, (...args:any) => event.execute(...args));
    } else {
        client.on(event.name, (...args:any) => event.execute(...args));
    }
}

client.login(token);
