require("dotenv").config();

const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Start BC bot!");
});
app.get("/", (req, res) => {
    res.send("Hello from BC bot");
});

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


const fs = require("fs");

client.commands = new Collection();
client.values = new Collection();

const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
});


const PREF = "!bc";
const PUNCH = "!punch";
const VIKING = "!v";
const SLOT = "!slot";

client.on("ready", () => {

    client.commands.get('database').init();

    client.commands.get('read').database = client.commands.get('database');
    client.commands.get('read').discord = client;
    client.commands.get('read').init();

    client.commands.get('viking').database = client.commands.get('database').database;
    client.commands.get('viking').discord = client;
    client.commands.get('viking').init();

    client.commands.get('slot').bc = client.commands.get('read');
    client.commands.get('slot').discord = client;

    console.log(`${client.user.username} is ready`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const msg = message.content.trim().toLowerCase();
    const args = msg.split(/\s+/);

    if (msg.startsWith(PUNCH))
        return client.commands.get('punch').process(message, args);

    if (msg.startsWith(VIKING))
        return client.commands.get('viking').process(message, args);

    if (msg.startsWith(SLOT))
        return client.commands.get('slot').process(message, args);

    if (msg.startsWith(PREF))
        return client.commands.get('read').process(message, args);

})

client.login(process.env.token);

