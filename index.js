require("dotenv").config();

const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Start BC bot!");
});
app.get("/",(req, res) => {
   res.send("Hello from BC bot");
});

const { Client, Collection } = require("discord.js");
const client = new Client({intents: ["GUILDS","GUILD_MESSAGES"]});
client.on("ready", () => {
    client.commands.get('database').init();

    client.commands.get('read').readValue(() => {
        currentValue = client.commands.get('read').value;
        console.log(currentValue);
    });

    console.log(`${client.user.username} is ready`);


    let thanos = client.users.fetch('192163960814960650');
    thanos.then((result1) => {
      //put your code that uses the result1 (the user object) here
      //for example, you could do var imgURL = result1.displayAvatarURL();
      console.log(result1.username);
    });
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
          pirkt: !bc buy amount           ex: !bc buy 10.5
          pirkt pa usd: !bc usd amount    ex: !bc usd 2450
          pārdot: !bc sell amount         ex: !bc sell 1.3
          spēlētāju tops: !bc top
          `);
      return;
    }
    if (m[1] === "assets") {
        client.commands.get('database').readAssets(currentValue, (snapshot) => {
            var clientFetch = [];

             snapshot.forEach((data, index) => {
                 clientFetch.push(client.users.fetch(index));
             });

             Promise.all(clientFetch).then((response) => {
                 var msg = "Pseido bagātnieki:\n";
                 response.forEach((data, index) => {

                     const sn = snapshot.get(data.id);
                     msg = msg + `\t${index+1}. ${data.username}: ${sn.toFixed(2)} P USD\n`;
      
                 })
                 message.channel.send(msg);
             })
        });
        return;
    }
    if (m[1] === "top") {
      //console.log("Reading top");

      client.commands.get('database').readTop((snapshot) => {
        
          var clientFetch = [];
          snapshot.forEach((data, index) => {
            clientFetch.push(client.users.fetch(index));
          })

          Promise.all(clientFetch).then((response) => {
            var msg = "Pasaules biezākie discordisti:\n";

            response.forEach((data, index) => {

              const sn = snapshot.get(data.id);
              msg = msg + `\t${index+1}. ${data.username}: ${sn.toFixed(2)} USD\n`;

            });
            message.channel.send(msg);
          })
      });

      return; 
    }
    //console.log(`${message.author.tag}: ${m[1]}`);

    client.commands.get('read').execute(() => {
        currentValue = client.commands.get('read').value;

        let userData = {name: message.author.username,  bc: 1, usd: 0 };
        let consoleMessage = "";        

        client.commands.get('database').readUser(message.author.id, (data) => {

            if (data === 0) {//New User
                client.commands.get('database').saveUser(message.author.id, userData);
            } else {
                userData.bc = parseFloat(data.bc);
                userData.usd = parseFloat(data.usd);
            }

            if (m[1] === "buy") {
                let v = parseFloat(m[2]);
                if (isNaN(v)) {
                    consoleMessage = "Domāji piečakarēsi? Ieraksti pareizu vērtību";
                } else {
                    let v1 = v * currentValue;
                    if (v1 > userData.usd) {
                        consoleMessage = "Tu esi nabaga proletariāts un nevari pirkt BC";
                    } else {
                        userData.usd = userData.usd - v1;
                        userData.bc = userData.bc + v;
                        consoleMessage = `Tu nopirki ${v.toFixed(3)} BC`;
                        client.commands.get('database').saveUser(message.author.id, userData);
                    }
                }
            }
            if (m[1] === "usd") {
              let v = parseFloat(m[2]);
              if (isNaN(v)) {
                consoleMessage = "Tiešām! Tik grūti ievadīt pareizu vērtību!?";
              } else {
                if (v > userData.usd) {
                  consoleMessage = "Utubunga! Paskaties cik tev ir naudas  pingvīns tāds!";
                } else {
                  let bc = v / currentValue;
                  userData.usd -= v;
                  userData.bc += bc;
                  consoleMessage = `Tu nopirki ${bc.toFixed(3)} BC`;
                  client.commands.get('database').saveUser(message.author.id, userData);
                }
              }
            }
            if (m[1] === "sell") {
                let v = parseFloat(m[2]);
                if (isNaN(v)) {
                    consoleMessage = "Nav tāda skaitļa, mēģini vel";
                } else {
                    if (v > userData.bc) {
                        consoleMessage = "Negrāb skaitļus no gaisa, Tev nav tik daudz.";
                    } else {
                        userData.bc = userData.bc - v;
                        userData.usd = userData.usd + v * currentValue;
                        client.commands.get('database').saveUser(message.author.id, userData);
                    }
                }
            }

            message.reply(`${consoleMessage} \n BC value is ${currentValue} \n\t you have ${userData.bc.toFixed(3)} BC and ${userData.usd.toFixed(2)} USD`);
        });

    });
   
})

client.login(process.env.token);

