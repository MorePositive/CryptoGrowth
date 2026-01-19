import React from 'react';
import ReactGA from 'react-ga';
import './topcoins.scss';

const TopCoins = ({ coins, setCoinValue }) => {

  const top10 = coins.slice(0, 8);
  const changeCoin = (coin) => {
    ReactGA.event({ category: 'widget', action: 'coin', label: coin.id });
    setCoinValue(coin);
  }

  return (
    <div className="block block-top">
      <table className="top-list"><tbody>
        { top10.map((coin, n) => (
          <tr key={n} onClick={e => changeCoin(coin)}>
            <td className="rank">{ coin.market_cap_rank }</td>
            <td className="symbol">{coin.symbol}</td>
            <td><img className="coin-img" src={coin.image} alt={coin.id}/></td>
            <td className="name">{ coin.name }</td>
            <td>${ coin.current_price }</td>
          </tr>
        )) }
      </tbody></table>
    </div>
  )
};

export default TopCoins;
