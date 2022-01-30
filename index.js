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

client.on("ready", () => {
    client.commands.get('database').init();
    client.commands.get('database').client = client;
    client.commands.get('punch').database =  client.commands.get('database');

    client.commands.get('read').readValue((val) => {
        currentValue = val;
        console.log(currentValue);
    });

    console.log(`${client.user.username} is ready`);

    // let thanos = client.users.fetch('192163960814960650');
    // thanos.then((result1) => {
    //     //put your code that uses the result1 (the user object) here
    //     //for example, you could do var imgURL = result1.displayAvatarURL();
    //     console.log(result1.username);
    // });

    setInterval(() => {
        //console.log(" timetout");
        client.commands.get('read').execute(() => {
            currentValue = client.commands.get('read').value;

            client.commands.get('database').updateValues(currentValue);
        });
    }, 300000);
});

const fs = require("fs");

client.commands = new Collection();
client.values = new Collection();

const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
cmdFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
});


const PREF = "!bc";
const PUNCH = "!punch"
let currentValue = 0;


client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    const msg = message.content.trim().toLowerCase();
    const args = msg.split(/\s+/);

    if (msg.startsWith(PUNCH))
        return client.commands.get('punch').punch(message, args);

    if (!msg.startsWith(PREF)) return;
    client.commands.get('read').execute(() => {
        currentValue = client.commands.get('read').value;
        client.commands.get('database').currentValue = currentValue;

        if (args[1] === "help" || args[1] === "h")
            return client.commands.get('database').helpMessage(message);

        if (args[1] === "assets" || args[1] === "a")
            return client.commands.get('database').readAssets(message);

        if (args[1] === "top" || args[1] === "t")
            return client.commands.get('database').readTop(message);

        if (args[1] === "graph" || args[1] === "g")
            return client.commands.get('database').readValues(message);

        client.commands.get('database').readUser(message.author.id, (data) => {
            if (data === 0)
                return message.reply("Atvainojiet, tehniskas problēmas.");

            if (args[1] === "buy" || args[1] === "b")
                return client.commands.get('database').buyBc(message, args, data);

            if (args[1] === "usd" || args[1] === "u")
                return client.commands.get('database').buyUsd(message, args, data);

            if (args[1] === "sell" || args[1] === "s")
                return client.commands.get('database').sell(message, args, data);

            return client.commands.get('database').showData(message, data);
        });

    });

})

client.login(process.env.token);

