const Discord = require('discord.js');
const Levels = require('discord-xp');
const client = new Discord.Client();
const mongoose = require('./Database/mongoose');
const fs = require('fs');
require('dotenv').config();
require('discord-buttons')(client);

Levels.setURL(`mongodb+srv://discordbot:${process.env.PASS}@bot.svvb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
client.commands = new Discord.Collection();

client.on("ready", () => {
    client.user.setActivity('discord.js', { type: 'WATCHING'});

    const activities = [
        `${client.guilds.cache.size} servers!`,
        `${client.channels.cache.size} channels!`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
    ];

    let i = 0;
    setInterval(() => client.user.setActivity(`${prefix}help | ${activities[i++ % activities.length ]}`, { type: 'WATCHING'}), 15000);

});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once (event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

mongoose.init();
client.login(process.env.token);