const api = require('../provider/coingecko');
const fs = require('fs');
const path = require('path');

const COINS_JSON = path.resolve(__dirname, '../coins.json');

console.log('Getting list from API...');
api.getList(res => {
    var terms = [];
    var result = {};
    for(let i=0, term; i<res.length; i++) {
        term = res[i].id + '_' + res[i].name;
        terms.push(term);
        result[term] = res[i];
    }
    console.log('Writing to', COINS_JSON);
    fs.writeFileSync(COINS_JSON, JSON.stringify({
        timestamp: Date.now(),
        terms: terms,
        list: result
    }));
    console.log('Done.');
});
