import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Trends } from './components/Trends/Trends';
import { Headlines } from './components/Headlines/Headlines';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Container>
        <Row>
          <Col xs="8">
            <Card>
              <Card.Body>Some graphics? i.e. comparison of S&P with total crypto market</Card.Body>
            </Card>
          </Col>
          <Col xs="4">
            <Card>
              <Card.Body>Ads block</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="5">
            <Card><Card.Body>Capitalization of top 10 assets?</Card.Body></Card>
          </Col>
          <Col xs="7">
            <Card>
              <Card.Title>Trending coins</Card.Title>
              <Card.Body><Trends/></Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title>Latest headlines</Card.Title>
              <Card.Body><Headlines/></Card.Body></Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
