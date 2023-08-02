const moment = require('moment-timezone');
const containsEmoji = require('contains-emoji');
const { SlashCommandBuilder, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update-event")
        .setDescription("Update an event and it's details")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The name of the event.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("start-time")
                .setDescription("Change the start time and date of the event. If it doesn't need to change, type \"same\".")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("end-time")
                .setDescription("Change the end time and date of the event. If it doesn't need to change, type \"same\".")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("location")
                .setDescription("Change the location details of the event."))
        .addStringOption((option) =>
            option
                .setName("new-name")
                .setDescription("The new name of the event."))
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Let people know why you changed the event details!"))
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("Change the description of the event"))
        .addStringOption((option) =>
            option
                .setName("image")
                .setDescription("Change the image of the event. Type \"random\" for a random image!"))
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("Change the color of the roles associated to the event.")
                .setChoices(
                    { name: "Default", value: "Default" },
                    { name: "White", value: "White" },
                    { name: "Aqua", value: "Aqua" },
                    { name: "Green", value: "Green" },
                    { name: "Blue", value: "Blue" },
                    { name: "Yellow", value: "Yellow" },
                    { name: "Purple", value: "Purple" },
                    { name: "DarkPurple", value: "DarkPurple" },
                    { name: "LuminousVividPink", value: "LuminousVividPink" },
                    { name: "DarkVividPink", value: "DarkVividPink" },
                    { name: "Fuchsia", value: "Fuchsia" },
                    { name: "Gold", value: "Gold" },
                    { name: "Orange", value: "Orange" },
                    { name: "Red", value: "Red" },
                    { name: "DarkRed", value: "DarkRed" },
                    { name: "Grey", value: "Grey" },
                    { name: "Navy", value: "Navy" },
                    { name: "DarkGrey", value: "DarkGrey" },
                    { name: "DarkerGrey", value: "DarkerGrey" },
                    { name: "LightGrey", value: "LightGrey" },
                    { name: "Blurple", value: "Blurple" },
                    { name: "Greyple", value: "Greyple" },
                    { name: "NotQuiteBlack", value: "NotQuiteBlack" },
                    { name: "DarkButNotBlack", value: "DarkButNotBlack" },
                    { name: "Random", value: "Random" },
                )),

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
            const image = interaction.options.getString("image");
            const reason = interaction.options.getString("reason");
            const newName = interaction.options.getString("new-name");
            const location = interaction.options.getString("location");
            const description = interaction.options.getString("description");
            const scheduledEndTime = interaction.options.getString("end-time")
            const scheduledStartTime = interaction.options.getString("start-time")

            // Used in the role update
            const color = interaction.options.getString("color");

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

                // *************** //
                // Date Validation //
                // *************** //

                const dateRegex = /^(0[1-9]|1\d|2[0-4]):([0-5]\d) (0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[01])\/\d{4}$/;

                const now = new Date();
                const endTime = new Date(scheduledEndTime);
                const startTime = new Date(scheduledStartTime);

                const convertedEndTime = moment.tz(scheduledEndTime, "hh:mm MM/DD/YYYY", "America/Toronto");
                const utcEndTime = convertedEndTime.tz("UTC").format();

                const convertedStartTime = moment.tz(scheduledStartTime, "hh:mm MM/DD/YYYY", "America/Toronto");
                const utcStartTime = convertedStartTime.tz("UTC").format();

                if (now > startTime) {
                    await interaction.editReply("The `start-time` cannot be in the past!");
                }
                else if (now > endTime) {
                    await interaction.editReply("The `end-time` cannot be in the past!");
                }
                else if (startTime > endTime) {
                    await interaction.editReply("The `end-time` cannot come before the `start-time`!");
                }
                else if (!dateRegex.test(scheduledStartTime) && scheduledStartTime != "same") {
                    await interaction.editReply("Something is wrong with the `start-time`! Please follow this format: hh:mm MM/DD/YYYY and make sure the date is valid.");
                }
                else if (!dateRegex.test(scheduledEndTime) && scheduledEndTime !== "same") {
                    await interaction.editReply("Something is wrong with the `end-time`! Please follow this format: hh:mm MM/DD/YYYY and make sure the date is valid.");
                }
                else if (scheduledStartTime === scheduledEndTime && scheduledStartTime != "same" && scheduledEndTime !== "same") {
                    await interaction.editReply("The starting and `end-time`s cannot be the same!");
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
                        await interaction.editReply(`The ${name} event doesn't exist. Please check the spelling of the event name.`);
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
                            interaction.editReply("You can't update this event, you're not the organizer!");
                        }
                        else {

                            // *************** //
                            // Name Validation //
                            // *************** //

                            const regex = /[^A-Za-z0-9-_ ]/g;

                            if (containsEmoji(name)) {
                                await interaction.editReply("The event name cannot contain emojis!");
                            }
                            else if (regex.test(name)) {
                                await interaction.editReply("The event name cannot contain special characters!");
                            }
                            else {

                                // **************** //
                                // Image Validation //
                                // **************** //

                                // Regex that validates the image URL
                                // ↪ Thank you ChatGPT
                                const urlRegex = /^(https?:\/\/)/i;

                                let validImage;

                                // Validate the image if it exists
                                if (image) {

                                    // Test the image URL
                                    if (urlRegex.test(image)) {
                                        validImage = true;
                                    }
                                    // Check if the random option was selected
                                    else if (image === "random") {
                                        validImage = true;
                                    }
                                }

                                // Checking that the image provided is a valid URL or the random option
                                // ↪ Doing a reverse check so the reply doesn't go to the bottom, saving scroll time if an edit is needed
                                if (!validImage && image) {
                                    await interaction.editReply("Please provide a valid image URL, or use the \"random\" option!");
                                }
                                else {

                                    // ********************** //
                                    // Scheduled Event Update //
                                    // ********************** //

                                    // Get all the voice channels
                                    const voiceChannels = allChannels.filter(channel => {
                                        return channel.type === ChannelType.GuildVoice
                                    })

                                    // Finding the selected voice channel if there is one
                                    const selectedVoiceChannel = voiceChannels.find(channel => {
                                        return channel.name === location;
                                    });

                                    await event.edit({
                                        name: newName ? newName : name,
                                        scheduledEndTime: scheduledEndTime === "same" ? event.scheduledEndTime : utcEndTime,
                                        scheduledStartTime: scheduledStartTime === "same" ? event.scheduledStartTime : utcStartTime,
                                        channel: selectedVoiceChannel,
                                        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
                                        image: image === "random" ? "https://picsum.photos/500" : image ? image : event.image,
                                        entityMetadata: { location: selectedVoiceChannel ? "" : location ? location : event.entityMetadata.location },
                                        description: description ? `Event organizer: ${member.displayName}.\n\n${description}`: event.description,
                                        entityType: selectedVoiceChannel ? GuildScheduledEventEntityType.Voice : GuildScheduledEventEntityType.External,
                                    });

                                    // Create the event invite URL that generates an embed when pasted in a channel
                                    // ↪ Necessary to be created up here. Breaks the command if done too late in the code
                                    const eventUrl = await event.createInviteURL({ channel: interaction.channel, maxAge: 0 });





                                    // ************ //
                                    // Roles Update //
                                    // ************ //

                                    let eventRole;
                                    let organizerRole;

                                    // Only update the role names if a new event name or a new color was provided
                                    if (newName || color) {

                                        for (const role of roles.values()) {

                                            // need to make sure we don't delete the @everyone role, the bot's role, or roles that have similar names
                                            if (
                                                role.name === name
                                                && role.name !== "Event Planner"
                                                && role.name !== "@everyone"
                                                && role.name !== "@here"
                                                && role.name !== "Server Booster"
                                                && role.name !== "Bot"
                                            ) {

                                                if (newName) {
                                                    eventRole = await role.edit({ name: newName });
                                                }

                                                if (color) {
                                                    eventRole = await role.edit({ color });
                                                }
                                            }

                                            if (
                                                role.name === `${name} Organizer`
                                                && role.name !== "Event Planner"
                                                && role.name !== "@everyone"
                                                && role.name !== "@here"
                                                && role.name !== "Server Booster"
                                                && role.name !== "Bot"
                                            ) {

                                                if (newName) {
                                                    organizerRole = await role.edit({ name: `${newName} Organizer` });
                                                }

                                                if (color) {
                                                    organizerRole = await role.edit({ color });
                                                }
                                            }
                                        }
                                    }





                                    // ************** //
                                    // Channel Update //
                                    // ************** //

                                    // Top half of the code isn't inside the if because eventChannel is required to send the update message.

                                    // Thank you ChatGPT
                                    // Regex that keeps letters, numbers, dashes, underscores, and spaces
                                    const regex = /[^A-Za-z0-9-_ ]/g;

                                    // Remove anything not in the regex
                                    let oldChannelName = name.replace(regex, "").toLowerCase();

                                    // Replace all spaces with a dash
                                    oldChannelName = oldChannelName.replaceAll(" ", "-");

                                    const eventChannel = allChannels.find(textChannel => {
                                        return textChannel.name === oldChannelName;
                                    })

                                    // Moved out of the if to use it in the announcement
                                    let newChannelName;

                                    // Only update the channel name if a new event name was provided
                                    if (newName) {

                                        newChannelName = newName.replace(regex, "").toLowerCase();
                                        newChannelName = newChannelName.replace(" ", "-");

                                        await eventChannel.edit({ name: newChannelName });

                                        // Grab the interaction channel's category
                                        const category = interaction.channel.parent;

                                        // Get all channels
                                        // ↪ Necessary to re-fetch after updating the event channel
                                        const fetchedChannels = await interaction.guild.channels.fetch();

                                        // Get all text channels in the same category
                                        const textChannels = fetchedChannels.filter((channel) => {

                                            // Hardcoded: avoiding specific channels
                                            return channel.type === ChannelType.GuildText && channel.parentId === category.id && channel.name !== "📷event-photos" && channel.name !== "event-planner" && channel.name !== "general-events"
                                        });

                                        // Sort the channels alphabetically based on their names
                                        // ↪ Thank you ChatGPT
                                        const sortedChannels = textChannels.sort((a, b) => a.name.localeCompare(b.name));

                                        // Update the positions of the newly sorted channels. Start at 3 to avoid ordering first 3 channels
                                        // ↪ Thank you ChatGPT
                                        let position = 3;
                                        for (const channel of sortedChannels.values()) {
                                            await channel.setPosition(position++);
                                        }
                                    }





                                    // ********************* //
                                    // Confirmation Messages //
                                    // ********************* //

                                    // Edits the deferred reply
                                    // ↪ Only visible to the event organizer
                                    await interaction.editReply("Everything was updated successfully!");

                                    // Send a message to everybody
                                    // ↪ Conditionally add the reason to the message
                                    await interaction.channel.send(`
                                        ${member} has updated the \`${name}\` event!${reason ? `\nReason: ${reason}` : ""}
                                        \nChanges made include:${newName ? `\n- The event name is now \`${newName}\`.` : ""}${scheduledStartTime !== "same" ? `\n- The start time is now ${scheduledStartTime}.` : ""}${scheduledEndTime !== "same" ? `\n- The end time is now ${scheduledEndTime}.` : ""}${location ? `\n- The location is now \`${location}\`.` : ""}${description ? `\n- The description is now \`${description}\`.` : ""}${image ? `\n- The image has been updated!` : ""}${color ? `\n- The new role color is ${color}.` : ""}${eventRole ? `\n- The new event role is called ${eventRole}` : ""}${organizerRole ? `\n- The new event role is called ${organizerRole}` : ""}${newChannelName ? `\n- The name of the event channel changed from \`${oldChannelName}\` to ${eventChannel}` : `\n- Discuss event details here: ${eventChannel}`}

                                        \nCheck out the new event: ${eventUrl}
                                    `);

                                    // Send a message in the newly updated event channel
                                    const message = await eventChannel.send({
                                        content: `${member} has updated the \`${name}\` event!${reason ? `\nReason: ${reason}` : ""}
                                            \nChanges made include:${newName ? `\n- The event name is now \`${newName}\`.` : ""}${scheduledStartTime !== "same" ? `\n- The start time is now ${scheduledStartTime}.` : ""}${scheduledEndTime !== "same" ? `\n- The end time is now ${scheduledEndTime}.` : ""}${location ? `\n- The location is now \`${location}\`.` : ""}${description ? `\n- The description is now \`${description}\`.` : ""}${image ? `\n- The image has been updated!` : ""}${color ? `\n- The new role color is ${color.value}.` : ""}${eventRole ? `\n- The event role is now called ${eventRole}` : ""}${organizerRole ? `\n- The event organizer role is now called ${organizerRole}` : ""}${newChannelName ? `\n- The name of this channel changed from \`${oldChannelName}\` to \`${newChannelName}\`` : ""}

                                            \nCheck out the new event: ${eventUrl}
                                        `,
                                    });

                                    await message.pin();
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Something broke in the update-event slash command!")
            console.log(error)
            await interaction.editReply("Something went wrong! Please double check the data you're submitting.")
        }
    },
};