const https = require('https');

// response example

//     "id": "bitcoin",
//     "symbol": "btc",
//     "name": "Bitcoin",
//     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//     "current_price": 38818,
//     "market_cap": 740059808333,
//     "market_cap_rank": 1,
//     "fully_diluted_valuation": 816649130360,
//     "total_volume": 26757950188,
//     "high_24h": 39099,
//     "low_24h": 37615,
//     "price_change_24h": 552.12,
//     "price_change_percentage_24h": 1.44287,
//     "market_cap_change_24h": 11651453589,
//     "market_cap_change_percentage_24h": 1.59958,
//     "circulating_supply": 19030518,
//     "total_supply": 21000000,
//     "max_supply": 21000000,
//     "ath": 69045,
//     "ath_change_percentage": -43.73572,
//     "ath_date": "2021-11-10T14:24:11.849Z",
//     "atl": 67.81,
//     "atl_change_percentage": 57189.6528,
//     "atl_date": "2013-07-06T00:00:00.000Z",
//     "roi": null,
//     "last_updated": "2022-05-04T14:56:32.765Z"


exports.getList = (cb) => {
    const req = https.request('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false', (res) => {
        let json = '';
        res.on('data', (data) => json += data);
        res.on('end', () => {
            json = JSON.parse(json);
            cb(json);
        });
    });
    req.end();
};
