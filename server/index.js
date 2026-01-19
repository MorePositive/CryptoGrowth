const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const BUILD_DIR = path.resolve(__dirname, '../client/build');
const COINS_JSON = path.resolve(__dirname, 'coins.json');

app.get('/api/search/:term', (req, res) => {
    var coins = require(COINS_JSON); // read cache or just rewrite to a DB
    var term = String(req.params.term).toLowerCase().trim();
    if(term.length < 3) return res.json({ count:0, error:'Enter more characters' });

    var results = [];
    for(let i=0; i<coins.terms.length; i++) {
        if(coins.terms[i].indexOf(term) !== -1) {
            results.push(coins.list[coins.terms[i]]);
        }
        if(results.length > 15) break;
    }
    res.json({ term:term, count:results.length, results:results });
});

const indexFile = fs.readFileSync(path.resolve(BUILD_DIR, 'index.html'), 'utf-8');
require('./babel');
const render = require('./render');
app.get('/', (req, res) => {
    render(req, res, indexFile);
});

app.use(express.static(BUILD_DIR));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
