import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  /*const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  return (
    <div className="App">
      <header>
        <h1>Cryptosomething</h1>
        <p>Check out how much did you miss on crypto!</p>
      </header>
      <main className="highlight">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <div class="block block-search container">
                <Row>
                  <Col>Enter name of the coin</Col>
                  <Col><a href="#date" class="date">05 May, 2014</a></Col>
                </Row>
                <Row><input placeholder="cd client && npm i react-select-search" /></Row>
              </div>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <div class="block block-top">
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
          </Row>
        </Container>
      </main>
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
      <footer>
        <Container>
          <Row>
            <Col>Footer left part</Col>
            <Col>Footer right part</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
