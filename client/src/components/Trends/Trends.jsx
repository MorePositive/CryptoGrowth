import { useState, useEffect } from 'react';

export const Trends = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => setData(data.coins));
  }, []);

  return (
    <div className="block">
      {data ? (
        <table width="100%"><tbody>
          {data.map(function(coin, i) {
              return <tr key={i}>
                <td><img src={coin.item.thumb} alt=""/></td>
                <td className="symbol">{coin.item.symbol}</td>
                <td>{coin.item.name}</td>
                <td>{coin.item.price_btc} BTC</td>
              </tr>;
          })}
        </tbody></table>
      ) : 'no data available'}
    </div>
  )
};
