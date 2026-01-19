const https = require('https');

const PERIODS = {
    weekly: '604800_Monday',
    daily: '86400',
    hourly: '3600'
}

exports.getOHLC = (coin, after, before, period, exchange, ref) => {
    exchange = exchange || 'kraken';
    let url = `https://api.cryptowat.ch/markets/${exchange}/${coin}usd/ohlc?periods=${PERIODS[period]}`;
    if(after) url += '&after=' + after;
    if(before) url += '&before=' + before;
    const req = https.request(url, (res) => {
        if (typeof ref === 'object') {
            res.pipe(ref);

        } else if(typeof ref === 'function') {
            let json = '';
            res.on('data', (data) => json += data);
            res.on('end', () => {
                json = JSON.parse(json);
                ref(json);
            });
        }
    });
    req.end();
};
