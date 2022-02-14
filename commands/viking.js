module.exports = {
  name: "viking",
  description: "Survival game",

  database: 0,
  discord: 0,

  items: [
    { id: 0, name: "woodu", type: 0 },
    { id: 1, name: "stone", type: 0 },
    { id: 2, name: "berries", type: 1, effect: {hp: 10, st:10} },
  ],

  terrains: [
    { id: 0, name: "jūras" },
    { id: 1, name: "pļavas" },
    { id: 2, name: "pļavas" },
    { id: 3, name: "pļavas" },
    { id: 4, name: "meži" },
    { id: 5, name: "meži" },
    { id: 6, name: "tīrumi" },
    { id: 7, name: "tīrumi" },
    { id: 8, name: "kalni" },
    { id: 9, name: "kalni" },
    { id: 10, name: "mistiskās zemes" },
  ],

  beasts: [
    { id:0, name: "deer", hp:5, attack: 0 },
    { id:1, name: "woodenboy", hp: 10, attack: 1 },
  ],

  buildings: [
    { id: 0, name: "workstation", needs: [{id: 0, count: 10}] },
  ],

  perlin: require(`../tools/perlin.js`),
  perlinScale: 19,

  regenTime: 5 * 60 * 1000,

  init() {
    this.perlin.init();
    // for (let i = 0; i < 10; i++) {
    //   console.log(this.getPerlin(0+i, 5));
    // }

  },

  newUser(id) {
    let x = this.getRandomInt(500, 5000);
    let y = this.getRandomInt(500, 5000);

    let userData = {
      current: `${x}:${y}`,
      hp: 25,
      st: 30,
    };
    this.saveUser(id, userData);
    return userData;
  },

  getUser(id, callback, errCallback) {
    const ref = this.database.ref('viking/users/' + id);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(snapshot.val());
      }

      return callback(this.newUser(id));
    }).catch((error) => {
      console.error(error);
      errCallback(0);
    });

  },
  
  saveUser(id, data) {
    const ref = this.database.ref('viking/users/' + id);

    ref.set(data);
  },
  saveInventory(id, userData) {

    const ref = this.database.ref(`viking/users/${id}/inventory`);
    ref.set(userData.inventory);
  },

  generateItems(terrain) {
    let items = [];

    let r = this.getRandomInt(0, 10);
    if (r > 3) {//Branch
      let c = this.getRandomInt(1, 5);
      items.push({ id: 0, count: c })
    }
    r = this.getRandomInt(0, 10);
    if (r > 3) {//stone
      let c = this.getRandomInt(1, 5);
      items.push({ id: 1, count: c })
    }

    switch (terrain) {
      case 1:
      case 2:
      case 3:
        //PĻAVAS
        r = this.getRandomInt(0, 10);
        if (r > 4) {//berries
          let c = this.getRandomInt(1, 5);
          items.push({ id: 2, count: c })
        }
        break;

      default:
        break;
    }
    console.log(items);
    return items;
  },

  newWorld(pos) {
    const t = this.getPerlin(pos);
    const data = {
      pos: pos,
      terrain: t,
      last: Date.now(),
      items: this.generateItems(t),
    };
    console.log(data.items);
    this.saveWorld(pos, data);
    return data;
  },

  regenWorld(pos, data) {

    const lm = !data.last || isNaN(data.last) ? 0 : data.last;
    const tm = Date.now();

    if ((tm - lm) < this.regenTime)
      return data;

    data.last = tm;
    data.items = this.generateItems(data.terrain);
    this.saveWorld(pos, data);
    return data;
  },

  getWorld(pos, callback, errCallback) {
    const ref = this.database.ref(`viking/world/${pos}`);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(this.regenWorld(pos, snapshot.val()));
      }

      return callback(this.newWorld(pos));

    }).catch((error) => {
      console.error(error);
      errCallback(0);
    });
  },

  saveWorld(pos, data) {
    const ref = this.database.ref(`viking/world/${pos}`);
    ref.set(data);
  },

  saveWorldItems(pos, data) {
    const ref = this.database.ref(`viking/world/${pos}/items`);
    ref.set(data);
  },

  process(message, args) {

    this.getUser(message.author.id,

      (userData) => {
        this.getWorld(userData.current,
          (worldData) => {
            this.processMessage(userData, worldData, message, args);
          },
          () => { console.log("World reading error"); }
        )
      },
      () => { console.log("User data reading error"); }
    );


  },

  processMessage(userData, worldData, message, args) {
    if (args.length <= 1) 
      //TODO information
      return this.getInfo(userData, worldData, message);
    

    if (args[1] === 'pick' || args[1] === 'p')
      return this.pickItem(userData, worldData, message, args)

    if (args[1] === 'inventory' || args[1] === 'i')
      return this.showInventoy(userData, worldData, message);

    if (args[1] === 'go' || args[1] === 'g')
      return this.gotoWorld(userData, worldData, message, args);

    if (args[1] === 'eat' || args[1] === 'e') 
      return this.eatItem(userData, message, args);
    
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
      //console.log(worldData.items);
      msg += `Zemē mētājas:\n`;
      worldData.items.forEach(item => {
        if (item.count > 0)
          msg += `\t${this.items[item.id].name}: ${item.count} gab\n`;
      });
    }

    message.channel.send(msg);
  },

  pickItem(userData, worldData, message, args) {
    if (!worldData.items || worldData.items.length < 1) {
      message.channel.send("Šeit neatrodas nekādu lietu ");
      return;
    }

    let id = -1;
    this.items.forEach(item => {
      if (item.name == args[2]) {
        id = item.id;
      }
    });

    if (id < 0) {
      message.channel.send("Neparezi ivadīts nosaukums: " + args[2]);
      return;
    }

    let cnt = -1;
    worldData.items.forEach(item => {
      if (item.id === id) {
        cnt = item.count;
      }
    });

    if (cnt < 1) {
      message.channel.send("Te nav šādu lietu: " + args[2]);
      return;
    }

    if (!userData.inventory) {
      userData.inventory = [{ id: id, count: cnt }];
    } else {
      let add = false;
      userData.inventory.forEach(item => {
        if (item.id === id) {
          item.count += cnt;
          add = true;
        }
      });
      if (!add) {
        userData.inventory.push({ id: id, count: cnt });
      }
    }

    this.saveInventory(message.author.id, userData);

    worldData.items.forEach(item => {
      if (item.id === id) {
        item.count -= cnt;
      }
    });

    this.saveWorldItems(userData.current, worldData.items);
    message.channel.send(`Tu pacēli ${cnt} ${args[2]}`);

  },

  showInventoy(userData, worldData, message) {
    if (!userData.inventory) {
      message.channel.send("Tava soma ir tukša");
      return;
    }
    let msg = 'Somas saturs:\n';
    userData.inventory.forEach(item => {
      if (item.count > 0) {
        msg += `\t${this.items[item.id].name}: ${item.count} gab \n`;
      }
    });

    message.channel.send(msg);
  },

  gotoWorld(userData, worldData, message, args) {
    if (args.length < 3) {
      message.channel.send('Uz kurieni vēlies doties - up, down, left, right?');
      return;
    }
    if (userData.st < 1) {
      message.channel.send('Tev nepietiek spēka pārvietoties, uzēd kaut ko');
      return;
    }
    let pos = this.getWorldXY(userData.current);
    switch (args[2]) {
      case 'up':
        pos.y++;
        break;
      case 'down':
        pos.y--;
        break;
      case 'left':
        pos.x--;
        break;
      case 'right':
        pos.x++
        break;

      default:
        message.channel.send('Uz kurieni Tu vēlies doties - up, down, left, right?');
        return;
    }

    if (pos.x < 0 || pos.y < 0) {
      message.channel.send("Tu esi sasniedzis pasaules malu un nevari tai doties pāri");
      return;
    }

    userData.current = this.getWorldPos(pos.x,pos.y);
    userData.st--;

    this.saveUser(message.author.id, userData);

    this.getWorld(userData.current,
      (worldData) => { this.getInfo(userData, worldData, message) },
      () => { console.log('World reading error'); }
    );
  },

  eatItem(userData, message, args) {
    if (args.length < 3) {
      message.channel.send('Ko tieši Tu vēlies apēst?');
      return;
    }
  },

//===============================================
  getWorldPos(x, y) {
    return `${x}:${y}`;
  },

  getWorldXY(pos) {
    const p = pos.split(':');
    return {x:parseFloat(p[0]), y:parseFloat(p[1])};
  },

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getPerlinXY(x, y) {
    x = x / this.perlinScale;
    y = y / this.perlinScale;

    return Math.floor(10 * (this.perlin.perlin2(x, y) + 1) / 2);
  },

  getPerlin(pos) {
    let p = pos.split(':');

    let x = parseFloat(p[0]);
    let y = parseFloat(p[1]);

    return this.getPerlinXY(x, y);
  },
}