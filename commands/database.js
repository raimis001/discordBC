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
    ref.set(data);
  },

  readUser(id, callback) {
    const ref = this.database.ref('users/' + id);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(snapshot.val());
      }

      let userData = { bc: 1, usd: 0 };
      this.saveUser(id, userData);
      return callback(userData);

    }).catch((error) => {
      console.error(error);
      callback(0);
    });

  },

  
}