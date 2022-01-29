module.exports = {
    name: "read",
    description: "Read BC data from API",
    value: 0,
    lastReading: 0,
    uri: "https://api.coinbase.com/v2/prices/spot?currency=USD",
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

        request(this.uri, options, (error, res, body) => {
            if (error) {
                console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
                //console.log(body);
                this.value = parseFloat(body.data.amount);
                this.lastReading = Date.now();
            };

            callback();
        });
    },

}