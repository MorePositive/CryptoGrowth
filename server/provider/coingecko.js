const https = require('https');

exports.getList = (cb) => {
    const req = https.request('https://api.coingecko.com/api/v3/coins/list', (res) => {
        var json = '';
        res.on('data', (data) => json += data);
        res.on('end', () => {
            json = JSON.parse(json);
            cb(json);
        });
    });
    req.end();
};
