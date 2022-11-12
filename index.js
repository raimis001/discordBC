require("dotenv").config();

const express = require("express");
const app = express();
let discordReady = false;
app.listen(process.env.PORT, () => 
{
  console.log("Start BC bot!");
});

app.get("/", (req, res) => 
{
     res.send("Hello from BC bot");
});



const commands = {
   bitcoins:  {name: "Bitcoins",      prefix: "!bc",     module: require(`./commands/readBC.js`)},
   punch:     {name: "Punch game",    prefix: "!punch",  module: require(`./commands/punch.js`)},
   viking:    {name: "Kordēlija",     prefix: "!v",      module: require(`./commands/viking.js`)},
   slot:      {name: "slot mashine",  prefix: "!slot",   module: require(`./commands/slot.js`)},
};

const commandsObj = Object.values(commands);

const database = require(`./commands/database.js`);

const Init = (client) =>
{
  console.log(`Ready! Logged in as ${client.user.tag}`);
  discordReady = true;
  
  database.init();
  
  commands.bitcoins.module.init(database.database, discord.discord);
  commands.viking.module.init(database.database, discord.discord);
  commands.slot.module.init(commands.bitcoins.module, discord.discord);
};

const Message = (message) => 
{
  if (message.author.bot) return;

  const msg = message.content.trim().toLowerCase();
  const args = msg.split(/\s+/);

  commandsObj.forEach(command => {
    if (msg.startsWith(command.prefix))
        return command.module.process(message, args);
  }) 
}
console.log("Start");

const Create = () =>
{
  discord = require(`./commands/discordBC.js`)
  discord.init(Init, Message)

  setTimeout(() =>{
    if (!discordReady)
    {
      //Create();
    }
      //process.exit(); 
    console.log("Check discord");
} , 5000)


}

//Create();
  discord = require(`./commands/discordBC.js`)
  discord.init(Init, Message)

//Ra ID - 192163960814960650
