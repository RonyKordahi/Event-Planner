# 1. The `/create-event` Slash Command

### What does this command do?

- Creates a scheduled event.
- Creates and assigns an organizer role for the person who ran the command.
- Creates a role for people who are interested in the event.
    - ⚠️ Does not automatically assign the attendee role to the person who created the event.
- Creates a text channel in the `MEET-UPS` category to discuss the event.
    - If a channel already exists, the bot will appropriate it for the event rather than create a new one.
- Create a description of the event.
- Set an image for the event.
- Set a color for the event roles.

### On success:

- Announces the event in the `event-planner` channel.
- Announces the event in the newly created text channel, or in the appropriated text channel.
- All the channels in the `MEET-UPS` category will be sorted alphabetically except the following channels:
    - `event-planner`
    - `📷event-photos`
    - `general-events`

### On fail:
- The bot will return an error message detailing what went wrong.

> ⚠️ Occasionally the bot will return a generic error message. If this happens double check the data you're sending to the bot.

### Who can use this command?

Everybody! There are no restrictions for using this command.

> ⚠️ The bot is not the fastest at processing slash commands, please be patient with it 🙏.

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---

# The Parameters

The `/create-event` slash command has 4 [required parameters](#the-required-parameters):

- [name](#parameter-name)
- [start-time](#parameter-start-time)
- [end-time](#parameter-end-time)
- [location](#parameter-location)

and 3 [optional parameters](#the-optional-parameters):

- [description](#parameter-description)
- [image](#parameter-image)
- [color](#parameter-color)

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---


## The Required Parameters

### Parameter: `name`

A **required** parameter. 

The `name` parameter is used to set the created event's name, the event related roles, and the event's text channel. 

Basically, everything revoles around this parameter.

> ⚠️ The bot does not accept special characters or emojis.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `start-time`

A **required** parameter. 

The `start-time` parameter is used to set the starting date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `end-time`

A **required** parameter. 

The `end-time` parameter is used to set the end date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `location`

A **required** parameter. 

The `location` parameter is used to determine where the event will take place. 

If the event is online, enter the name of the voice channel where it will take place. Otherwise simply paste the address.

> ⚠️ The name of the voice channel must be an exact match, capitals and all.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

## The Optional Parameters

### Parameter: `description`

An **optional** parameter. 

The `description` parameter is used to set the event's description.

If no description is provided, it will put the name of the organizer in the description by default.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `image`

An **optional** parameter. 

The `image` parameter is used to set the event's banner. 

Type `"random"` for a random picture!

> ⚠️ The bot only accepts a valid image URL, or the `random` option.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `color`

An **optional** parameter. 

The `color` parameter is used to set the color of the event roles created. Leave empty for the default color.

> ⚠️ You can only select a color from the list that the bot will provide.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)