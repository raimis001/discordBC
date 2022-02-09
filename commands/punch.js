const util = require('util');

module.exports = {
    name: "punch",
    description: "Punch interface",

    messages: [
        "%s atvēzejas sitienam ar %s un belž %s pa %s",
        "%s sakoncetrējas un sit ar %s pa %s kaut kur pa %s",
        "%s aizžmiedz acis, un kā dod ar %s pa %s %s",
    ],
    weapons: [
        { name: "labo roku", attack: 1 },
        { name: "kreiso roku", attack: 1 },
        { name: "labo celi", attack: 2 },
        { name: "kreiso celi", attack: 2 },
        { name: "labo kāju", attack: 3 },
        { name: "kreiso kāju", attack: 3 },
    ],
    parts: [
        { name: "galvu", defence: 0 },
        { name: "vēderu", defence: 1 },
        { name: "pakaļu", defence: 2 },
    ],
    victories: [
        "%s saļimst pie %s kājām, viss ko viņš var darīt, lūgt publisku piedošanu",
        "paiet mirklis... bet nē %s krīt ar blīkšķi, %s noskatās šajā bēdīgā ainā un aiziet kā varonis",
        "%s vēl turas, vel mazliet, un.. nē vēl tikai izdveš %s virzienā - Tu esi labākais!",
    ],
    loses: [
        "spēcīgais %s sitiens gandrīz nogāž %s no kājām, bet viņš noturas un ir uzvarējis šajā cīņā",
        "%s gaida, kas nu būs, bet nekas, %s stāv kā klints un nekas viņu nespēj nogāzt",
        "kas tas bija?! %s muļļājas un viņa kavēšanās nenes nekādu labumu, %s ir gatavs un viegli atvaira sitienu un tikai pasmejas par vārgo mēģinājumu",
    ],
    draws: [
        "varbūt no malas viss nav redzams, bet gan %s gan %s jau jūt, šī cīņa nav galā un tā būs jātrpina",
        "kas par %s sitienu, bet kad kaujas putekļi ir nosedušies, var redzēt %s siluetu, šajā ciņā ir neizšķirts",
        "%s izdara sav sitienu, bet %s vēsi to atraida, gaidīsim turpinājumu, pagaidām neizšķirts",
    ],
    punch(message, args) {

        let targetMember = message.mentions.members.first();
        if (!targetMember)
            return message.channel.send("No mentions");


        const usr = `<@${message.author.id}>`;
        const trg = `<@${targetMember.user.id}>`;
        const msg = this.messages[this.getRandom(0, this.messages.length - 1)];
        const wpn = this.weapons[this.getRandom(0, this.weapons.length - 1)];
        const prt = this.parts[this.getRandom(0, this.parts.length - 1)];

        let text = util.format(msg, usr, wpn.name, trg, prt.name);
        message.channel.send(text);

        let msg1 = "";
        if (wpn.attack > prt.defence)
            msg1 = this.victories[this.getRandom(0, this.victories.length - 1)];
        else if (wpn.attack < prt.defence)
            msg1 = this.loses[this.getRandom(0, this.loses.length - 1)];
        else
            msg1 = this.draws[this.getRandom(0, this.draws.length - 1)];

        text = util.format(msg1, trg, usr);
        message.channel.send(text);

    },
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}  