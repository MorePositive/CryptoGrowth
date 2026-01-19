import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

function App() {
  /*const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  return (
    <div className="App">
      <Header />
      <Main />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>Some graphics? i.e. comparison of S&P with total crypto market</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card><Card.Body>Capitalization of top 10 assets?</Card.Body></Card>
          </Col>
          <Col>
            <Card><Card.Body>Latest trends (from CoinGecko api)</Card.Body></Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card><Card.Body>Latest headlines</Card.Body></Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
