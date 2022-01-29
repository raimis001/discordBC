const e = require('express');

module.exports = {
  name: "database",
  description: "Data base operations",

  database: 0,
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
        callback(snapshot.val());
      } else {
        console.log("No data available");
        callback(0);
      }
    }).catch((error) => {
      console.error(error);
      callback(0);
    });

  },

  readTop(client, message) {
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
        clientFetch.push(client.users.fetch(index));
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
  readAssets(rate, client, message) {
    const ref = this.database.ref('users/');

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {

      snapshot.forEach((data) => {
        const v = data.val().usd + data.val().bc * rate;
        const usr = data.key;

        list.set(usr, v);
      })
      list.sort((usd1, usd2) => usd2 - usd1);


      var clientFetch = [];

      list.forEach((data, index) => {
        clientFetch.push(client.users.fetch(index));
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

      message.channel.send("Pēdējās stundas grafiks\n" + msg + `min:${min} max:${max}`);
    })

  }
}