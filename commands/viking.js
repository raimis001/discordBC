const { Collection } = require("discord.js");
const strings = {
  
  error01: "World reading error",
  error02: "User data reading error",
  error03: 'Nepazīstama komanda',
  
  beast01: 'Tālumā Tu redzi ganāmies deer',
  beast02: 'Woodenboy kaut kur tuvumā izdod savas urkšķošās skaņas',
  beast03: 'Tu dzirdi šņācošas skaņas, kaut kur tuvumā ir gallsnake, tas ir bīstami',
  beast04: 'Gaisā jūtama sēra smaka, kuru dvašo flamelings, tas ir ļoti bīstams stepes iemītnieks',
  beast05: 'Sasaldēts lidojoš zobs, bez loka šim nekādi netikt klāt. Frostteeth dzīvo tikai ļoti augstos kalnos.',

  msg01: 'Te neatrodas nekādas būves.',
  msg02: 'Tev nav uzbūvūta gulta.',
  msg03: 'Tu labi izgulējies un atjunojo spēkus.\n',
  
  msg04: "Tu esi kritis varonīgā nāvē, tevi pārcels uz tuvāko gultu, vai sākuma punktu\nTu pazaudēji visas lietas, kuras atradās Tev rokās.",
  msg05: "Šeit nekas nemētājas",
  msg06: 'Zemē mētājas:\n',
  msg07: '\t{0}: {1} gab\n',

  craft01: 'Norādi lietas nosaukumu, ko vēlies izveidot!\n',
  craft02: 'Te neatrodas workbench! Varbūt uzbūvē.',
  craft03: 'Tu neparezi norādīji lietas nosaukumu $item',
  craft04: 'Tev jau ir izgatavots $item',
  craft05: 'Tev nepietiek lietu lai izgatavotu $item \n',
  craft06: 'Tu izgatavoji $item',

  eat01: 'Ko tieši Tu vēlies apēst?\n',
  eat02: 'Nepareizi norādīts ēdiena nosaukums $item!\n',
  eat03: '$item nav ēdiens!',
  eat04: 'Tev nav neviena $item!',
  eat05: 'Tu apēdi $count $item',

  make01: 'Norādi lietas nosaukumu, ko vēlies pagatvot!\n',

  attack01: 'Tuvumā nav ienaidnieku, kam uzbrukt',
  attack02: 'Norādi ieroci ar ko uzbrukt!',
  attack03: 'Tev nav izgatyavots neviens ierocis, izgatavo to būvnīcā',
  attack04: 'Neparezi norādīts ieroča nosaukums $item',
  attack05: '$item nav ierocis',
  attack06: 'Tev nav izgatavots $item',
  attack07: 'Ierocis $item ir sabojājies, salabo to būvnīcā!',
  attack08: 'Tev nepietiek spēka ($st), lai lietotu $item ($st1)',
  attack09: 'Ierocis $item nenodara kaitējumu $beast\n',
  attack10: 'Tev uzbruka $beast ar spēku $attack\n',
  attack11: '$beast dod atbildes sitienu, Tev palika $hp dzīvības\n',
  attack12: 'Tev nepietiek bultas, lai uzbruktu $beast\n',
  attack13: 'Tu uzbruki $beasr ar $item\n',
  attack14: 'Tu nogalināji $beast un ieguvi:\n',
  attack15: 'Tu ievainoji {0} - palika dzīvība: {1}\n',
  attack16: '{0} dod atbildes sitienu ar spēku {1}\n',

  helpT01: '[axe] Cirvis labs iesācēja ierocis, viegli iemācīties un labi sit dažādus mošķus, kas staigā pa zemi',
  helpT02: '[bow] Loks labi noder medīt tālu staigājošus vai lidojošus mošķus. Mošķis ne vienmēr var atbildēt uz loka šaušanu',
  helpT03: '[arrows] Ja ir loks, nepieciešamas arī bultas, bez bultām loks bezjēdzīgs.',
  helpT04: '[pants] Ja ir kājās bikses, vieglak skriet gan cauri brikšņiem, gan pa tīrumiem, nedaudz palīdz pret mošķu uzbrukumiem.',
  helpT05: '[tunic] Ir jabi, ja ķermeni aizsargā ādas kamzolis, mošķu uzbrukumi mazāk sāpīgi, kā arī vieglāk pārvietoties',

  helpI0: '[wood] Parasts koks, daudz kur izmanto, daudz kur var atrast',
  helpI1: '[stone] Akmens, saimniecībā noderīga lieta',
  helpI2: '[berries] Ogas aug daudz kur, tā ir noderīga barība it sevišķi sākumā',
  helpI3: '[skin] Pievārējot kādu mošķi, no dažiem var iegūt ādu',
  helpI4: '[bone] Daži mošķi pēc sevis atstāj tikai kaulus',
  helpI5: '[meat] Jēla gaļa iegūstama no dažiem mošķiem, bet tā nav ēdama, kamēr napagatavo',
  helpI6: '[roast] Ugunskurā cepta gaļa, kas gan vēl var būt labāks izsalkušam kareivim',
  helpI7: '[shrooms] Sēnes ir ēdamas, kaut kur mežā noteikti aug sēnes',
  helpI8: '[lians] Uz kokiem aug dažādas lietas, ja noplēš uzaugumus, var iegūt ko noderīgu, piemēram virves',
  helpI9: '[rope] Bez virves kā bez rokām, virvi gan būs jāpin pašam, atrast to nevarēs',
  helpI10: '[coal] Lai izkausētu metālu ar malku nepietiks, nākas iegūt ogles',

  helpB0: '[stonepile] akmeņkrāvums kalpo kā zīme, kur tu vari atgriezties, bez vārda tas nedarbojas',
  helpB1: '[chest] lādē vari glabāt visādas lietas tās nepazudīs, ja nomirsi',
  helpB2: '[shelter] -',
  helpB3: '[bed] atpūta laba lieta, tā atjaunos spēkus, veselību gan tā nespēj ietekmēt',
  helpB4: '[workbench] būvnīca vari izgatavot lietas, kas tev palīdzēs izdzīt šajā pasaulē',
  helpB5: '[fireplace] garšīgas ēdamas lietas vari pagatavot ugunskurā',

  
}
module.exports = {
  name: "Kordēlija",
  description: "Survival game",

  database: 0,
  discord: 0,

  items: [
    { id: 0, name: "wood", type: 0, random: { terrains: [1, 2, 3, 4, 5], prc: 7, max: 7 }, help: strings.helpI0 },
    { id: 1, name: "stone", type: 0, random: { terrains: [1, 2, 3, 4, 5, 8, 9], prc: 3, max: 3 }, help: strings.helpI1 },
    { id: 2, name: "berries", type: 1, effect: { hp: 1, st: 2 }, random: { terrains: [1, 2, 3, 4, 5], prc: 5, max: 3 }, help: strings.helpI2 },
    { id: 3, name: "skin", type: 0, help: strings.helpI3 },
    { id: 4, name: "bone", type: 0, help: strings.helpI4 },
    { id: 5, name: "meat", type: 2, help: strings.helpI5 },
    { id: 6, name: "roast", type: 1, effect: { hp: 10, st: 7 }, help: strings.helpI6 },
    { id: 7, name: "shrooms", type: 1, effect: { hp: 2, st: 1 }, random: { terrains: [2, 3, 4, 5], prc: 1, max: 10 }, help: strings.helpI7 },
    { id: 8, name: "lians", type: 0, random: { terrains: [3, 4, 5], prc: 1, max: 3 }, help: strings.helpI8 },
    { id: 9, name: "rope", type: 0, help: strings.helpI9 },
    { id: 10, name: "coal", type: 0, help: strings.helpI10 },
  ],

  recepies: [
    { id: 1, name: "roast", result: [{ id: 6, count: 1 }, { id: 10, count: 1}], building: 5, needs: [{ id: 5, count: 1 }, { id: 0, count: 2 }] },
    { id: 2, name: "rope", result: [{ id: 9, count: 5 }], building: 4, needs: [{ id: 8, count: 1 }] },
  ],

  terrains: [
    { id: 0, name: "jūra" },
    { id: 1, name: "pļavas" },
    { id: 2, name: "pļavas" },
    { id: 3, name: "pļavas" },
    { id: 4, name: "meži" },
    { id: 5, name: "meži" },
    { id: 6, name: "stepes" },
    { id: 7, name: "stepes" },
    { id: 8, name: "kalni" },
    { id: 9, name: "kalni" },
    { id: 10, name: "mistiskās zemes" },
  ],

  beasts: [
    { id: 0, name: "deer", hp: 5, attack: 0, type: [1], agresive: 0, terrains: [1, 2, 3, 4], rnd: 5, 
       reward: [{ id: 3, count: 1 }, { id: 4, count: 2 }, { id: 5, count: 3 }], 
       msg: strings.beast01 },
    { id: 1, name: "woodenboy", hp: 10, attack: 1, type: [0, 1], agresive: 0, terrains: [2, 3, 4,], rnd: 3, 
       reward: [{ id: 0, count: 2 }], 
       msg: strings.beast02 },
    { id: 2, name: "gallsnake", hp: 30, attack: 3, type: [0, 1], agresive: 5, terrains: [3, 4, 5], rnd: 3, 
       reward: [{ id: 3, count: 2 }, { id: 4, count: 1 }], 
       msg: strings.beast03 },
    { id: 3, name: "flameling", hp: 50, attack: 5, type: [0, 1], agresive: 7, terrains: [6, 7], rnd: 3, 
       reward: [{ id: 5, count: 2 }, { id: 10, count: 1 }], 
       msg: strings.beast04 },
    { id: 4, name: "frostteeth", hp: 20, attack: 2, type: [1], agresive: 7, terrains: [8, 9], rnd: 3, 
       reward: [{ id: 5, count: 2 }, { id: 4, count: 5 }], 
       msg: strings.beast04 },
  ],
  //https://www.fantasynamegenerators.com/monster-names.php
  //Rotgolem
  //Stinkgirl
  

  buildings: [
    { id: 0, name: "stonepile", needs: [{ id: 1, count: 10 }], help: strings.helpB0 },
    { id: 1, name: "chest", needs: [{ id: 0, count: 20 }, { id: 1, count: 10 }], help: strings.helpB1 },
    { id: 2, name: "shelter", needs: [{ id: 0, count: 30 }, { id: 1, count: 10 }], help: strings.helpB2 },
    { id: 3, name: "bed", needs: [{ id: 0, count: 15 }], help: strings.helpB3 },
    { id: 4, name: "workbench", needs: [{ id: 0, count: 10 }, { id: 1, count: 5 }], help: strings.helpB4 },
    { id: 5, name: "fireplace", needs: [{ id: 0, count: 5 }, { id: 1, count: 10 }], help: strings.helpB5 }
  ],

  tools: [
    { id: 0, name: "axe", type: 0, needs: [{ id: 0, count: 5 }, { id: 1, count: 2 }], dmg: 10, count: 1, st: 3, help: strings.helpT01 },
    { id: 1, name: "bow", type: 1, needs: [{ id: 0, count: 25 }, { id: 9, count: 1 }], dmg: 8, count: 1, st: 2, help: strings.helpT02 },
    { id: 2, name: "arrows", type: 2, needs: [{ id: 0, count: 5 }, { id: 1, count: 2 }], count: 20, help: strings.helpT03 },
    { id: 3, name: "pants", type: 3, needs:[{id: 3, count: 5},{id: 4, count: 3}, {id: 9, count: 2}],count: 1, hp: 5, st: 10, help: strings.helpT04 },
    { id: 4, name: "tunic", type: 3, needs:[{id: 3, count: 10},{id: 4, count: 2}, {id: 9, count: 2}],count: 1, hp: 15, st: 5, help: strings.helpT05 },
  ],

  perlin: require(`../tools/perlin.js`),
  perlinScale: 19,

  regenTime: 20 * 60 * 1000,

  init(database, client) {
    this.database = database;
    this.discord = client;
    this.perlin.init();

    console.log(`${this.name} module ready`);
  },
  //#region PROCESS MESSAGES

  process(message, args) {

    this.getUser(message.author.id,

      (userData) => {
        this.getWorld(userData.current,
          (worldData) => {
            this.processMessage(userData, worldData, message, args);
          },
          () => { console.log(strings.error01); }
        )
      },
      () => { console.log(strings.error02); }
    );


  },

  processMessage(userData, worldData, message, args) {
    if (args.length <= 1)
      return this.getInfo(userData, worldData, message);

    if (args[1] === 'pick' || args[1] === 'p')
      return this.pickItem(userData, worldData, message, args)

    if (args[1] === 'iventory' || args[1] === 'i')
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

    if (args[1] === 'make' || args[1] === 'm')
      return this.make(userData, worldData, message, args);

    if (args[1] === 'help' || args[1] === 'h')
      return this.help(userData, worldData, message, args);

    if (args[1] === 'sleep' || args[1] === 's')
      return this.sleep(userData, worldData, message, args);

    return message.channel.send(strings.error03);
  },
  //#endregion

  help(userData, worldData, message, args) {
    if (args.length < 3) {
      const msg = 
        'Commands:\n' +
        '(i)nventory\n' +
        '(c)hest [(h)elp]\n' +
        '(g)o [up, down, left, right]\n' +
        '(t)eleport [stonepile name]\n' +
        '(p)ick [(a)ll | item name]\n' +
        'c(r)aft [item name]\n' +
        '(b)uild [item name]\n' +
        '(m)ake [recepie name]\n' +
        '(s)leep - ja ir gulta, atjauno spēkus\n' +
        '(h)elp items - lietu saraksts\n' +
        '(h)elp craft - izgatavojamo lietu saraksts\n' +
        '(h)elp build - būvju saraksts\n' +
        '(h)elp [name] - wiki par lietu name\n'
  
      return message.channel.send(msg);
    }
    if (args[2] === 'items') {
      let msg = 'Pieejamo lietu saraksts:\n';
      this.items.forEach(item => {
        msg += '\t' + item.name + '\n'
      })

      return message.channel.send(msg);
    }
    if (args[2] === 'craft') {
      let msg = 'Izgatavojamās lietas:\n'
      this.tools.forEach(t => {
        msg += '\t' + t.name + '\n'
      })
      return message.channel.send(msg);
    }
    if (args[2] === 'build') {
      let msg = 'Pieejamās būves:\n'
      this.buildings.forEach(b => {
        msg += `\t${b.name}\n`
      })
      return message.channel.send(msg);
    }

    const tool = this.getToolByName(args[2]);
    if (tool) {
      let msg = tool.help + `\nLai pagatavotu ${tool.count} ${tool.name} nepieciešams\n`
      tool.needs.forEach(n => {
        const itm = this.getItem(n.id)
        msg += `\t${itm.name} - ${n.count}\n`
      })
      if (tool.type == 0 || tool.type == 1){
        msg += 'Parametri:\n'
        msg += `\tDamage: ${tool.dmg} Stamina: ${tool.st}`
      }
      if (tool.type == 3) {
        msg += 'Papildina:\n'
        msg += `\tMax HP +${tool.hp} Max ST +${tool.st}`
      }
      return message.channel.send(msg);
    }
    const item = this.getItemByName(args[2])
    if (item) {
      let msg = item.help + '\n';
      const recepie = this.getRecepieByName(args[2])
      if (recepie) {
        const b = this.getBuilding(recepie.building)
        msg += `Var pagatavot ${b.name}:\n`
        recepie.needs.forEach(n => {
          const itm = this.getItem(n.id)
          msg += `\t${itm.name}: ${n.count} \n`
        })
        msg += 'Iegūst:\n'
        recepie.result.forEach(r => {
          const itm = this.getItem(r.id)
          msg += `\t${itm.name}: ${r.count} \n`
        })
      }
      if (item.effect) {
        msg += 'Effekts apēdot:\n'
        msg += `\tHp +${item.effect.hp} ST +${item.effect.st}\n`
      }
      if (item.random) {
        msg += 'Var atrast lokācijās:\n'
        let last = ''
        item.random.terrains.forEach(t=>{
          const ter = this.getTerrain(t)
          if (last === ter.name)
            return
          msg += `\t${ter.name}\n`
          last = ter.name
        })
      }
      
      return message.channel.send(msg);
    }

    const build = this.getBuildingByName(args[2])
    if (build) {
      let msg = build.help + '\n'
      msg += 'Lai uzbūvētu, nepieciešams:\n'
      build.needs.forEach(b => {
        const itm = this.getItem(b.id)
        msg += `\t${itm.name} - ${b.count}\n`
      })
      
      return message.channel.send(msg);
    }
  },

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
      start: `${x}:${y}`,
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

    this.items.forEach(item => {
      if (!item.random)
        return;

      if (item.random.terrains.indexOf(terrain) < 0)
        return;

      if (item.random.prc < this.getRandomInt(0, 10))
        return;

      let c = this.getRandomInt(1, item.random.max);

      items.push({ id: item.id, count: c })
    });

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
  getTerrain(id) {
    let terrain = undefined
    this.terrains.forEach(t => {
      if (t.id === id)
        terrain = t
    })

    return terrain
  },
  
  getBuilding(id) {
    let build = undefined;
    this.buildings.forEach(element => {
      if (element.id === id)
        build = element;
    });
    return build;
  },

  getBuildingByName(name) {
    let build = undefined;
    this.buildings.forEach(element => {
      if (element.name === name)
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

  getRecepieByName(name) {
    let recepie = undefined;
    this.recepies.forEach(r => {
      if (r.name === name)
        recepie = r;
    });
    return recepie;
  },

  getBeast(id) {
    let beast = undefined;
    this.beasts.forEach(b => {
      if (b.id == id)
        beast = b;
    });

    return beast;
  },

  getBeastDamage(beast) {
    if (beast.agresive < 1)
        return 0;
    
    const rnd = this.getRandomInt(0, 9);
      if (beast.agresive < rnd)
        return 0;

    return beast.attack;
  },
  
  beastAttack(userData, worldData, message, showParams = false) {
    if (!worldData.beasts)
       return;

    let msg = ""
    let attacked = false
    
    worldData.beasts.forEach(beast => {
      const b = this.getBeast(beast.id);
      const a = this.getBeastDamage(b);
      if (a <= 0)
        return;

      userData.hp -= a;
      msg += this.format(strings.attack10,["$beast","$attack"],[b.name, a]);
      attacked = true
    });

    if (!attacked)
      return;

    if (showParams)
      msg += this.getParams(userData)
    
    message.channel.send(msg)
    
    if (userData.hp <= 0)
      return dead(userData, worldData, message);

    
  },
  
  dead(message, userData, worldData) {
    message.channel.send(strings.msg04);

    if (userData.inventory) {
      userData.inventory.forEach(item => {
        item.count = 0;
      })
    }

    userData.hp = userData.maxData;
    userData.st = userData.stMax;
    
    let tel = undefined;
    userData.buildings.forEach(build => {
      if (tel)
        return;
      
      if (build.id === 0) {
        return tel = build;
      }
    });

    this.gotoWorldXY(tel ? tel.pos : userData.start, userData, message);
   
  },

  //#endregion

  //#region INVENTORY
  saveInventory(id, userData) {

    const ref = this.database.ref(`viking/users/${id}/inventory`);
    ref.set(userData.inventory);
  },

  countInventory(id, userData) {
    if (!userData.inventory)
      return 0
    
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
      if (item.id === id) {
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

  addTools(userData, id, count) {
    if (!userData.tools)
      userData.tools = [];
    
    let add = false;
    userData.tools.forEach(t => {
      if (t.id === id) {
        t.count += count;
        add = true;
      }
    });

    if (!add)
      userData.tools.push({ id: id, level: 1, hp: 100, count: count });
  },
  
  countTools(id, userData) {
    if (!userData.tools)
       return 0

    let cnt = 0
    userData.tools.forEach(t => {
      if (t.id === id)
        cnt += t.count
    })

    return cnt;
  },
  //#endregion

  //#region COMMANDS
  getInfo(userData, worldData, message) {
    this.showInfo(userData, worldData, message);
    this.showBuildings(userData, worldData, message);
    this.showItems(userData, worldData, message);
    this.showBeasts(userData, worldData, message);
    this.showTeleports(userData, worldData, message);
  },

  showInfo(userData, worldData, message)  {
    const msg =
      `Tava atrašanās vieta: ${userData.current}\n` +
      `Tu atrodies ${this.terrains[worldData.terrain].name}\n` +
      this.getParams(userData)
      
    message.channel.send(msg);
  },

  showItems(userData, worldData, message) {
    if (!worldData.items || worldData.items.length <= 0) 
      return message.channel.send(strings.msg05);
    
    let msg = strings.msg06;
    let cnt = 0;
    worldData.items.forEach(item => {
      cnt += item.count;
      if (item.count > 0) {
        const itm = this.getItem(item.id);
        msg += this.format1(strings.msg07,[itm.name, item.count]);
      }
    });
    
    message.channel.send(cnt > 0 ? msg : strings.msg05);
  },

  showBuildings(userData, worldData, message)  {
    
    if (!worldData.buildings || worldData.buildings.length <= 0) {
      message.channel.send(`Te neatrodas nekādas būves\n`);
      return
    }

    
    let buildPromise = [];
    var list = new Collection();
    let msg = `Te atrodas šādas ēkas:\n`;
    worldData.buildings.forEach((build, index) => {
      buildPromise.push(this.discord.users.fetch(build.uid));
      list.set(index, build);
    }); 

    Promise.all(buildPromise).then((users) => {

      users.forEach((user, index) => {
        const build = list.get(index);

        const b = this.getBuilding(build.id);
        msg += `\t${b.name} ${build.id === 0 ? '(' + build.name + ')' : ''} no ${user.username}\n`;

      })
      message.channel.send(msg);
      
    })
  },

  showBeasts(userData, worldData, message)  {
    if (!worldData.beasts || worldData.beasts.length <= 0)
      return;

    let msg = ''
    worldData.beasts.forEach(beast => {
      const b = this.getBeast(beast.id);
      msg += b.msg + '\n';
    });
    
    message.channel.send(msg);
  },

  showTeleports(userData, worldData, message) {
    if (!userData.buildings)
      return  message.channel.send("Tu neesi uzcēlis nevienu akmeņkrāvumu");
    
    let msg = 'Tavi akmenskrāvumi:\n' 
    let cnt = 0;
    
    userData.buildings.forEach(build => {
      if (build.id === 0 ) {
        msg += `\t${build.name}`;
        cnt++;
      }
    });

    if (cnt < 1)
      return  message.channel.send("Tu neesi uzcēlis nevienu akmeņkrāvumu");
    
    message.channel.send(msg);
  },
  
  build(userData, worldData, message, args) {
    if (args.length < 3) {
      let msg = `Norādi, ko vēlies būvēt\n`;
      this.buildings.forEach(build => {

        let nds = "";
        build.needs.forEach(need => {
          const b = this.getItem(need.id);
          const c = this.countAll(need.id, userData, worldData)
          nds += `${b.name} - ${need.count}(${c}) `;
        });
        msg += `\t${build.name}\n \t\t${nds}\n`
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

    const b = this.findBuilding(building.id, worldData);
    if (b)
      return message.channel.send(`Tev jau ir uzbūvēts ${building.name} šajā sektorā`);

    if (building.id === 0 && args.length < 4)
      return message.channel.send(`Šai ēkai ir jānorāda nosaukums`);


    let canbuild = true;
    building.needs.forEach(need => {
      const c = this.countAll(need.id, userData, worldData);
      if (c < need.count)
        canbuild = false;
    });

    if (!canbuild) {
      let msg = `Tev nepietiek lietas būvniecībai ${args[2]}\n`;
      building.needs.forEach(need => {
        const c = this.countAll(need.id, userData, worldData);
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


    if (!userData.buildings) {
      if (building.id != 0)
        return message.channel.send('Tev nav uzbūvēts stonepile un nevari būvet kaut ko citu');
      userData.buildings = [];
    }
    userData.buildings.push({ pos: userData.current, id: building.id, name: save.name });

    building.needs.forEach(need => {
      this.spendAll(userData, worldData, need.id, need.count);
    });


    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);

    message.channel.send(`Tu uzbūveji ${args[2]}\n`);
    if (building.id === 0) {
      message.channel.send(`Tagad vari izmantot teleportu ar nosaukumu ${args[3]}, lai ātri pārvietotos uz šo pozīciju`);
    }
  },

  pickItem(userData, worldData, message, args) {
    if (!worldData.items || worldData.items.length < 1) 
      return message.channel.send(strings.msg05);

    if (args[2] === 'all' || args[2] === 'a' || args.length < 3) {//Pickup all items
      let msg = `Tu pacēli:\n`;
      let cnt = 0
      worldData.items.forEach(item => {
        if (item.count <= 0)
          return;
        
        cnt += item.count;
        this.addInventory(userData, item.id, item.count);
        const itm = this.getItem(item.id);
        const c = this.countInventory(item.id, userData);

        msg += `\t${itm.name} ${item.count} (${c})\n`;
        item.count = 0;
      });
      
      this.saveInventory(message.author.id, userData);
      this.saveWorldItems(userData.current, worldData.items);

      message.channel.send(cnt > 0 ? msg : strings.msg05);
      
      this.beastAttack(userData, worldData, message, true);
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

    this.beastAttack(userData, worldData, message, true);

    const c = this.countInventory(id, userData)
    message.channel.send(`Tu pacēli ${cnt} ${args[2]} (${c})`);

    this.saveInventory(message.author.id, userData);
    this.saveWorldItems(userData.current, worldData.items);

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
    if (args.length < 3)
      return message.channel.send('Uz kurieni vēlies doties - up, down, left, right?');

    if (args[2] === 'help' || args[2] === 'h') 
      return message.channel.send(`Komanda pārvieto Tevi norādītā virzienā - up, down, left, right`);

    if (userData.st < 1)
      return message.channel.send('Tev nepietiek spēka pārvietoties, uzēd kaut ko');

    let pos = this.getWorldXY(userData.current);
    switch (args[2]) {
      case 'up':
      case 'u':
        pos.y++;
        break;
      case 'down':
      case 'd':
        pos.y--;
        break;
      case 'left':
      case 'l':
        pos.x--;
        break;
      case 'right':
      case 'r':
        pos.x++
        break;

      default:
        return message.channel.send('Uz kurieni Tu vēlies doties - up, down, left, right?');
    }

    if (pos.x < 0 || pos.y < 0) 
      return message.channel.send("Tu esi sasniedzis pasaules malu un nevari tai doties pāri");

    userData.st--;
    
    this.beastAttack(userData, worldData, message);
    this.gotoWorldXY(this.getWorldPos(pos.x, pos.y), userData, message);

  },

  teleport(userData, worldData, message, args) {
    if (!userData.buildings)
      return message.channel.send("Tev nav uzbūvēts neviens akmeņkrāvums");

    if (args.length < 3)
      return message.channel.send("Ieraksti akmeņkrāvuma nosaukumu uz kurieni vēlies doties");

    let tel = undefined;
    userData.buildings.forEach(build => {
      if (build.id === 0 && build.name === args[2]) {
        return tel = build;
      }
    });

    if (!tel)
      return message.channel.send(`Nav atrast akmeņkrāvums ar nosaukumu ${args[2]}`);

    message.channel.send('Tu teleportējies');
    this.gotoWorldXY(tel.pos, userData, message);

  },

  eatItem(userData, worldData, message, args) {
    if (args.length < 3 || args[2] === 'h' || args[2] === 'help') {
      let msg = 
        strings.eat01;

      if (userData.inventory) 
        userData.inventory.forEach(item => {
          const itm = this.getItem(item.id);
          if (itm.type != 1)
            return
          const c =  this.countAll(item.id, userData, worldData);
          msg += '\t' + itm.name + ` (${c})\n`
        })
      return message.channel.send(msg);
    }

    const food = this.getItemByName(args[2]);
    if (!food) {
      let msg = 
        this.format(strings.eat02,["$item"],[args[2]])

      if (userData.inventory) 
        userData.inventory.forEach(item => {
          const itm = this.getItem(item.id);
          if (itm.type != 1)
            return
          const c =  this.countAll(item.id, userData, worldData);
          msg += '\t' + itm.name + ` (${c})\n`
        })
      return message.channel.send(msg);
    }

    if (food.type != 1)
      return message.channel.send( this.format( strings.eat03,["$item"],[args[2]] ) )

    const c = this.countAll(food.id, userData, worldData);
    if (c < 1)
      return message.channel.send(this.format(strings.eat04,["$item"],[args[2]]));

    let count = 1;
    if (args[3] && !isNaN(args[3])) {
      count = parseInt(args[3]);
      if (count > c)
        count = c;
    }

    const hp = food.effect.hp * count
    const st = food.effect.st * count
    userData.hp += hp ;
    userData.st += st;
    

    if (userData.hp > userData.hpMax)
      userData.hp = userData.hpMax;
    if (userData.st > userData.stMax)
      userData.st = userData.stMax;

    this.spendAll(userData, worldData, food.id, count);

    this.saveUser(message.author.id, userData);

    const msg =
      this.format(strings.eat05,["$count", "$item"],[count, args[2]]) +
      `\tHp +${hp} St +${st} \n` +
      this.getParams(userData)

    message.channel.send(msg);
  },

  chest(userData, worldData, message, args) {
    function addToChest(id, count) {
      let add = false;
      if (!chest.items)
        chest.items = []
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

    if (args[2] && (args[2] === 'help' || args[2] === 'h')) {
      let msg =
        `Lādes komandas:\n` +
        `\t(i)nfo - informācijas par lādes saturu\n` +
        `\t(l)ock - aizslēgt lādi\n` +
        `\tu(n)lock - atslēgt lādi\n` +
        `\t(p)ick itemName (count) - paņemt no lādes lietu itemName skaitā count\n` +
        `\t(p)ick (a)ll - paņemt no lādes visas lietas\n` +
        `\tp(u)t itemName (count) - Pārlikt lietu itemName uz lādi\n` +
        `\tp(u)t (a)ll - Pārlikt visas lietas no somas uz lādi\n`

      return message.channel.send(msg);
    }

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

    if (args[2] === 'lock' || args[2] === 'l') {
      if (chest.uid != message.author.id)
        return message.channel.send('Tev nepieder šī lāde, nevari to aizslegt');

      chest.locked = true;
      this.saveWorldBuildings(userData.current, worldData.buildings);
      return message.channel.send('Tu aizslēdzi savu lādi, lai citi nevandās tajā!');
    }
    if (args[2] === 'unlock' || args[2] === 'n') {
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
    if (args.length < 3 || args[2] === 'h' || args[2] === 'help') {
      let msg = strings.craft01
      this.tools.forEach(tool => {
        msg += tool.name + "\n\t"
        
        tool.needs.forEach(need => {
          const itm = this.getItem(need.id)
          const cnt = this.countAll(need.id, userData, worldData)
          msg += itm.name + " - " + need.count + `(${cnt}) `
        })
        msg += '\n'
      })
      
      return message.channel.send(msg);
    }

    if (!worldData.buildings)
      return message.channel.send(strings.craft02);

    let work = undefined;
    worldData.buildings.forEach(building => {
      if (building.id === 4)
        work = building;
    });
    if (!work)
      return message.channel.send(strings.craft02);

    const tool = this.getToolByName(args[2]);
    if (!tool)
      return message.channel.send(this.format(strings.craft03,["$item"],[args[2]]));

    if (tool.type != 2 && this.findTool(tool.id, userData))
      return message.channel.send(this.format(strings.craft04,["$item"],[args[2]]));

    let canCraft = true;
    tool.needs.forEach(need => {
      if (this.countAll(need.id, userData, worldData) < need.count)
        canCraft = false;
    });

    if (!canCraft) {
      let msg = this.format(strings.craft05,["$item"],[args[2]]);
      tool.needs.forEach(need => {
        const itm = this.getItem(need.id);
        const inv = this.countAll(need.id, userData, worldData);
        msg += `\t${itm.name}: ${need.count} (${inv})\n`;
      });
      return message.channel.send(msg);
    }

    if (tool.type == 3) {
      userData.hpMax += tool.hp
      userData.stMax += tool.st
    }
    
    this.addTools(userData,tool.id,tool.count)

    tool.needs.forEach(need => {
      this.spendAll(userData, worldData, need.id, need.count);
    });

    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);

    return message.channel.send(this.format(strings.craft06,["$item"],[args[2]]));
  },

  attack(userData, worldData, message, args) {
    if (!worldData.beasts)
      return message.channel.send(strings.attack01);

    if (!userData.tools || userData.tools.length <= 0)
      return message.channel.send(strings.attack03);
    
    if (args.length < 3) {
      //TODO: show weapons list
      return message.channel.send(strings.attack02);
    }

    const tool = this.getToolByName(args[2]);
    if (!tool)
      return message.channel.send(this.format(strings.attack04,["$iten"],[args[2]]));

    const wpn = [0, 1];
    if (wpn.indexOf(tool.type) < 0)
      return message.channel.send(this.format(strings.attack05, ["$item"], [args[2]]));

    const weapon = this.findTool(tool.id, userData);
    if (!weapon)
      return message.channel.send(this.format(strings.attack06, ["$item"], [args[2]]));

    if (weapon.hp < 1)
      return message.channel.send(this.format(strings.attack07, ["$item"], [args[2]]));

    if (userData.st < tool.st)
      return message.channel.send(this.format(strings.attack08, ["$item", "$st", "$st1"], [args[2], userData.st, tool.st]));
                            

    userData.st -= tool.st;

    let msg = "";
    let attacking = true;
    worldData.beasts.forEach(beast => {
      if (!attacking)
        return;

      const b = this.getBeast(beast.id);
      const a = this.getBeastDamage(b);
      if (!beast.hp)
        beast.hp = b.hp;

      if (beast.hp <= 0)
        return;

      if (b.type.indexOf(tool.type) < 0) {//Wrong weapon
        msg += this.format(strings.attack09,["$item","$beast"],[args[2],b.name]);
        if (a > 0) {
          userData.hp -= a;
          msg += this.format(strings.attack11,["$beast","$hp"], [b.name, userData.hp]);
        }
        return;
      }

      if (tool.type === 1) {//BOW attack, check arrows
      
        attacking = false;
        
        if ( this.countTools(2, userData) < 1) {
          msg += this.format(strings.attack12,["$beast"],[b.name]);
          return;
        }

        if (a > 0 && this.getRandomInt(0,9) < 5)//50% less posibility conterattack
          a = 0
        
        this.addTools(userData, 2, -1);
      }

      beast.hp -= (tool.dmg * this.calcLevel(weapon.level)).toFixed(2);

      msg += this.format(strings.attack13,["$beast","$item"],[b.name, args[2]]);
      if (beast.hp <= 0) {
        msg += this.format(strings.attack14,["$beast"],[b.name]);
        b.reward.forEach(rew => {
          this.addInventory(userData, rew.id, rew.count);
          const itm = this.getItem(rew.id);
          msg += `\t${itm.name}: ${rew.count}\n`;
        });
      } else {
        //TODO beast attack
        msg += this.format1(strings.attack15,[b.name, beast.hp]);
        if (a > 0) {
          userData.hp -= a;
          msg += this.format1(strings.attack16,[b.name, a]);
        }
      }
    });

    message.channel.send(msg + this.getParams(userData));

    if (userData.hp <= 0)
      return this.dead(message, userData, worldData);
    
    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);   

  },

  make(userData, worldData, message, args) {
    if (args.length < 3 || args[2] === 'h' || args[2] === 'help') {
      let msg = strings.make01
      this.recepies.forEach(r => {
        msg += '\t' + r.name + '\n'
        r.needs.forEach(n => {
          const itm = this.getItem(n.id)
          const c = this.countAll(n.id, userData, worldData)
          msg += '\t\t' + itm.name + ` ${n.count}(${c})`
        })
        msg += '\n'
      })

      
      return message.channel.send(msg);
    }

    if (!worldData.buildings)
      return message.channel.send(strings.msg01);

    let recepie = this.getRecepieByName(args[2]);
    if (!recepie)
      return message.channel.send(`Tu nepareizi norādīji receptes nosaukumu ${args[2]}`);

    let building = undefined;
    this.buildings.forEach(b => {
      if (b.id === recepie.building)
        building = b;
    });
    if (!building)
      return message.channel.send(`Neparezi norādīta nepieciešamā būve ${recepie.building}`);

    let work = undefined;
    worldData.buildings.forEach(building => {
      if (building.id === recepie.building)
        work = building;
    });

    if (!work)
      return message.channel.send(`Te neatrodas ${building.name}. Varbūt uzbēvē.`);

    let cnt = args[3] ? args[3] === 'a' ? 1000 : !isNaN(args[3]) ? parseInt(args[3]) : 1 : 1;

    let res = 0;
    for (let i = 0; i < cnt; i++) {

      let canMake = true;
      recepie.needs.forEach(n => {
        if (this.countAll(n.id, userData, worldData) < 1)
          canMake = false;
      });
      if (!canMake)
        break;

      recepie.needs.forEach(n => {
        this.spendAll(userData, worldData, n.id, n.count);
      });

      recepie.result.forEach(r => {
        this.addInventory(userData, r.id, r.count);
      });

      res++;
    }

    if (res < 1) {
      let msg = `Pietrūkst resursu, lai pagatavotu ${args[2]}\n`;
      recepie.needs.forEach(n => {
        const itm = this.getItem(n.id);
        const c = this.countAll(n.id, userData, worldData);
        msg += `\t${itm.name}: ${n.count} (${c})\n`;
      });
      return message.channel.send(msg);
    }

    let msg = `Tu pagatavoji ${args[2]} un ieguvi\n`
    recepie.result.forEach(r => {
      const itm = this.getItem(r.id);
      msg += `\t${itm.name}: ${r.count * res}\n`;
    });

    this.saveUser(message.author.id, userData);
    this.saveWorld(userData.current, worldData);


    return message.channel.send(msg);

  },
  
  sleep(userData, worldData, message, args) {
    if (args[2] === 'h' || args[2] === 'help') {
      let msg = 'Ja ir gulta, var izgulēt nogurumu'
      return message.channel.send(msg);
    }
    if (!worldData.buildings)
      return message.channel.send(strings.msg01);

    let work = undefined;
    worldData.buildings.forEach(building => {
      if (building.id === 3)
        work = building;
    });

    if (!work)
      return message.channel.send(strings.msg02);

    userData.st = userData.maxSt;
    this.saveUser(message.author.id, userData);

    return message.channel.send(strings.msg03 + this.getParams(userData));
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

  getProgress(progress, max) {
    const blank = "░";
    const black = "▓";

    const p = (progress / max) * 10;

    let msg = '';
    for (let i = 0; i < 10; i++) {
      msg += p <= i ? blank : black;
    }

    return msg;

  },

  getParams(userData) {
    const msg =
      "```diff\n-" + this.getProgress(userData.hp,userData.hpMax) + ` ${userData.hp} (${userData.hpMax}) Hp` + "\n" +
      "+" +this.getProgress(userData.st,userData.stMax) + ` ${userData.st} (${userData.stMax}) Stamina`+  "\n```";

    return msg;
  },

  format(message, form, values) {
    for (let i = 0; i < form.length; i++) {
      if (message.includes(form[i]))
        message = message.replace(form[i], values[i])
    }
    return message
  },

  format1(message, values) {
    for (let i = 0; i < values.length; i++) {
      const form = "{" + i +"}";
      message = message.replace(form, values[i])
    }
    return message
  }
  
  //#endregion
}