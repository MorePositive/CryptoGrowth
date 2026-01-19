import React from 'react';
import { Card } from 'react-bootstrap';
import { convertToBillions } from '../../helpers';
import './trends.scss';

const Trends = ({ data, rates, title, isTrends, toATH }) => {

  const formatNumber = (num) => num.toLocaleString(undefined, { minimumFractionDigits: 3 });
  const getPrice = (price_btc) => {
    return rates?.usd
      ? '$' + formatNumber(price_btc * rates.usd.value)
      : formatNumber(price_btc) + ' BTC'
  }

  const generateTable = (data = []) => {
    return (
      <Card className="block-trends">
        <Card.Title>{title}</Card.Title>
        <Card.Body>
            <table width="100%"><tbody>
              {data.map((coin, i) => {
                  return <tr key={i}>
                    <td className="symbol">{isTrends ? coin.item.symbol : coin.symbol}</td>
                    <td><img src={isTrends ? coin.item.thumb : coin.image} alt="crypto asset logo" /></td>
                    <td className="name">{isTrends ? coin.item.name : coin.name}</td>
                    <td>{isTrends ? 
                      getPrice(coin.item.price_btc) : toATH ? 
                      `${(coin.atl_change_percentage).toFixed(2)}%` : 
                      convertToBillions(coin.market_cap)}
                    </td>
                  </tr>;
              })}
            </tbody></table>
        </Card.Body>
      </Card>
    )
  };

  return data && generateTable(data);
};

export default Trends;
