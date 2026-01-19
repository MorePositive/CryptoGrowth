import { Col } from 'react-bootstrap';
import './topcoins.scss';

export const TopCoins = () => {
  return (
    <div className="topcoins">
      <Col md={{ span: 4, offset: 2 }}>
        <div className="block block-top">
          <table><tbody>
            <tr><td><img src="" alt=""/>Bitcoin</td><td>500%</td></tr>
            <tr><td><img src="" alt=""/>Ethereum</td><td>800%</td></tr>
            <tr><td><img src="" alt=""/>Bitcoin</td><td>500%</td></tr>
            <tr><td><img src="" alt=""/>Ethereum</td><td>800%</td></tr>
            <tr><td><img src="" alt=""/>Bitcoin</td><td>500%</td></tr>
            <tr><td><img src="" alt=""/>Ethereum</td><td>800%</td></tr>
            <tr><td><img src="" alt=""/>Bitcoin</td><td>500%</td></tr>
            <tr><td><img src="" alt=""/>Ethereum</td><td>800%</td></tr>
          </tbody></table>
        </div>
      </Col>
    </div>
  )
};
