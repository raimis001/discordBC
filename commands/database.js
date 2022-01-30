const e = require('express');

module.exports = {
  name: "database",
  description: "Data base operations",

  database: 0,
  client: 0,
  currentValue: 0,
  init() {
    const fbAdmin = require('firebase-admin');
    var serviceAccount = require("../firebase.json");

    fbAdmin.initializeApp({
      credential: fbAdmin.credential.cert(serviceAccount),
      databaseURL: "https://discordbc-49980-default-rtdb.firebaseio.com"
    });
    this.database = fbAdmin.database();
  },
  saveUser(id, data) {
    const ref = this.database.ref('users/' + id);

    ref.set({
      bc: data.bc,
      usd: data.usd
    });

  },

  readUser(id, callback) {
    const ref = this.database.ref('users/' + id);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(snapshot.val());
      }

      let userData = { bc: 1, usd: 0 };
      this.saveUser(message.author.id, userData);
      return callback(userData);

    }).catch((error) => {
      console.error(error);
      callback(0);
    });

  },

  readTop(message) {
    const ref = this.database.ref('users/').orderByChild('usd').limitToLast(10);

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {

      snapshot.forEach((data) => {

        if (data.val().usd >= 0.01) {
          const usr = data.key;

          list.set(usr, data.val().usd);
        }
      });
      list.sort((usd1, usd2) => usd2 - usd1);

      var clientFetch = [];
      list.forEach((data, index) => {
        clientFetch.push(this.client.users.fetch(index));
      })

      Promise.all(clientFetch).then((response) => {
        var msg = "Pasaules biezākie discordisti:\n";

        response.forEach((data, index) => {

          const sn = list.get(data.id);
          msg = msg + `\t${index + 1}. ${data.username}: ${sn.toFixed(2)} USD\n`;

        });
        message.channel.send(msg);
      })

    });

  },
  readAssets(message) {
    const ref = this.database.ref('users/');

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {

      snapshot.forEach((data) => {
        const v = data.val().usd + data.val().bc * this.currentValue;
        const usr = data.key;

        list.set(usr, v);
      })
      list.sort((usd1, usd2) => usd2 - usd1);


      var clientFetch = [];

      list.forEach((data, index) => {
        clientFetch.push(this.client.users.fetch(index));
      });

      Promise.all(clientFetch).then((response) => {
        var msg = "Pseido bagātnieki:\n";
        response.forEach((data, index) => {

          const sn = list.get(data.id);
          msg = msg + `\t${index + 1}. ${data.username}: ${sn.toFixed(2)} P USD\n`;

        })
        message.channel.send(msg);
      })

    });
  },

  updateValues(value) {
    const tm = Date.now();
    const ref = this.database.ref(`bc/${tm}`);

    // const { Collection } = require("discord.js");
    // var list = new Collection();

    // ref.get().then((snapshot) => {

    // });

    ref.set({
      tm: tm,
      usd: value,
    });
  },

  readValues(message) {
    const ref = this.database.ref('bc').orderByChild('tm').limitToLast(12);

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {

      let min = 100000000;
      let max = 0;
      snapshot.forEach((data) => {
        const usd = data.val().usd;
        if (usd < min) min = usd;
        if (usd > max) max = usd;
      })

      const delta = max - min;
      snapshot.forEach((data) => {
        const usd = 10 * (data.val().usd - min) / delta;
        list.set(data.key, parseFloat(usd.toFixed(0)))
      })

      const blank = "░";
      const black = "▓";
      let msg = "";

      for (let i = 0; i < 12; i++) {
        msg = msg + blank + blank;
      }

      msg = msg + blank + "\n";

      for (let j = 10; j > 0; j--) {
        msg = msg + blank;
        for (let i = 0; i < 12; i++) {
          let v = list.at(i);
          if (isNaN(v)) v = 0;
          if (v >= j)
            msg = msg + black;
          else
            msg = msg + blank;
          msg = msg + blank;
        }
        msg = msg + "\n";
      }
      for (let i = 0; i < 12; i++) {
        msg = msg + blank + black;
      }

      msg = msg + blank + "\n";

      message.channel.send("Pēdējās stundas grafiks\n" + msg + `min:${min} max:${max} curr:${this.currentValue}`);
    })

  },

  helpMessage(message) {
    message.reply(
      `Izmanto komandas 
    pirkt: !bc (b)uy amount             //pirkt BC
    pirkt pa usd: !bc (u)sd amount      //pikrt BC par ievadīto summu
    pirkt pa usd: !bc (u)sd (a)ll         //pirkt BC par atlikušo summu
    pārdot: !bc (s)ell amount           //pārdot BC
    pārdot visu: !bc (s)ell (a)ll         //pārdot visus BC
    spēlētāju tops: !bc (t)op
    pseido tops: !bc (a)ssets           //tjipa it kā bagāti, bet patiesībā feiks
    graftks: !bc (g)raph                  //parāda pēdējās stundas BC grafiku
`);
  },

  messageReplay(message, text, data) {
    message.reply(`${text} \n BC value is ${this.currentValue} \n\t you have ${data.bc.toFixed(4)} BC and ${data.usd.toFixed(2)} USD`);
  },

  buyBc(message, args, data) {

    let text = "";
    let bc = parseFloat(args[2]);
    if (isNaN(bc)) {
      text = "Domāji piečakarēsi? Ieraksti pareizu vērtību";
    } else {
      bc = parseFloat(bc.toFixed(4));
      let usd = parseFloat((bc * this.currentValue).toFixed(2));
      if (usd > data.usd) {
        text = "Tu esi nabaga proletariāts un nevari pirkt BC";
      } else {
        data.usd -= usd;
        data.bc += bc;
        text = `Tu nopirki ${bc.toFixed(4)} BC pa ${usd.toFixed(2)}`;
        this.saveUser(message.author.id, data);
      }
    }

    this.messageReplay(message, text, data);

  },

  buyUsd(message, args, data) {

    let text = "";
    if (args[2] === "all" || args[2] === "a") {
      let usd = data.usd;
      let bc = parseFloat((usd / this.currentValue).toFixed(4));
      data.usd = 0;
      data.bc += bc;
      this.saveUser(message.author.id, data);
      text = `Tu nopirki ${bc.toFixed(4)} BC pa ${usd.toFixed(2)}`;
    } else {
      let usd = parseFloat(args[2]);
      if (isNaN(usd)) {
        text = "Tiešām!? Tik grūti ievadīt pareizu vērtību!?";
      } else {
        usd = parseFloat(usd.toFixed(2));
        if (usd > data.usd) {
          text = "Utubunga! Paskaties cik tev ir naudas, pingvīns tāds!";
        } else {
          let bc = parseFloat((usd / this.currentValue).toFixed(4));
          data.usd -= usd;
          data.bc += bc;
          this.saveUser(message.author.id, data);
          text = `Tu nopirki ${bc.toFixed(4)} BC pa ${usd.toFixed(2)}`;
        }
      }
    }

    this.messageReplay(message, text, data);
  },

  sell(message, args, data) {

    let text = "";
    if (args[2] === "all" || args[2] === "a") {
      let bc = data.bc;
      let usd = parseFloat((bc * this.currentValue).toFixed(2));
      data.bc = 0;
      data.usd += usd;
      this.saveUser(message.author.id, data);
      text = `Tu pārdevi ${bc.toFixed(4)} BC un ieguvi ${usd.toFixed(2)} USD`
    } else {
      let bc = parseFloat(args[2]);
      if (isNaN(bc)) {
        text = "Nav tāda skaitļa, mēģini vel";
      } else {
        bc = parseFloat(bc.toFixed(4));
        if (bc > data.bc) {
          text = "Negrāb skaitļus no gaisa, Tev nav tik daudz.";
        } else {
          let usd = parseFloat((bc * this.currentValue).toFixed(2));
          data.bc -= bc;
          data.usd += usd;
          this.saveUser(message.author.id, data);
          text = `Tu pārdevi ${bc.toFixed(4)} BC un ieguvi ${usd.toFixed(2)} USD`
        }
      }
    }

    this.messageReplay(message, text, data);
  },

  showData(message, data) {
    let text = "Tavs maciņš";
    this.messageReplay(message, text, data);
  },
}