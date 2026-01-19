import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getTrends } from '../../api/coingecko';
import './trends.scss';

export const Trends = (rates) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getTrends((data) => setData(data.coins));
  }, []);

  var getPrice = (price_btc) => {
    return rates && rates.usd
      ? '$' + (price_btc * rates)
      : price_btc + ' BTC'
  }

  return (
    data ? (
      <Card className="block-trends">
        <Card.Title>Trending coins</Card.Title>
        <Card.Body>
            <table width="100%"><tbody>
              {data.map(function(coin, i) {
                  return <tr key={i}>
                    <td className="symbol">{coin.item.symbol}</td>
                    <td><img src={coin.item.thumb} alt=""/></td>
                    <td className="name">{coin.item.name}</td>
                    <td>{getPrice(coin.item.price_btc)}</td>
                  </tr>;
              })}
            </tbody></table>
        </Card.Body>
      </Card>
    ) : ''
  )
};
