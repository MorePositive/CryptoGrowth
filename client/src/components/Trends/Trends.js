import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { getTrends } from '../../api/coingecko';
import './trends.scss';

const Trends = ({ rates }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getTrends((data) => setData(data.coins));
  }, []);

  const formatNumber = (num) => num.toLocaleString(undefined, { minimumFractionDigits: 3 });
  const getPrice = (price_btc) => {
    return rates?.usd
      ? '$' + formatNumber(price_btc * rates.usd.value)
      : formatNumber(price_btc) + ' BTC'
  }

  return (
    data ? (
      <Card className="block-trends">
        <Card.Title>Trending coins</Card.Title>
        <Card.Body>
            <table width="100%"><tbody>
              {data.map((coin, i) => {
                  if(i>10) return null;
                  return <tr key={i}>
                    <td className="symbol">{coin.item.symbol}</td>
                    <td><img src={coin.item.thumb} alt="" /></td>
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

export default Trends;
