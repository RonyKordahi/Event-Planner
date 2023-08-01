# 2. The `/update-event` Slash Command

### What does this command do?

Based on the parameters provided, it can:

- Update the name of the event.
- Update the event roles' names (both organizer and attendee roles).
- Update the event roles' colors (both organizer and attendee roles).
- Update the starting time of the event.
- Update the end time of the event.
- Update the location of the event.
- Update the name of the text channel in the `MEET-UPS` category.
- Update the description of the event.
- Update the image of the event.

### On success:

- Announces the update in the `event-planner` channel and in the event's text channel.
- Lists all the changes done in the update in the `event-planner` channel and in the event's text channel.

### On fail:
- The bot will return an error message detailing what went wrong.

>⚠️ Occasionally the bot will return a generic error message. If this happens double check the data you're sending to the bot.

### Who can use this command?

Only the event organizer can update the event.

> ⚠️ Mods are allowed to update events.

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---

# The Parameters

The `/update-event` slash command has 3 [required parameters](#the-required-parameters):

- [name](#parameter-name)
- [start-time](#parameter-start-time)
- [end-time](#parameter-end-time)

and 6 [optional parameters](#the-optional-parameters):

- [location](#parameter-location)
- [new-name](#parameter-new-name)
- [reason](#parameter-reason)
- [description](#parameter-description)
- [image](#parameter-image)
- [color](#parameter-color)

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---

## The Required Parameters

### Parameter: `name`

A **required** parameter. The `name` parameter is used to identify which event to update.

> ⚠️ The name of the event must be an exact match, capitals and all.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `start-time`

An **required** parameter. The `start-time` parameter is used to update the starting date and time of the event.

If the `start-time` doesn't need to be modified, send `"same"` and it won't be modified.

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

An **required** parameter. The `end-time` parameter is used to set the ending date and time of the event.

If the `end-time` doesn't need to be modified, send `"same"` and it won't be modified.

> ⚠️ The bot only accepts the following format: `hh:mm MM/DD/YYYY`
>
> ⚠️ Time must be submitted in 24h format.
> 
> Examples: 
> - Morning: `10:00 07/29/2023`
> - Evening: `19:00 07/29/2023`

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

## The Optional Parameters

### Parameter: `location`

An **optional** parameter. The `location` parameter is used to determine where the event will take place. 

You can use this to change the voice channel or the address of the event.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `new-name`

An **optional** parameter. The `new-name` parameter is used to modify the original name of the event, the name of the roles associated with the event, and the name of the event's text channel.

Basically, almost everything will be changed by this parameter.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `reason`

An **optional** parameter. The `reason` parameter is used to let others know why the changes were made.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `description`

An **optional** parameter. The `description` parameter is used to set the event's description.

If no description is provided, it will put the name of the organizer in the description by default.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `image`

An **optional** parameter. The `image` parameter is used to set the event's banner. 

Type `"random"` for a random picture!

> ⚠️ The bot only accepts a valid image URL, or the `random` option.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `color`

An **optional** parameter. The `color` parameter is used to set the color of the event roles created. Leave empty for the default color.

> ⚠️ You can only select a color from the provided list that the bot will provide.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)