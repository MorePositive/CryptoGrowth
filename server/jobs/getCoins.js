const api = require('../provider/coingecko');
const fs = require('fs');
const path = require('path');

module.exports = (params) => {
    return new Promise((resolve, reject) => {
        const COINS_JSON = path.resolve(__dirname, '../coins.json');

        params.out('Getting list from API...');
        api.getList(res => {
            var terms = [];
            var result = {};
            for(let i=0, term; i<res.length; i++) {
                term = res[i].id + '_' + res[i].name;
                terms.push(term);
                result[term] = res[i];
            }
            
            params.out('Writing to', COINS_JSON);
            fs.writeFileSync(COINS_JSON, JSON.stringify({
                timestamp: Date.now(),
                terms: terms,
                list: result
            }));

            params.out('Done.');
            resolve();
        });
    });
};
