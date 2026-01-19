import './topcoins.scss';

export const TopCoins = ({ coins }) => {
  // decrease length to 10
  const top10 = coins.slice(0, 10);
  return (
    <div className="block block-top">
      <table><tbody>
        { top10.map(coin => (
          <tr className="table-line">
            <td>{ coin.market_cap_rank }</td>
            <td><img className="coin-img" src={coin.image} alt={coin.id}/></td>
            <td>{ coin.name }</td>
            <td>{ coin.current_price }$</td>
          </tr>
        )) }
      </tbody></table>
    </div>
  )
};
