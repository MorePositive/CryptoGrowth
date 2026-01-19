import React from 'react';
import { Card } from 'react-bootstrap';
import './ath.scss';

const ATH = ({ data }) => {

  const formatPercentage = (number) => {
    number = parseFloat(number);
    let output = number.toLocaleString(undefined, { minimumFractionDigits: 3 });
    return output.replace('.', '.<span>') + '</span> %';
  };
  const sortToATH = (allCoins) => {
    return [...allCoins].sort((a, b) => b.atl_change_percentage - a.atl_change_percentage);
  };

  const generateTable = (data = []) => {
    return (
        <Card className="block">
            <Card.Title>All Time Top Gainers</Card.Title>
            <Card.Body className="block-ath">
                <table width="100%"><tbody>
                    {data.map((coin, i) => {
                        return <tr key={i}>
                            <td className="symbol">{coin.symbol}</td>
                            <td><img src={coin.image} alt={coin.symbol} /></td>
                            <td className="name">{coin.name}</td>
                            <td className="price" dangerouslySetInnerHTML={{ __html: formatPercentage(coin.atl_change_percentage)}}></td>
                        </tr>;
                    })}
                </tbody></table>
            </Card.Body>
        </Card>
    )
  };

  return data
    ? generateTable(sortToATH(data).slice(0, 10))
    : 'no data yet';
};

export default ATH;
