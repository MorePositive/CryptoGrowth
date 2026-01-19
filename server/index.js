const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
let PORT = 443;

const BUILD_DIR = path.resolve(__dirname, '../client/build');
const COINS_JSON = path.resolve(__dirname, 'coins.json');

const configureServer = () => {
    app.disable('x-powered-by');
    app.use(express.static(BUILD_DIR, {
        index: false
    }));

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

    const api = require('./provider/cryptowatch');
    app.get('/api/ohlc/:coin/:after/:before/:period/:exchange', (req, res) => {
        api.getOHLC(req.params.coin, req.params.after, req.params.before, req.params.period, req.params.exchange, res);
    });

    return true;
};

const configureSSR = () => {
    let indexFile;
    try {
        indexFile = fs.readFileSync(path.resolve(BUILD_DIR, 'index.html'), 'utf-8');
        require('./babel');
        const render = require('./render');
        app.enable('etag');
        app.set('etag', 'weak');
        app.get('*', (req, res) => {
            render(req, res, indexFile);
        });

        return true;
    } catch (err) {
        console.log('Cannot read the build/index.html file, aborting the process');
        return false
    }
};

const startServer = () => {
    var serverOptions;
    try {
        serverOptions.key = fs.readFileSync('/etc/letsencrypt/live/cryptogrowth.app/privkey.pem');
        serverOptions.cert = fs.readFileSync('/etc/letsencrypt/live/cryptogrowth.app/fullchain.pem');
    } catch(err) {
        console.log('Cannot read certificate and key!', err.message);
        PORT = 80;
    }

    https.createServer(serverOptions, app).listen(PORT, () => {
        console.log('Server listening on', PORT);
    });
    
    if(PORT !== 80) {
        http.createServer((req, res) => {
            res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
            res.end();
        }).listen(80, () => {
            console.log('Redirect server for HTTP started.');
        });
    }

    return true;
};

let result = configureServer();
result = result && configureSSR();
result = result && startServer();
