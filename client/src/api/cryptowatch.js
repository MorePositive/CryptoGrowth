export const getOHLC = (coin, from, before, exchange, cb) => {
    return new Promise((resolve, reject) => {
        fetch(`/api/ohlc/${coin}/${from}/${before}/weekly/${exchange || ''}`)
            .then(res => res.json())
            .then(data => resolve(data),
            err => {
                console.log('CW API has failed', err);
                reject(err);
            });
    });
};
