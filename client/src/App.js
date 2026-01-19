import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getCoins, getRates } from './api/coingecko';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Trends } from './components/Trends/Trends';
import { Ads } from './components/Ads/Ads';
import { Headlines } from './components/Headlines/Headlines';
import { Footer } from './components/Footer/Footer';

function App() {
  const [coins, setCoins] = useState([]);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getRates((data) => setRates(data.rates)),
      getCoins(data => setCoins(data)),
      new Promise(function(resolve) { 
        setTimeout(resolve.bind(null), 1000)
      })
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <div className={`loader ${loading ? 'loading' : 'loaded'}`}><div className="loader_logo"></div></div>
      <Header />
      <Main coins={coins} loader={setLoading} />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>Some graphics? i.e. comparison of S&P with total crypto market</Card.Body>
            </Card>
          </Col>
          <Ads />
        </Row>
        <Row>
          <Col xs="6">
            <Card><Card.Body>Capitalization of top 10 assets?</Card.Body></Card>
          </Col>
          <Col xs="6">
            <Trends rates={rates} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title>Latest headlines</Card.Title>
              <Card.Body>
                <Headlines />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
