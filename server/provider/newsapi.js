const https = require('https');

const API_KEY = '014d9c6bc04e47e5a34fe95e1e3b1b0b';

exports.getHeadlines = (searchTerm = 'crypto', pageSize = 10, ref) => {
    let url = `https://newsapi.org/v2/everything?language=en&q=${searchTerm}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    const req = https.request(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
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
