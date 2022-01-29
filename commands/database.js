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
      const ref = this.database.ref('user-'+id);
      
      ref.set( {
          bc: data.bc,
           usd: data.usd
         });
      
  },

  readUser(id, callback) {
      const ref = this.database.ref('user-'+id);

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

  readTop(callback) {
    const ref = this.database.ref().orderByChild('usd').limitToLast(10);

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {
      
      snapshot.forEach((data) => {
        if (data.val().usd > 0.01)
        {
          const usr = data.key.split('-');
          list.set(usr[1], data.val().usd);
        }
      });
      list.sort((usd1, usd2) => usd2 - usd1);

      callback(list);
    });

  },
  readAssets(rate, callback) {
    const ref = this.database.ref();

    const { Collection } = require("discord.js");
    var list = new Collection();

    ref.get().then((snapshot) => {

      snapshot.forEach((data) => {
        const v = data.val().usd + data.val().bc * rate;
        const usr = data.key.split('-');

        list.set(usr[1],v);
      })
      list.sort((usd1, usd2) => usd2 - usd1);

      callback(list);
    });
  },
}