module.exports = {
  name: "viking",
  description: "Survival game",

  database: 0,
  discord: 0,

  items: [
    { id: 0, name: "wood", type: 0 },
    { id: 1, name: "stone", type: 0 },
    { id: 2, name: "berries", type: 1, effect: { hp: 10, st: 10 } },
    { id: 3, name: "skin", type: 0 },
    { id: 4, name: "bone", type: 0 },
    { id: 5, name: "meat", type: 2 },
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
    { id: 0, name: "deer", hp: 5, attack: 0, type: [1], terrains: [1, 2, 3, 4], rnd: 5, reward: [{id: 3, count: 1},{id: 4, count: 2}, {id: 5, count: 3}], msg: 'Tālumā Tu redzi ganāmies deer' },
    { id: 1, name: "woodenboy", hp: 10, attack: 1, type: [0,1], terrains: [2, 3, 4, 5, 6], rnd: 3, reward: [{id: 0, count: 2}], msg: 'Woodenboy kaut kur tuvumā izdod savas urkšķošās skaņas, vari uzbrukt viņam, vai doties tālāk' },
  ],

  buildings: [
    { id: 0, name: "stonepile", needs: [{ id: 1, count: 10 }] },
    { id: 1, name: "chest", needs: [{ id: 0, count: 20 }, { id: 1, count: 5 }] },
    { id: 2, name: "shelter", needs: [{ id: 0, count: 30 }, { id: 1, count: 10 }] },
    { id: 3, name: "bed", needs: [{ id: 0, count: 15 }] },
    { id: 4, name: "workbench", needs: [{ id: 0, count: 10 }, { id: 1, count: 5 }] },
  ],

  tools: [
    { id: 0, name: "axe", type: 0, needs: [{ id: 0, count: 3 }, { id: 1, count: 1 }], dmg: 10, count: 1, st: 3 },
    { id: 1, name: "bow", type: 1, needs: [{ id: 0, count: 5 }], dmg: 10, count: 1, st: 2 },
    { id: 2, name: "arrows", type: 2, needs: [{id: 0, count: 5}], count: 20},
  ],

  perlin: require(`../tools/perlin.js`),
  perlinScale: 19,

  regenTime: 5 * 60 * 1000,

  init() {
    this.perlin.init();
  },
  //#region PROCESS MESSAGES

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
      return this.getInfo(userData, worldData, message);

    if (args[1] === 'pick' || args[1] === 'p')
      return this.pickItem(userData, worldData, message, args)

    if (args[1] === 'info' || args[1] === 'i')
      return this.showInventory(userData, worldData, message);

    if (args[1] === 'go' || args[1] === 'g')
      return this.gotoWorld(userData, worldData, message, args);

    if (args[1] === 'teleport' || args[1] === 't')
      return this.teleport(userData, worldData, message, args);

    if (args[1] === 'eat' || args[1] === 'e')
      return this.eatItem(userData, worldData, message, args);

    if (args[1] === 'build' || args[1] === 'b')
      return this.build(userData, worldData, message, args);

    if (args[1] === 'chest' || args[1] === 'c')
      return this.chest(userData, worldData, message, args);

    if (args[1] === 'craft' || args[1] === 'r')
      return this.crafting(userData, worldData, message, args);

    if (args[1] === 'attack' || args[1] === 'a')
      return this.attack(userData, worldData, message, args);

    return message.channel.send('Napzīstama komanda');
  },
  //#endregion

  //#region USER DATA

  upgradeUser(userData) {
    if (!userData.hpMax)
      userData.hpMax = 25;
    if (!userData.stMax)
      userData.stMax = 30;

    return userData;
  },

  newUser(id) {
    let x = this.getRandomInt(500, 5000);
    let y = this.getRandomInt(500, 5000);

    let userData = {
      current: `${x}:${y}`,
      hp: 25,
      st: 30,
      hpMax: 25,
      stMax: 30,
    };
    this.saveUser(id, userData);
    return userData;
  },

  getUser(id, callback, errCallback) {
    const ref = this.database.ref('viking/users/' + id);

    ref.get().then((snapshot) => {
      if (snapshot.exists()) {
        return callback(this.upgradeUser(snapshot.val()));
      }

      return callback(this.newUser(id));
    }).catch((error) => {
      console.error(error);
      errCallback(0);
    });

  },

  saveUser(id, userData) {
    const ref = this.database.ref('viking/users/' + id);

    ref.set(userData);
  },
  //#endregion

  //#region WORLD DATA
  generateItems(terrain) {
    let items = [];

    let r = this.getRandomInt(0, 10);
    if (r > 2) {//Branch
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
    //console.log(items);
    return items;
  },

  generateBeasts(terrain) {
    let beast = [];
    this.beasts.forEach(b => {
      if (b.terrains.indexOf(terrain) > 0) {
        const r = this.getRandomInt(0, 9);
        if (r < b.rnd) {
          beast.push({ id: b.id });
        }
      }
    });
    return beast;
  },

  newWorld(pos) {
    const t = this.getPerlin(pos);
    const data = {
      pos: pos,
      terrain: t,
      last: Date.now(),
      items: this.generateItems(t),
      beasts: this.generateBeasts(t),
    };
    //console.log(data.items);
    this.saveWorld(pos, data);
    return data;
  },

  regenWorld(pos, data) {

    const lm = !data.last || isNaN(data.last) ? 0 : data.last;
    const tm = Date.now();

    if ((tm - lm) < this.regenTime)
      return data;

    data.last = tm;
    data.items = [];
    data.beasts = [];
    if (!data.buildings) {
      data.beasts = this.generateBeasts(data.terrain);
      data.items = this.generateItems(data.terrain);
    }

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

  saveWorld(pos, worldData) {
    const ref = this.database.ref(`viking/world/${pos}`);
    ref.set(worldData);
  },

  saveWorldBuildings(pos, data) {
    const ref = this.database.ref(`viking/world/${pos}/buildings`);
    ref.set(data);

  },

  saveWorldItems(pos, data) {
    const ref = this.database.ref(`viking/world/${pos}/items`);
    ref.set(data);
  },

  gotoWorldXY(pos, userData, message) {
    userData.current = pos;

    this.saveUser(message.author.id, userData);

    this.getWorld(userData.current,
      (worldData) => { this.getInfo(userData, worldData, message) },
      () => { console.log('World reading error'); }
    );
  },
  //#endregion

  //#region SERVICES
  getBuilding(id) {
    let build = undefined;
    this.buildings.forEach(element => {
      if (element.id === id)
        build = element;
    });
    return build;
  },

  findBuilding(id, worldData) {
    let build = undefined;
    if (!worldData.buildings)
      return build;

    worldData.buildings.forEach(b => {
      if (b.id === id)
        build = b;
    });

    return build;

  },

  getItem(id) {
    let item = undefined;
    this.items.forEach(element => {
      if (element.id === id) {
        item = element;
      }
    });

    return item;

  },

  getItemByName(name) {
    let item = undefined;
    this.items.forEach(element => {
      if (element.name === name) {
        item = element;
      }
    });

    return item;

  },

  getToolByName(name) {
    let item = undefined;
    this.tools.forEach(element => {
      if (element.name === name) {
        item = element;
      }
    });

    return item;
  },

  getTool(id) {
    let tool = undefined;
    this.tools.forEach(t => {
      if (t.id === id)
        tool = t;
    });

    return tool;
  },

  findTool(id, userData) {
    if (!userData.tools)
      return undefined;

    let tool = undefined;
    userData.tools.forEach(t => {
      if (t.id === id)
        tool = t;
    });

    return tool;
  },

  getBeast(id) {
    let beast = undefined;
    this.beasts.forEach(b => {
      if (b.id == id)
        beast = b;
    });

    return beast;
  },

  dead(message, userData, worldData, msg) {

  },

  //#endregion

  //#region INVENTORY
  saveInventory(id, userData) {

    const ref = this.database.ref(`viking/users/${id}/inventory`);
    ref.set(userData.inventory);
  },

  countInventory(id, userData) {
    let cnt = 0;

    userData.inventory.forEach(item => {
      if (item.id === id)
        cnt += item.count;
    });
    return cnt;
  },

  countAll(id, userData, worldData) {
    let cnt = this.countInventory(id, userData);
    
    const chest = this.findBuilding(1, worldData);
    if (!chest || !chest.items)
      return cnt;

    chest.items.forEach(itm => {
      if (itm.id === id)
        cnt += itm.count;
    });

    return cnt;
  },

  addInventory(userData, id, count) {
    if (!userData.inventory) {
      userData.inventory = [{ id: id, count: count }];
    } else {
      let add = false;
      userData.inventory.forEach(item => {
        if (item.id === id) {
          item.count += count;
          add = true;
        }
      });
      if (!add) {
        userData.inventory.push({ id: id, count: count });
      }
    }
  },

  spendAll(userData, worldData, id, count) {

    var cnt = count;
    userData.inventory.forEach(item => {
      if (item.id === id)
      {
        item.count -= cnt;
        cnt = item.count < 0 ? item.count * -1 : 0;
        if (item.count < 0)
          item.count = 0;
      }
    });

    if (cnt < 1) {
      return// console.log(`All from inventory ${cnt}`);
    }
    
    const chest = this.findBuilding(1, worldData);
    if (!chest)
      return// console.log(`chest not found`);

    chest.items.forEach(item => {
      if (item.id === id) {
        item.count -= cnt;
        cnt = item.count < 0 ? item.count * -1 : 0;
        if (item.count < 0)
          item.count = 0;
      }
    });

    //console.log(`Finish chest`)
  },
  //#endregion

  //#region COMMANDS
  getInfo(userData, worldData, message) {
    var msg =
      `Tava atrašanās vieta: ${userData.current}\n` +
      `Tu atrodies ${this.terrains[worldData.terrain].name}\n` +
      `Hp - ${userData.hp}\n` +
      `Stamina - ${userData.st}\n`
      ;
    if (!worldData.buildings)
      msg += `Te neatrodas nekādas būves\n`;
    else {
      msg += `Te atrodas šādas ēkas:\n`;
      worldData.buildings.forEach(build => {
        //TODO: samainīt ar fetch user
        const user = this.discord.users.cache.get(build.uid).username;
        const b = this.getBuilding(build.id);
        msg += `\t${b.name} ${build.id === 0 ? '(' + build.name + ')' : ''} no ${user}\n`;
      });
    }
    if (worldData.items && worldData.items.length > 0) {
      //console.log(worldData.items);
      let m = `Zemē mētājas:\n`;
      let cnt = 0;
      worldData.items.forEach(item => {
        cnt += item.count;
        if (item.count > 0) {
          const itm = this.getItem(item.id);
          m += `\t${itm.name}: ${item.count} gab\n`;
        }
      });
      if (cnt > 0)
        msg += m;
    }

    if (worldData.beasts && worldData.beasts.length > 0) {
      worldData.beasts.forEach(beast => {
        const b = this.getBeast(beast.id);
        msg += b.msg + '\n';
      });
    }

    message.channel.send(msg);
  },

  build(userData, worldData, message, args) {
    if (args.length < 3) {
      let msg = `Norādi, ko vēlies būvēt\n`;
      this.buildings.forEach(build => {

        let nds = "";
        build.needs.forEach(need => {
          const b = this.getItem(need.id);
          nds += `${b.name} - ${need.count} `;
        });
        msg += `\t${build.name} ${nds}\n`
      });
      return message.channel.send(msg);
    }

    let building = undefined;
    this.buildings.forEach(b => {
      if (b.name === args[2])
        building = b;
    });

    if (!building) {
      let msg = `Tu nepareizi norādīji būvējamo ēku: ${args[2]}\n`;
      this.buildings.forEach(build => {

        let nds = "";
        build.needs.forEach(need => {
          const b = this.getItem(need.id);
          nds += `${b.name} - ${need.count} `;
        });
        msg += `\t${build.name} ${nds}\n`
      });
      console.log("Wrong build name: " + args[2]);
      return message.channel.send(msg);
    }

    if (building.id === 0) {
      if (worldData.buildings)
        return message.channel.send('Tev jau ir uzbūvēts stonepile šajā sektorā');
      if (args.length < 4)
        return message.channel.send(`Šai ēkai ir jānorāda nosaukums`);
    }

    let canbuild = true;
    building.needs.forEach(need => {
      const c = this.countInventory(need.id, userData);
      if (c < need.count)
        canbuild = false;
    });

    if (!canbuild) {
      let msg = `Tev nepietiek lietas būvniecībai ${args[2]}\n`;
      building.needs.forEach(need => {
        const c = this.countInventory(need.id, userData);
        const itm = this.getItem(need.id);
        msg += `\t${itm.name} - ${need.count} (${c})\n`;
      });
      return message.channel.send(msg);
    }

    let save = { uid: message.author.id, id: building.id, name: "", level: 1 };
    if (building.id === 0) {
      save.name = args[3];
    }

    if (!worldData.buildings)
      worldData.buildings = [];

    worldData.buildings.push(save);

    building.needs.forEach(need => {
      this.addInventory(userData, need.id, -need.count );
    });

    if (!userData.buildings) {
      if (building.id != 0)
        return message.channel.send('Tev nav uzbūvēts stonepile un nevari būvet kaut ko citu');
      userData.buildings = [];
    }

    userData.buildings.push({ pos: userData.current, id: building.id, name: save.name });

    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);

    message.channel.send(`Tu uzbūveji ${args[2]}\n`);
    if (building.id === 0) {
      message.channel.send(`Tagad vari izmantot teleportu ar nosaukumu ${args[3]}, lai ātri pārvietotos uz šo pazīciju`);
    }
  },

  pickItem(userData, worldData, message, args) {
    if (!worldData.items || worldData.items.length < 1) {
      message.channel.send("Šeit neatrodas nekādu lietu ");
      return;
    }

    if (args[2] === 'all' || args[2] === 'a') {//Pickup all items
      let msg = `Tu pacēli:\n`;
      worldData.items.forEach(item => {
        this.addInventory(userData, item.id, item.count);
        const itm = this.getItem(item.id);
        const cnt = this.countInventory(item.id, userData);

        msg += `\t${itm.name} ${item.count} (${cnt})\n`;
        item.count = 0;
      });
      this.saveInventory(message.author.id, userData);
      this.saveWorldItems(userData.current, worldData.items);
      message.channel.send(msg);
      return;
    }

    let id = -1;
    this.items.forEach(item => {
      if (item.name == args[2]) {
        id = item.id;
      }
    });

    if (id < 0) {
      message.channel.send("Neparezi ievadīts nosaukums: " + args[2]);
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

    this.addInventory(userData, id, cnt);

    worldData.items.forEach(item => {
      if (item.id === id) {
        item.count -= cnt;
      }
    });

    this.saveInventory(message.author.id, userData);
    this.saveWorldItems(userData.current, worldData.items);

    const c = this.countInventory(id, userData)
    message.channel.send(`Tu pacēli ${cnt} ${args[2]} (${c})`);

  },

  showInventory(userData, worldData, message, args) {

    let msg = '';
    if (userData.tools) {
      msg = `Tev ir šādi ieroči:\n`;
      userData.tools.forEach(t => {
        const tool = this.getTool(t.id);
        let c = '';
        if (t.count && t.count > 1)
          c = `skaits: ${t.count}`;

        msg += `\t${tool.name} līmenis: ${t.level} stiprība: ${t.hp}% ${c}\n`;
      });
    } else {
      msg += `Tev nav ieroču un instrumentu\n`;
    }

    if (!userData.inventory) {
      msg += "Tava soma ir tukša";
      message.channel.send(msg);
      return;
    }

    let m = 'Somas saturs:\n';
    let c = 0;
    userData.inventory.forEach(item => {
      c += item.count;
      if (item.count > 0) {
        const itm = this.getItem(item.id);
        m += `\t${itm.name}: ${item.count} gab \n`;
      }
    });

    if (c > 0)
      msg += m;
    else 
      msg += `Tava soma ir tukša`;

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

    userData.st--;
    this.gotoWorldXY(this.getWorldPos(pos.x, pos.y), userData, message);

  },

  teleport(userData, worldData, message, args) {
    if (!userData.buildings)
      return message.channel.send("Tev nav uzbūvēts neviens teleports");

    if (args.length < 3)
      return message.channel.send("Ieraksti teleporta nosaukumu uz kurieni vēlies doties");

    let tel = undefined;
    userData.buildings.forEach(build => {
      if (build.id === 0 && build.name === args[2]) {
        return tel = build;
      }
    });

    if (!tel)
      return message.channel.send(`Nav atrast teleports ar nosaukumu ${args[2]}`);

    message.channel.send('Tu teleportējies');
    this.gotoWorldXY(tel.pos, userData, message);

  },

  eatItem(userData, worldData, message, args) {
    if (args.length < 3)
      return message.channel.send('Ko tieši Tu vēlies apēst?');

    const food = this.getItemByName(args[2]);
    if (!food)
      return message.channel.send('Nepareizi norādīts ēdiena nosaukums!');

    if (food.type != 1)
      return message.channel.send(`${args[2]} nav ēdiens!`);

    const c = this.countInventory(food.id, userData);
    if (c < 1)
      return message.channel.send(`Tev somā nav neviena ${args[2]}!`);

    let count = 1;
    if (args[3] && !isNaN(args[3])) {
      count = parseInt(args[3]);
      if (count > c)
        count = c;
    }

    for (let i = 0; i < count; i++) {
      userData.hp += food.effect.hp;
      userData.st += food.effect.st;
    }

    if (userData.hp > userData.hpMax)
      userData.hp = userData.hpMax;
    if (userData.st > userData.stMax)
      userData.st = userData.stMax;

    this.addInventory(userData, food.id, -count);

    this.saveUser(message.author.id, userData);

    const msg =
      `Tu apēdi ${count} ${args[2]}\n` +
      `\tHP - ${userData.hp}\n` +
      `\tStamina - ${userData.st}\n`

    message.channel.send(msg);
  },

  chest(userData, worldData, message, args) {
    function addToChest(id, count) {
      let add = false;
      chest.items.forEach(itm => {
        if (itm.id === id) {
          add = true;
          itm.count += count;
        }
      });
      if (!add) {
        chest.items.push({ id: id, count: count });
      }
    }

    if (!worldData.buildings)
      return message.channel.send('Te neatrodas nevienas lādes!');

    let chest = undefined;
    worldData.buildings.forEach(building => {
      if (building.id === 1)
        chest = building;
    });

    if (!chest)
      return message.channel.send('Te neatrodas nevienas lādes!');

    if (chest.uid != message.author.id && chest.locked)
      return message.channel.send('Lāde Tev nepieder un tā ir slēgta!');

    if (!args[2] || args[2] === 'info' || args[2] === 'i') {
      let msg = 'Informācija par lādi:\n';
      msg += chest.locked ? '\taizlēgta\n' : '\tatslēgta\n';
      if (!chest.items)
        msg += '\tLāde ir tukša\n';
      else {
        let cnt = 0;
        let m = "";
        chest.items.forEach(item => {
          const itm = this.getItem(item.id);
          cnt += item.count;
          if (item.count > 0)
            m += `\t${itm.name} - ${item.count}\n`;
        });
        msg += (cnt > 0) ? m : '\tLāde ir tukša\n'
      }
      return message.channel.send(msg);
    }

    if (args[2] === 'lock') {
      if (chest.uid != message.author.id)
        return message.channel.send('Tev nepieder šī lāde, nevari to aizslegt');

      chest.locked = true;
      this.saveWorldBuildings(userData.current, worldData.buildings);
      return message.channel.send('Tu aizslēdzi savu lādi, lai citi nevandās tajā!');
    }
    if (args[2] === 'unlock') {
      if (chest.uid != message.author.id)
        return message.channel.send('Tev nepieder šī lāde, nevari to aizslegt');

      chest.locked = false;
      this.saveWorldBuildings(userData.current, worldData.buildings);
      return message.channel.send('Tu atslēdzi savu lādi! Tagad ikviens no tās var kaut ko paņemt.');
    }

    if (args[2] === 'pick' || args[2] === 'p') {
      if (!chest.items)
        return message.channel.send('Lāde ir tukša, neko nevar izņemt');

      if (args[3] === 'all' || args[3] === 'a') {

        let c = 0;
        let m = `Tu paņēmi no lādes šādas lietas:\n`;
        chest.items.forEach(citm => {
          if (citm.count > 0) {
            this.addInventory(userData, citm.id, citm.count);
            const iitm = this.getItem(citm.id);
            c += citm.count;
            m += `\t${iitm.name} - ${citm.count}\n`
            citm.count = 0;
          }

        });

        this.saveInventory(message.author.id, userData);
        this.saveWorldBuildings(userData.current, worldData.buildings);
        if (c > 0)
          return message.channel.send(m);

        return message.channel.send(`Lādē nav lietu ko varētu paņemt`);
      }

      if (!args[3])
        return message.channel.send('Jānorāda lietas nosaukums, ko vēlies paņemt.');

      let itm = this.getItemByName(args[3]);
      if (!itm)
        return message.channel.send(`Nepareizi ierakstīji lietas nosaukumu ${args[3]}`);

      let item = undefined;
      chest.items.forEach(citm => {
        if (citm.id === itm.id && citm.count > 0)
          item = citm;
      });

      if (!item)
        return message.channel.send(`Lādē nav neviena ${args[3]}`);

      let count = args[4] && !isNaN(args[4]) ? parseInt(args[4]) : item.count;
      if (count > item.count)
        count = item.count;

      this.addInventory(userData, item.id, count);
      addToChest(item.id, -count);

      this.saveInventory(message.author.id, userData);
      this.saveWorldBuildings(userData.current, worldData.buildings);
      return message.channel.send(`Tu paņēmi no lādes ${count} gab ${args[3]}`);
    }

    if (args[2] === 'put' || args[2] == 'u') {

      if (!args[3])
        return message.channel.send('Jānorāda lietas nosaukums, ko vēlies ilikt lādē.');

      if (args[3] === 'all' || args[3] === 'a') {
        if (!userData.inventory)
          return message.channel.send('Tev nav nekā somā');
        let m = 'Tu ieliki lādē:\n';
        let c = 0;
        userData.inventory.forEach(item => {
          if (item.count > 0) {
            addToChest(item.id, item.count);
            const itm = this.getItem(item.id);

            m += `\t${itm.name}: ${item.count}\n`;
            c += item.count;
            item.count = 0;
          }
        });
        this.saveInventory(message.author.id, userData);
        this.saveWorldBuildings(userData.current, worldData.buildings);

        if (c > 0)
          return message.channel.send(m);

        return message.channel.send('Tev nav lietu, ko ielikt lādē!');
      }

      let item = this.getItemByName(args[3]);
      if (!item)
        return message.channel.send(`Nepareizi ierakstīji lietas nosaukumu ${args[3]}`);

      let cnt = this.countInventory(item.id, userData);
      if (cnt < 1)
        return message.channel.send(`Tev somā nav lietas ${args[3]}`);

      let count = args[4] && !isNaN(args[4]) ? parseInt(args[4]) : cnt;
      if (count < cnt)
        count = cnt;

      this.addInventory(userData, item.id, -count);
      this.saveInventory(message.author.id, userData);

      if (!chest.items)
        chest.items = [];

      addToChest(item.id, count);

      this.saveWorldBuildings(userData.current, worldData.buildings);
      return message.channel.send(`Tu ieliki ${count} gabalus  ${args[3]} lādē`);
    }

  },

  crafting(userData, worldData, message, args) {
    if (args.length < 3)
      return message.channel.send('Norādi lietas nosaukumu, ko vēlies izveidot!');

    if (!worldData.buildings)
      return message.channel.send('Te neatrodas workbench! Varbūt uzbēvē.');

    let work = undefined;
    worldData.buildings.forEach(building => {
      if (building.id === 4)
        work = building;
    });
    if (!work)
      return message.channel.send('Te neatrodas workbench! Varbūt uzbēvē.');

    const tool = this.getToolByName(args[2]);
    if (!tool)
      return message.channel.send(`Tu neparezi norādīji lietas nosaukumu ${args[2]}`);

    if (tool.type != 2 && this.findTool(tool.id, userData))
      return message.channel.send(`Tev jau ir izgatavots ${args[2]}`);

    let canCraft = true;
    tool.needs.forEach(need => {
      if (this.countAll(need.id, userData, worldData) < need.count)
        canCraft = false;
    });
    
    if (!canCraft) {
      let msg = `Tev nepietiek lietu lai izgatavotu ${args[2]}\n`;
      tool.needs.forEach(need => {
        const itm = this.getItem(need.id);
        const inv = this.countAll(need.id, userData, worldData);
        msg += `\t${itm.name}: ${need.count} (${inv})\n`;
      });
      return message.channel.send(msg);
    }

    if (!userData.tools)
      userData.tools = [];

    let add = false;
    userData.tools.forEach(t => {
      if (t.id === tool.id) {
        t.count += tool.count;
        add = true;
      }
    });

    if (!add)
      userData.tools.push({id: tool.id, level: 1, hp: 100, count: tool.count});

    tool.needs.forEach(need => {
      this.spendAll(userData, worldData, need.id, need.count);
    });

    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);

    return message.channel.send(`Tu izgatavoji ${args[2]}`);
  },

  attack(userData, worldData, message, args) {
    if (!worldData.beasts)
      return message.channel.send(`Tuvumā nav ienaidnieku, kam uzbrukt`);

    if (args.length < 3)
      return message.channel.send('Norādi ieroci ar ko uzbrukt!');
   
    const tool = this.getToolByName(args[2]);
    if (!tool)
      return message.channel.send(`Neparezi norādīts ieroča nosaukums ${args[2]}`);

    const wpn = [0,1];
    if (wpn.indexOf(tool.type) < 0)
      return message.channel.send(`${args[2]} nav ierocis`);

    const weapon = this.findTool(tool.id, userData);
    if (!weapon)
      return message.channel.send(`Tev nav izgatavots ${args[2]}`);

    if (weapon.hp < 1)
      return message.channel.send(`Ierocis ${args[2]} ir sabojājies, salabo to būvnīcā!`);

    if (userData.st < tool.st)
      return message.channel.send(`Tev nepietiek spēka (${userData.st}), lai lietotu ${args[2]} (${tool.st})`);

    userData.st -= tool.st;
    
    let msg = "";
    worldData.beasts.forEach(beast => {
      const b = this.getBeast(beast.id);
      if (!beast.hp) 
        beast.hp = b.hp;
      
      if (beast.hp <= 0)
        return;

      if (b.type.indexOf(tool.type) < 0)
      {
        msg += `Ierocis ${args[2]} nenodara kaitējumu ${b.name}\n`;
        return;
      }

      if (tool.type === 1) //BOW attack, check arrows
      {
        if (this.countInventory(2, userData) < 1)
        {
          msg += `Tev nepietk bultas, lai uzbruktu ${b.name}\n`;
          return;
        }
        this.addInventory(userData, 2, -1);
      }

      beast.hp -= (tool.dmg * this.calcLevel(weapon.level)).toFixed(2);
       

      msg += `Tu uzbruki ${b.name} ar ${args[2]}\n`;
      if (beast.hp <= 0)
      {
        msg += `Tu nogalināji ${b.name} un ieguvi:\n`;
        b.reward.forEach(rew => {
          this.addInventory(userData, rew.id, rew.count);
          const itm = this.getItem(rew.id);
          msg += `\t${itm.name}: ${rew.count}\n`;
        });
      } else {
        //TODO beast attack
        msg += `Tu ievainoji ${args[2]} - dzīvība: ${beast.hp} \n`;
        if (b.attack > 0)
        {
          //TODO calculate defence
          userData.hp -= b.attack;
          msg += `${args[2]} dod atbildes sitienu, Tev palika ${userData.hp} dzīvības\n`;
        }
      }
    });

    if (userData.hp <= 0)
      return this.dead(message, userData, worldData, msg);


    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);

    return message.channel.send(msg);

  },
  //#endregion

  //#region UTILS
  getWorldPos(x, y) {
    return `${x}:${y}`;
  },

  getWorldXY(pos) {
    const p = pos.split(':');
    return { x: parseFloat(p[0]), y: parseFloat(p[1]) };
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

  calcLevel(level) {
    return Math.sqrt(Math.floor(level));
  },

  //#endregion
}