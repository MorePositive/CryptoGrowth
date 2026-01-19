import { useState, useEffect } from 'react';

export const Headlines = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('https://newsdata.io/api/1/news?apikey=014d9c6bc04e47e5a34fe95e1e3b1b0b&q=crypto&language=en')
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
