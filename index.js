// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE =================== //

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

require('dotenv').config();
const { token } = process.env;

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildScheduledEvents],
    partials: [Partials.GuildScheduledEvent, Partials.User],
});





// **************** //
// Commands Section //
// **************** //
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}





// ************** //
// Events Section //
// ************** //
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        // client can be called upon when needed by passing it as an argument
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Log in to Discord with your client's token
client.login(token);