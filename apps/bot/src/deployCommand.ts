export { };
const commands: any = [];
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
const foldersPath = join(__dirname, 'commands');
const commandsFolders = readdirSync(foldersPath);
for (const folder of commandsFolders) {
    const commandsPath = join(foldersPath, folder);
    const commandsFiles = readdirSync(commandsPath)
        .filter((file: any) => file.endsWith('.js'));
    for (const file of commandsFiles) {
        const filePath = join(commandsPath, file);
        const command: any = import(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
            );
        }
    }
}
dotenv.config();
// construct and prepare for an instance of the REST module
const rest = new REST().setToken(process.env.token as string);

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`,
        );
        const data: any = await rest.put(
            Routes.applicationGuildCommands(process.env.clientId as string, process.env.guildId as string),
            { body: commands },
        );
        console.log(
            `Succesfully reloaded ${data.length} application (/) commands.`,
        );
    } catch (error) {
        console.error(error);
    }
})();

