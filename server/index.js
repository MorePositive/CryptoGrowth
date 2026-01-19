const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const PORT_B = 3001;
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

    const ohlcApi = require('./provider/cryptowatch');
    app.get('/api/ohlc/:coin/:after/:before/:period/:exchange', (req, res) => {
        ohlcApi.getOHLC(req.params.coin, req.params.after, req.params.before, req.params.period, req.params.exchange, res);
    });

    const newsApi = require('./provider/newsapi');
    app.get('/api/news/:searchTerm/:pageSize/', (req, res) => {
        newsApi.getHeadlines(req.params.searchTerm, req.params.pageSize, res);
    });

    return true;
};

const configureSSR = () => {
    const buildIndexPath = path.resolve(BUILD_DIR, 'index.html');
    const publicIndexPath = path.resolve(__dirname, '../client/public/index.html');

    // Prefer the production build index if present
    if (fs.existsSync(buildIndexPath)) {
        try {
            const indexFile = fs.readFileSync(buildIndexPath, 'utf-8');
            require('./babel');
            const render = require('./render');
            app.enable('etag');
            app.set('etag', 'weak');
            app.get('*', (req, res) => {
                render(req, res, indexFile);
            });

            return true;
        } catch (err) {
            console.log('Error reading build/index.html:', err && err.message ? err.message : err);
            // fall through to try the public index
        }
    }

    // Fallback to the client/public/index.html during development
    if (fs.existsSync(publicIndexPath)) {
        console.log('build/index.html not found — using client/public/index.html as a fallback (development mode).');
        app.get('*', (req, res) => {
            res.sendFile(publicIndexPath);
        });
        return true;
    }

    // Nothing available — be explicit about what to do next
    console.log('Cannot find build/index.html or client/public/index.html. Please run `npm run build` in the client folder and try again.');
    return false;
};

const startServer = () => {
    var serverOptions = {};
    try {
        serverOptions.key = fs.readFileSync('/etc/letsencrypt/live/cryptogrowth.app/privkey.pem');
        serverOptions.cert = fs.readFileSync('/etc/letsencrypt/live/cryptogrowth.app/fullchain.pem');
    } catch(err) {
        console.log('Cannot read certificate and key!', err.message);
        PORT = PORT_B;
    }

    (PORT !== PORT_B ? https : http).createServer(serverOptions, app).listen(PORT, () => {
        console.log('Server listening on', PORT);
    });
    
    if(PORT !== PORT_B) {
        http.createServer((req, res) => {
            res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
            res.end();
        }).listen(PORT_B, () => {
            console.log('Redirect server for HTTP started.');
        });
    }

    return true;
};

let result = configureServer();
result = result && configureSSR();
result = result && startServer();
