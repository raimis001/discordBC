module.exports = {
  name: "discord",
  description: "discord module",

  discord: 0, 
  OnLogin: 0,
  OnMessage: 0,
 

  init(loginCallback, messagesCallback) {
    console.log("Login to discord");

    this.OnLogin = loginCallback;
    this.OnMessage = messagesCallback
    
    const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");

    this.discord = new Client({ intents:  [ 
                                        GatewayIntentBits.Guilds, 
                                        GatewayIntentBits.GuildMessages, 
                                        GatewayIntentBits.MessageContent
                                      ],
                                partials: [Partials.Channel]
                              });
    
    this.discord.login(process.env.token).catch(err => {
       console.error('');
       console.error(chalk.redBright("Couldn't log into Discord. Wrong bot token?"));
       console.error('');
       console.error(err);
     });

    this.discord.once(Events.ClientReady, this.OnLogin );
    this.discord.on(Events.MessageCreate, this.OnMessage);
   
  },

}