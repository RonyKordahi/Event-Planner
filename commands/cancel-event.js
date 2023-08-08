const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cancel-event")
        .setDescription("Cancel an event :(")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The name of the event.")
                .setRequired(true))
        .addBooleanOption(option =>
            option
                .setName("delete-channel")
                .setDescription("Whether or not to delete the event's text channel.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for cancelling the event.")),

    async execute(interaction) {

        // ************* //
        // Start Command //
        // ************* //

        // Delays the reply because the action takes too long
        // ↪ Shows "Event Planner is thinking..." instead of "Sending command..."
        await interaction.deferReply({ ephemeral: true });





        // try catch block used just in case of more unforseen errors
        try {
            // ****************** //
            // Slash Command Data //
            // ****************** //

            // The name of the event sent through the slash command
            const name = interaction.options.getString("name");
            const reason = interaction.options.getString("reason");
            const deleteChannel = interaction.options.getBoolean("delete-channel");

            // Member data sent through the interaction
            // ↪ Used to validate the event organizer role
            const member = interaction.member;





            // ***************************** //
            // Intended Channel Verification //
            // ***************************** //

            // Get all channels
            const allChannels = await interaction.guild.channels.fetch();

            // Find the intended bot channel
            const botChannel = allChannels.find(channel => {
                return channel.name === "event-planner";
            })

            // Checking that the slash command was used in the intended channel
            // ↪ Doing a reverse check so the interaction doesn't go to the bottom, saving scroll time if an edit is needed
            if (interaction.channel.name !== botChannel.name) {
                await interaction.editReply(`This is the wrong channel!\nPlease run your command in the ${botChannel} channel.`);
            }
            else {

                // **************** //
                // Event Validation //
                // **************** //

                // Find the event
                const events = await interaction.guild.scheduledEvents.fetch();

                const event = await events.find(e => {
                    return e.name === name;
                });

                // Checking that the event exists
                // ↪ Doing a reverse check so the reply doesn't go to the bottom, saving scroll time if an edit is needed
                if (!event) {
                    await interaction.editReply(`The \`${name}\` event doesn't exist. Please check the spelling of the event name.`);
                }
                else {

                    // ********************************** //
                    // Organizer / Mod / Owner Validation //
                    // ********************************** //

                    // Get all the roles
                    const roles = await interaction.guild.roles.fetch();

                    // Get all the roles of the member who ran the slash command
                    const memberRoles = await member.roles.cache;

                    // Find out if the member cancelling the event is the organizer, a mod, or the server owner
                    let mod = false;
                    let organizer = false;
                    let owner = interaction.guild.ownerId === interaction.user.id;

                    for (const role of roles.values()) {

                        for (const memberRole of memberRoles.values()) {

                            // Check for event member role and event organizer role
                            if (
                                memberRole.name === role.name
                                && role.name.includes(name)
                                && memberRole.name.includes(name)
                                && role.name.includes("Organizer")
                                && memberRole.name.includes("Organizer")
                            ) {
                                organizer = true;
                            }
                            // check for mod role
                            else if (memberRole.name === "Mod") {
                                mod = true;
                            }
                        }
                    }

                    // Only the event organizer, the server mods or the server owner are allowed to run the command
                    // ↪ Doing a reverse check so the reply doesn't go to the bottom, saving scroll time if an edit is needed
                    if (!(organizer || mod || owner)) {
                        interaction.editReply("You can't delete this event, you're not the organizer!");
                    }
                    else {

                        // ************************ //
                        // Scheduled Event Deletion //
                        // ************************ //

                        await event.delete();





                        // ************** //
                        // Roles Deletion //
                        // ************** //

                        for (const role of roles.values()) {

                            // Probably don't need so many checks, but they are here just in case
                            if (
                                role.name === name
                                || role.name === `${name} Organizer`
                                && role.name !== "Event Planner"
                                && role.name !== "@everyone"
                                && role.name !== "@here"
                                && role.name !== "Server Booster"
                                && role.name !== "Bot"
                            ) {
                                await role.delete();
                            }
                        }





                        // **************** //
                        // Channel Deletion //
                        // **************** //

                        // Grab the text channel to announce the deletion

                        // Thank you ChatGPT
                        // Regex that keeps letters, numbers, dashes, underscores, and spaces
                        const regex = /[^A-Za-z0-9-_ ]/g;

                        // Remove anything not in the regex
                        let channelName = name.replace(regex, "").toLowerCase();

                        // Replace all spaces with a dash
                        channelName = channelName.replaceAll(" ", "-");

                        const eventChannel = allChannels.find(textChannel => {
                            return textChannel.name === channelName
                        })

                        // Only delete the text channel if it was specified
                        if (deleteChannel) {

                            await eventChannel.delete();

                        }



                        // ********************* //
                        // Confirmation Messages //
                        // ********************* //

                        // Edits the deferred reply
                        // ↪ Only visible to the event organizer
                        await interaction.editReply("The event was cancelled and everything was deleted successfully!");

                        // Send a message to everybody
                        // ↪ Conditionally add the reason to the message
                        await interaction.channel.send(`
                            ${member} has cancelled the \`${name}\` event!
                            ${reason ? `\nReason: ${reason}` : ""}
                        `);

                        if (!deleteChannel) {

                            const message = await eventChannel.send({
                                content: `
                                    ${member} has cancelled the \`${name}\` event!
                                    ${reason ? `\nReason: ${reason}` : ""}
                                `,
                            });

                            await message.pin();
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Something broke in the cancel-event slash command!")
            console.log(error)
            await interaction.editReply("Something went wrong! Please double check the data you're submitting.")
        }
    },
};