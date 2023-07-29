require('dotenv').config();
const { Events } = require('discord.js');

const { guildId } = process.env;

module.exports = {
    name: Events.GuildScheduledEventUserRemove,

    async execute(guildScheduledEvent, user, client) {

        // try catch block used just in case of more unforseen errors
        try {
            // Partials required so past events and user subscriptions get cached
            if (user.partial) {

                // Fetches the missing user data
                await user.fetch();
            }

            if (guildScheduledEvent.partial) {
                // Fetches the missing event data
                // ↪ Super unlikely, but is here just in case
                await guildScheduledEvent.fetch();
            }

            // Get the  guild (server)
            const guild = await client.guilds.cache.get(guildId);

            // Get the member who subscribed
            const member = await guild.members.fetch(user.id);

            // Fetch all the roles
            const roles = await guild.roles.fetch();

            for (const role of roles.values()) {

                // need to make sure we don't delete the @everyone role, the bot's role, or roles that have similar names
                if (role.name === guildScheduledEvent.name && role.name !== "Event Planner" && role.name !== "@everyone") {

                    await member.roles.remove(role);
                }
            }
        } catch (error) {
            console.log("Something broke in the unsubscribe event!")
            console.log(error)
        }
    },
};