import React from 'react';
import { Card } from 'react-bootstrap';
import './trends.scss';

const Trends = ({ data, rates }) => {

  const formatNumber = (num) => num.toLocaleString(undefined, { minimumFractionDigits: 3 });
  const getPrice = (price_btc) => {
    return rates?.usd
      ? '$' + formatNumber(price_btc * rates.usd.value)
      : formatNumber(price_btc) + ' BTC'
  }

  const generateTable = (data = []) => {
    return (
      <Card className="block">
        <Card.Title>Trending coins</Card.Title>
        <Card.Body className="block-trends">
          <table width="100%"><tbody>
            {data.map((coin, i) => {
              return <tr key={i}>
                <td className="symbol">{coin.item.symbol}</td>
                <td><img src={coin.item.thumb} alt={coin.item.symbol} /></td>
                <td className="name">{coin.item.name}</td>
                <td>{getPrice(coin.item.price_btc)}</td>
                <td className="marketCap"><span>{coin.item.market_cap_rank}</span></td>
              </tr>
            })}
          </tbody></table>
        </Card.Body>
      </Card>
    )
  };

  return data ? generateTable(data) : 'no data yet';
};

export default Trends;
