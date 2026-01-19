const api = (path, cb) => {
    return fetch('https://api.coingecko.com/api/v3' + path)
      .then((res) => res.json())
      .then((data) => cb(data),
      err => {
          console.log('well it\'s failed. show a message or something', err);
      });
}

export const getCoins = (cb) => api('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', cb);
export const getTrends = (cb) => api('/search/trending', cb);
export const getRates = (cb) => api('/exchange_rates', cb);
export const getHistorical = (coin, pastDate, cb) => api(`/coins/${coin}/history?date=${pastDate}&localization=false`, cb);
