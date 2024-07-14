export {}; 
const commands = [];
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);
for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.ts'));    
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
	    commands.push(command.data.toJSON());
	} else {
	    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
    }
}
// construct and prepare for an instance of the REST module
const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), 
            { body: commands}, 
        );
        console.log(`Succesfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

