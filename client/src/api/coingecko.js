const api = (path, cb) => {
    return fetch('https://api.coingecko.com/api/v3' + path)
      .then((res) => res.json())
      .then((data) => cb(data),
      err => {
          console.log('well it\'s failed. show a message or something', err);
      });
}

export const getTrends = (cb) => api('/search/trending', cb);
export const getRates = (cb) => api('/exchange_rates', cb);
export const getHistorical = (pastDate, cb) => {
    api('/coins/bitcoin/history?date=' + pastDate + '&localization=false', cb)
};
