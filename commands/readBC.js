module.exports = {
    name: "read",
    description: "Read BC data from API",
    value: 0,
    lastReading: 0,
    execute(callback ) {

        const tm = Date.now() - this.lastReading;

        if (tm < 60000) {
            callback();
            return;
        }
        this.readValue(callback);
    },

    readValue(callback) {
        const request = require('request');
        const options = {json: true};

        request(process.env.BC_URL, options, (error, res, body) => {
            if (error) {
                console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
                this.value = parseFloat(body.data.amount);
                this.lastReading = Date.now();
            };

            callback();
        });
    },

}