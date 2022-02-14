module.exports = {
    name: "slot",
    description: "slot mashine simulation",

    database: 0,
    discord: 0,

    l: "═╬╠╣╔╗╚╝",

    victory: [
        { line: "════", multi: 2 },
        { line: "═╬╬═", multi: 3 },
        { line: "╬══╬", multi: 4 },
        { line: "╬╬╬╬", multi: 5 },
        { line: "╠╬╬╣", multi: 6 },
        { line: "╔══╗", multi: 7 },
        { line: "╚══╝", multi: 8 },
        { line: "╠══╣", multi: 9 },
        { line: "╔╬╬╗", multi: 10 },
        { line: "╚╬╬╝", multi: 11 },

    ],
    rand: [
        "══╬╬╠╔╚╠╔",
        "═╬═╬╬═══╬",
        "═╬═╬╬═══╬",
        "══╬╬╣╗╝╣╝",
    ],

    process(message, args) {

        if (args[1] === 'help' || args[1] === 'h')
            return this.showHelp(message);

        this.database.readUser(message.author.id, (userData) => {
            if (userData.usd < 1) {
                message.reply("Tev nepietiek naudas pat vienam griezienam!");
                return;
            }

            let usd = 1;
            if (!isNaN(args[1])) {
                usd = parseFloat(args[1]);
                if (userData.usd < usd) {
                    message.reply("Tev nav tik daudz naudas!");
                    return;
                }
            }


            const r0 = this.rand[0][this.getRandomInt(0, 8)];
            const r1 = this.rand[1][this.getRandomInt(0, 8)];
            const r2 = this.rand[2][this.getRandomInt(0, 8)];
            const r3 = this.rand[3][this.getRandomInt(0, 8)];

            const msg = `${r0}${r1}${r2}${r3}`;


            let win = 0;
            this.victory.forEach(element => {
                if (element.line.startsWith(msg)) {
                    win = element.multi;
                }
            });

            userData.usd = userData.usd - usd + usd * win;
            this.database.saveUser(message.author.id, userData);

            // setTimeout(() => {
            //     message.reply(`${r0} ...`);
            //     setTimeout(() => {
            //         message.reply(`${r0} ${r1} ...`);
            //         setTimeout(() => {
            //             message.reply(`${r0} ${r1} ${r2} ...`);
            //             setTimeout(() => {
            //                 let m = `${r0} ${r1} ${r2} ${r3}\n`;
            //                 if (win == 0)
            //                     m += `Tu zaudēji summu ${usd} USD`;
            //                 else
            //                     m += `Tev izkrita laimests ${usd * win} USD!`;

            //                 message.reply(m);
            //             }, 500);
            //         }, 500);
            //     }, 500);
            // }, 500);

            let m = `${r0} ${r1} ${r2} ${r3}\n`;
            if (win == 0)
                m += `Tu zaudēji summu ${usd} USD`;
            else
                m += `Tev izkrita laimests ${usd * win} USD!`;

            message.reply(m);
        });

    },

    showHelp(message) {

        let msg = `Uzvaras paterni:\n`;
        this.victory.forEach(element => {
            msg += `${element.line} x ${element.multi} USD\n`;
        });

        message.channel.send(msg);

    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

}