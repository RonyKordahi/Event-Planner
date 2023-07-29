# Event Planner

Welcome to the `Event Planner Discord Bot`!

This is a little bot I put together to create and manage server events (AKA scheduled events).

It uses case sensitive name matching to execute it's functions.

---

## Commands: 

The bot has 3 slash commands that can be executed by any members:

1. `/create-event`: creates an event
2. `/update-event`: updates an event
3. `/cancel-event`: cancels and deletes an event

Each command have their own set of parameters, some are required while others are optional.

---

# 1. The `/create-event` Slash Command

Creates a scheduled event, an event organizer role, an event attendee role, and a text channel to discuss the event in based on the parameters provided.

If the command succeeds, a message will be displayed in the `event-planner` channel and in the event's newly created text channel. Also all `MEET-UPS` text channels will be sorted alphabetically.

## The Required Parameters

### Parameter: `name`

A **required** parameter. The `name` parameter is used to set the created event's name, the event related roles, and the event's text channel.

> ⚠️ The bot does not accept special characters or emojis.

### Parameter: `location`

A **required** parameter. The `location` parameter is used to determine where the event will take place. If the event is online, enter the name of the voice channel where it will take place. Otherwise simply paste the address.

> ⚠️ The name of the voice channel must be an exact match, capitals and all.

### Parameter: `start-time`

A **required** parameter. The `start-time` parameter is used to set the starting date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

### Parameter: `end-time`

A **required** parameter. The `end-time` parameter is used to set the ending date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

## The Optional Parameters

### Parameter: `description`

An **optional** parameter. The `description` parameter is used to set the event's description.

### Parameter: `color`

An **optional** parameter. The `color` parameter is used to set the color of the event roles created. Leave empty for the default color.

> ⚠️ You can only select a color from the provided list that the bot will provide.

### Parameter: `image`

An **optional** parameter. The `image` parameter is used to set the event's banner. Leave empty for no image, or type `random` for a random picture!

> ⚠️ The bot only accepts a valid image URL, or the `random` option.

---

# 2. The `/update-event` Slash Command

Updates a scheduled event's information based on the parameters provided. Any parameter that is not provided will not be modified.

If the command succeeds, a message will be displayed in the `event-planner` channel and in the event's text channel. Also all `MEET-UPS` text channels will be sorted alphabetically.

## The Required Parameters

### Parameter: `name`

A **required** parameter. The `name` parameter is used to identify which event to update.

> ⚠️ The name of the event must be an exact match, capitals and all.

## The Optional Parameters

### Parameter: `new-name`

An **optional** parameter. The `new-name` parameter is used to modify the original name of the event, the name of the roles associated with the event, and the name of the event's text channel.

### Parameter: `reason`

An **optional** parameter. The `reason` parameter is used to let others know why the changes were made.

### Parameter: `location`

An **optional** parameter. The `location` parameter is used to determine where the event will take place. You can use this to change the voice channel or the address of the event.

### Parameter: `start-time`

An **optional** parameter. The `start-time` parameter is used to set the starting date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

### Parameter: `end-time`

An **optional** parameter. The `end-time` parameter is used to set the ending date and time of the event.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

### Parameter: `description`

An **optional** parameter. The `description` parameter is used to set the event's description.

### Parameter: `color`

An **optional** parameter. The `color` parameter is used to set the color of the event roles created. Leave empty for the default color.

> ⚠️ You can only select a color from the provided list that the bot will provide.

### Parameter: `image`

An **optional** parameter. The `image` parameter is used to set the event's banner. Leave empty for no image, or type `random` for a random picture!

> ⚠️ The bot only accepts a valid image URL, or the `random` option.

---

# 3. The `/cancel-event` Slash Command

Deletes the event, the roles associated to it, and the event's text channel based on the parameters provided.

If the command succeeds, a message will be displayed in the `event-planner` channel.

## The Required Parameters

### Parameter: `name`

A **required** parameter. The `name` parameter is used to identify which event to update.

> ⚠️ The name of the event must be an exact match, capitals and all.

## The Optional Parameters

### Parameter: `reason`

An **optional** parameter. The `reason` parameter is used to let others know why the event was deleted.