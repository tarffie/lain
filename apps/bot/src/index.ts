// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

//create a new client instance 
const client = new Client({
    intents: [
	GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, (readyClient: any) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
