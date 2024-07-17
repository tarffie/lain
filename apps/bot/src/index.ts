// Require the necessary discord.js classes
import { join, dirname } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

declare module 'discord.js' {
    interface Client {
        commands: Collection<any, any>;
        cooldowns: Collection<any, any>;
    }
};

//create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

const commandsFolders: any = readdirSync(join(__dirname, './commands'));
for (const folder of commandsFolders) {
    const commandsPath = join(__dirname, './commands');
    const commandsFiles: any = readdirSync(commandsPath).filter((file: any) => file.endsWith('.js'));

    for (const file of commandsFiles) {

        const filePath = join(commandsPath, file);
        const command: any = typeof import(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property!`,
            );
        }
    }
}

const eventsPath = join(__dirname, 'events');
const eventsFiles = await readdirSync(eventsPath).filter((file: any) => file.endsWith('.ts'));

for (const file of eventsFiles) {
    const filePath = join(eventsPath, file);
    const event = await import(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
dotenv.config();
client.login(process.env.token);
