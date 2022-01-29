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

    client.commands.get('read').readValue((val) => {
        currentValue = val;
        console.log(currentValue);
    });

    console.log(`${client.user.username} is ready`);


    let thanos = client.users.fetch('192163960814960650');
    thanos.then((result1) => {
        //put your code that uses the result1 (the user object) here
        //for example, you could do var imgURL = result1.displayAvatarURL();
        console.log(result1.username);
    });

    setInterval(() => {
        console.log(" timetout");
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
let currentValue = 0;


client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    const msg = message.content.trim().toLowerCase();
    if (!msg.startsWith(PREF)) return;

    const m = msg.split(/\s+/);

    if (m[1] === "help") {
        message.reply(
            `Izmanto komandas 
        pirkt: !bc buy amount             //pirkt BC
        pirkt pa usd: !bc usd amount      //pikrt BC par ievadīto summu
        pirkt pa usd: !bc usd all         //pirkt BC par atlikušo summu
        pārdot: !bc sell amount           //pārdot BC
        pārdot visu: !bc sell all         //pārdot visus BC
        spēlētāju tops: !bc top
        pseido tops: !bc assets           //tjipa it kā bagāti, bet patiesībā feiks
        `);
        return;
    }
    if (m[1] === "assets") {
        client.commands.get('database').readAssets(currentValue, client, message);
        return;
    }

    if (m[1] === "top") { //Reading top
        client.commands.get('database').readTop(client, message);
        return;
    }
    if (m[1] === "graph") {
        client.commands.get('database').readValues(message);
        return;
    }


    client.commands.get('read').execute(() => {
        currentValue = client.commands.get('read').value;

        let userData = { name: message.author.username, bc: 1, usd: 0 };
        let consoleMessage = "Tavs maciņš";

        client.commands.get('database').readUser(message.author.id, (data) => {

            if (data === 0) {//New User
                client.commands.get('database').saveUser(message.author.id, userData);
            } else {
                userData.bc = parseFloat(data.bc);
                userData.usd = parseFloat(data.usd);
            }

            if (m[1] === "buy") {
                let v = parseFloat(m[2].toFixed(4));
                if (isNaN(v)) {
                    consoleMessage = "Domāji piečakarēsi? Ieraksti pareizu vērtību";
                } else {
                    let v1 = parseFloat((v * currentValue).toFixed(2));
                    if (v1 > userData.usd) {
                        consoleMessage = "Tu esi nabaga proletariāts un nevari pirkt BC";
                    } else {
                        userData.usd -= v1;
                        userData.bc += v;
                        consoleMessage = `Tu nopirki ${v.toFixed(4)} BC`;
                        client.commands.get('database').saveUser(message.author.id, userData);
                    }
                }
            }
            if (m[1] === "usd") {
                if (m[2] === "all") {
                    let v = userData.usd;
                    let bc = parseFloat((v / currentValue).toFixed(4));
                    userData.usd = 0;
                    userData.bc += bc;
                    consoleMessage = `Tu nopirki ${bc.toFixed(4)} BC`;
                    client.commands.get('database').saveUser(message.author.id, userData);
                } else {
                    let v = parseFloat(m[2].toFixed(2));
                    if (isNaN(v)) {
                        consoleMessage = "Tiešām! Tik grūti ievadīt pareizu vērtību!?";
                    } else {
                        if (v > userData.usd) {
                            consoleMessage = "Utubunga! Paskaties cik tev ir naudas  pingvīns tāds!";
                        } else {
                            let bc = parseFloat((v / currentValue).toFixed(4));
                            userData.usd -= v;
                            userData.bc += bc;
                            consoleMessage = `Tu nopirki ${bc.toFixed(4)} BC`;
                            client.commands.get('database').saveUser(message.author.id, userData);
                        }
                    }
                }
            }
            if (m[1] === "sell") {

                if (m[2] === "all") {
                    let v = userData.bc;
                    userData.bc = 0;
                    userData.usd = userData.usd + parseFloat((v * currentValue).toFixed(2));
                    client.commands.get('database').saveUser(message.author.id, userData);
                } else {
                    let v = parseFloat(m[2].toFixed(4));
                    if (isNaN(v)) {
                        consoleMessage = "Nav tāda skaitļa, mēģini vel";
                    } else {
                        if (v > userData.bc) {
                            consoleMessage = "Negrāb skaitļus no gaisa, Tev nav tik daudz.";
                        } else {
                            userData.bc = userData.bc - v;
                            userData.usd = userData.usd + parseFloat((v * currentValue).toFixed(2));
                            client.commands.get('database').saveUser(message.author.id, userData);
                        }
                    }
                }
            }

            message.reply(`${consoleMessage} \n BC value is ${currentValue} \n\t you have ${userData.bc.toFixed(4)} BC and ${userData.usd.toFixed(2)} USD`);
        });

    });

})

client.login(process.env.token);

