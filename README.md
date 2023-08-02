# Event Planner

Welcome to the `Event Planner Discord Bot`!

This is a little bot I put together to create and manage server events (AKA scheduled events).

It uses case sensitive name matching to execute it's functions.

---

# Commands: 

The bot has 3 slash commands that can be executed by any members:

### 1. [/create-event](./instructions/create-event.md)
### 2. [/update-event](./instructions/update-event.md)
### 3. [/cancel-event](./instructions/cancel-event.md)

> ⚠️ Each command have their own set of required and optional parameters.

---

# Other interactions

## Subscribing to an Event

The bot will assign you the event's attendee role if you mark yourself as interested in attending an event.

The sole purpose of this role is to make it easier to communicate with other attendees by mentioning the role. 

Eg: `@Example Event`

## Unsubscribing from an Event

The bot will unassign you the event's attendee role if you remove yourself as interested in attending an event.

---

# Resources Used

This bot was created with the help of the `Discord.js` documentation.

1. [The Guide](https://discordjs.guide/#before-you-begin)
2. [The Documentation (v14.11.0)](https://old.discordjs.dev/#/docs/discord.js/14.11.0/general/welcome)
3. [The Discord Server](https://discord.com/invite/djs)
4. [ChatGPT](https://chat.openai.com/chat) (for regex generation)