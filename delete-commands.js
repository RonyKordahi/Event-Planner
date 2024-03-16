const { REST, Routes } = require('discord.js');

require('dotenv').config();
const { clientId, guildId, token } = process.env;

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);