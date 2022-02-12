module.exports = {
  name: "viking",
  description: "Survival game",

  database: 0,
  discord: 0,

  items: [
    { id: 0, name: "branch" },
    { id: 1, name: "stone" },
    { id: 2, name: "berries" },
  ],

  terrains: [
    { id: 0, name: "pļavas" }
  ],

  init() {
  },

  getUser(id, callback, errCallback) {
    const ref = this.database.ref('viking/users/' + id);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(snapshot.val());
      }

      let userData = {
        current: "1000:1000",
        hp: 25,
        st: 30,
      };
      this.saveUser(id, userData);
      return callback(userData);

    }).catch((error) => {
      console.error(error);
      errCallback(0);
    });

  },
  saveUser(id, data) {
    const ref = this.database.ref('viking/users/' + id);

    ref.set(data);
  },

  getWorld(pos, callback, errCallback) {
    const ref = this.database.ref(`viking/world/${pos}`);
   
    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(snapshot.val());
      }

      let data = {
        pos: pos,
        terrain: 0, //TODO izveidot perlin noise ierakstu
        items: [
          { id: 0, count: 2 },
          { id: 1, count: 1 },
        ],
      };
      this.saveWorld(pos, data);
      return callback(data);

    }).catch((error) => {
      console.error(error);
      errCallback(0);
    });
  },

  saveWorld(pos, data) {
    const ref = this.database.ref(`viking/world/${pos}`);
    ref.set(data);
  },

  process(message, args) {

    this.getUser(message.author.id, (userData) => {
      this.getWorld(userData.current, (worldData) => {

        this.processMessage(userData, worldData, message, args);

      },
        () => {
          console.log("World reading error");
        }
      );
    },
      () => {
        console.log("User data reading error");
      }
    );


  },

  processMessage(userData, worldData, message, args) {
    if (args.length <= 2) {
      //TODO information
      return this.getInfo(userData, worldData, message);
    }

    if (args[1] === 'pick')
      return this.pickItem(userData, worldData, message, args)

  },

  getInfo(userData, worldData, message) {
    var msg =
      `Tava atrašanās vieta: ${userData.current}\n` +
      `Tu atrodies ${this.terrains[worldData.terrain].name}\n` +
      (isNaN(worldData.building) ?
        `Te neatrodas nekādas būves` :
        ``) + `\n`
      ;
    if (worldData.items) {
      console.log(worldData.items);
      msg += `Zemē mētājas:\n`;
      worldData.items.forEach(item => {
         msg += `\t${this.items[item.id].name}: ${item.count} gab\n`;
      });
    }

    message.channel.send(msg);
  },

  pickItem(userData, worldData, message, args) {
    if (isNaN(worldData.item) || worldData.items.length < 1)
      return;
  }

}