# 3. The `/cancel-event` Slash Command

### What does this command do?

- Deletes a scheduled event.
- Deletes the event roles (both organizer and attendee roles).
- Deletes the event's text channel in the `MEET-UPS` category.

### On success:

- Announces the cancellation in the `event-planner` channel.
- If provided, lists the reason for the event's cancellation.

### On fail:
- The bot will return an error message detailing what went wrong.

>⚠️ Occasionally the bot will return a generic error message. If this happens double check the data you're sending to the bot.

### Who can use this command?

Only the event organizer can cancel the event.

> ⚠️ Mods are allowed to cancel events.

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---

# The Parameters

The `/cancel-event` slash command has 1 [required parameters](#the-required-parameters):

- [name](#parameter-name)

and 1 [optional parameters](#the-optional-parameters):

- [reason](#parameter-reason)

[Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)

---

## The Required Parameters

### Parameter: `name`

A **required** parameter. 

The `name` parameter is used to identify which event to delete.

> ⚠️ The name of the event must be an exact match, capitals and all.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

### Parameter: `delete-channel`

A **required** parameter. 

The `delete-channel` parameter is used to determine whether or not to delete the event's text-channel.

> ⚠️ You can only select an option from the list that the bot will provide.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command)

---

## The Optional Parameters

### Parameter: `reason`

An **optional** parameter. 

The `reason` parameter is used to let others know why the event was deleted.

[Back to Parameters](#the-parameters) | [Back to top](#1-the-create-event-slash-command) | [Back to README](../README.md)