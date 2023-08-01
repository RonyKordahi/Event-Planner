const moment = require('moment-timezone');
const containsEmoji = require('contains-emoji');
const { SlashCommandBuilder, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-event")
        .setDescription("Create an event!")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The name of the event.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("location")
                .setDescription("If the event is online, enter the name of the voice channel. Paste the address if it's in person.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("start-time")
                .setDescription("The start time and date of the event. Please follow this format: hh:mm MM/DD/YYYY.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("end-time")
                .setDescription("The end time and date of the event. Please follow this format: hh:mm MM/DD/YYYY.")
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("Let people know what this event is about!"))
        .addStringOption((option) =>
            option
                .setName("image")
                .setDescription("You can provide a URL to an image to set it as the event banner. Type \"random\" for a random image!"))
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("You can pick a color for the new roles that will be created!")
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

            // Data sent through the slash command
            const name = interaction.options.getString("name");
            const image = interaction.options.getString("image");
            const location = interaction.options.getString("location");
            const description = interaction.options.getString("description");
            const scheduledEndTime = interaction.options.getString("end-time")
            const scheduledStartTime = interaction.options.getString("start-time")

            // Used in the role creation
            const color = interaction.options.getString("color");

            // Member data sent through the interaction
            // ↪ Used to set the event organizer's name in the description and give them the event roles
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
            // ↪ Doing a reverse check so the reply doesn't go to the bottom, saving scroll time if an edit is needed
            if (interaction.channel.name !== botChannel.name) {
                await interaction.editReply(`This is the wrong channel!\nPlease run your command in the ${botChannel} channel.`);
            }
            else {

                // *************** //
                // Name Validation //
                // *************** //

                // Regex that checks for special characters
                // ↪ Thank you ChatGPT
                const nameRegex = /[^A-Za-z0-9-_ ]/g;

                if (containsEmoji(name)) {
                    await interaction.editReply("The event name cannot contain emojis!");
                }
                else if (nameRegex.test(name)) {
                    await interaction.editReply("The event name cannot contain special characters!");
                }
                else {

                    // *************** //
                    // Date Validation //
                    // *************** //

                    // Regex that validates the date format
                    // ↪ Thank you ChatGPT
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
                    else if (!dateRegex.test(scheduledStartTime)) {
                        await interaction.editReply("Something is wrong with the `start-time`! Please follow this format: hh:mm MM/DD/YYYY and make sure the date is valid.");
                    }
                    else if (!dateRegex.test(scheduledEndTime)) {
                        await interaction.editReply("Something is wrong with the `end-time`! Please follow this format: hh:mm MM/DD/YYYY and make sure the date is valid.");
                    }
                    else if (scheduledStartTime === scheduledEndTime) {
                        await interaction.editReply("The starting and `end-time`s cannot be the same!");
                    }
                    else {

                        // **************************** //
                        // Duplicate Event Verification //
                        // **************************** //

                        const eventName = interaction.options.getString("name");

                        // Get all events
                        const events = await interaction.guild.scheduledEvents.fetch();

                        // Find a duplicate event
                        const duplicateEvent = await events.find(e => {
                            return e.name === eventName;
                        });

                        // Checking if a duplicate event exists
                        if (duplicateEvent) {
                            await interaction.editReply(`This event already exists! Please use a different name.`);
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


                                // ************************ //
                                // Scheduled Event Creation //
                                // ************************ //

                                // Get all the voice channels
                                const voiceChannels = allChannels.filter(channel => {
                                    return channel.type === ChannelType.GuildVoice
                                })

                                // Finding the selected voice channel if there is one
                                const selectedVoiceChannel = voiceChannels.find(channel => {
                                    return channel.name === location;
                                });

                                // Create the event (dynamically sets the entityType, entityMetadata, and channel)
                                const event = await interaction.guild.scheduledEvents.create({
                                    name,
                                    scheduledEndTime: utcEndTime,
                                    scheduledStartTime: utcStartTime,
                                    channel: selectedVoiceChannel,
                                    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
                                    image: image === "random" ? "https://picsum.photos/500" : image,
                                    entityMetadata: { location: selectedVoiceChannel ? "" : location },
                                    description: `Event organizer: ${member.displayName}.\n${description ? description : ""}`,
                                    entityType: selectedVoiceChannel ? GuildScheduledEventEntityType.Voice : GuildScheduledEventEntityType.External,
                                })

                                // Create the event invite URL that generates an embed when pasted in a channel
                                // ↪ Necessary to be created up here. Breaks the command if done too late in the code
                                const eventUrl = await event.createInviteURL({ channel: interaction.channel, maxAge: 0 });






                                // ************** //
                                // Roles Creation //
                                // ************** //

                                // Create new role for the subscribers of the event
                                const eventRole = await interaction.guild.roles.create({ name, color });

                                // Create new role for the organizer of the event
                                const organizerRole = await interaction.guild.roles.create({ name: `${name} Organizer`, color });

                                // Add roles to the member who ran the command
                                await member.roles.add([organizerRole]);





                                // ********************* //
                                // Text Channel Creation //
                                // ********************* //

                                // Grab the interaction channel's category
                                const category = interaction.channel.parent;

                                // Regex that keeps letters, numbers, dashes, underscores, and spaces
                                // ↪ Thank you ChatGPT
                                const regex = /[^A-Za-z0-9-_ ]/g;

                                // Remove anything not in the regex
                                let channelName = name.replace(regex, "").toLowerCase();

                                // Replace all spaces with a dash
                                channelName = channelName.replace(" ", "-");

                                // Check if the text channel already exists or not
                                const foundChannel = allChannels.find(textChannel => {
                                    return textChannel.name === channelName;
                                })

                                // Must be outside of the if so it can be used lower in the code (scope issue)
                                let eventChannel;

                                // Create a text channel for the scheduled event, if it doesn't already exists
                                // ↪ Discord auto formats the name of the channel, no need to clean it ourselves
                                if (!foundChannel) {
                                    eventChannel = await interaction.guild.channels.create({ name, type: ChannelType.GuildText, parent: category });

                                    // Get all channels
                                    // ↪ Necessary to re-fetch after creating the event channel
                                    const fetchedChannels = await interaction.guild.channels.fetch();

                                    // Get all text channels in the same category
                                    const textChannels = fetchedChannels.filter((channel) => {

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
                                await interaction.editReply(`
                                    You have successfully created the \`${name}\` event!
                                    \nAs the organizer, you have the ${organizerRole} role.
                                    \nAnybody who marks themselves as interested will get the ${eventRole} role.
                                    \nPS: Don't forget to mark yourself as interested! The bot can't do that for you.
                                `);

                                // Send a message to everybody
                                await interaction.channel.send(`
                                    ${member} has created the \`${name}\` event!
                                    \nIf you mark yourself as interested will get the ${eventRole} role.
                                    \nDiscuss event details here: ${foundChannel ? foundChannel : eventChannel}
                                    \nCheck out the event: ${eventUrl}
                                `);

                                // Send a message in the newly created event channel
                                let message;
                                if (foundChannel) {

                                    message = await foundChannel.send({
                                        content: `
                                            \n${member} is organizing an event. They have been assigned the ${organizerRole} role.
                                            \nIf you mark yourself as interested will get the ${eventRole} role.
                                            \nEvent info: ${eventUrl}
                                        `
                                    })
                                }
                                else if (eventChannel) {

                                    message = await eventChannel.send({
                                        content: `
                                            Welcome to the \`${name}\` event channel!
                                            \n${member} is the event organizer. They have been assigned the ${organizerRole} role.
                                            \nIf you mark yourself as interested will get the ${eventRole} role.
                                            \nEvent info: ${eventUrl}
                                        `,
                                    });
                                }

                                await message.pin();
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Something broke in the create-event slash command!")
            console.log(error)
            await interaction.editReply("Something went wrong! Please double check the data you're submitting.")
        }
    },
};