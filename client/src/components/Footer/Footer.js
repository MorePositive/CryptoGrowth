import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <div>Some of the information above is taken from sources like these</div>
            <div className="exchanges">
              <a href="https://binance.com/" target="_blank" rel="noreferrer">
                <img src="https://bin.bnbstatic.com/static/images/common/favicon.ico" alt="Binance" />
              </a>
              <a href="https://www.okx.com/" target="_blank" rel="noreferrer">
                <img src="https://www.okx.com/favicon.ico" alt="OKX" />
              </a>
              <a href="https://www.huobi.com/" target="_blank" rel="noreferrer">
                <img src="https://www.huobi.com/favicon.ico" alt="Huobi" />
              </a>
              <a href="https://www.gate.io/" target="_blank" rel="noreferrer">
                <img src="https://www.gate.io/favicon.ico?v=2.0" alt="Gate" />
              </a>
            </div>
          </Col>
          <Col>
            <div className="social">
              facebook, twitter, telegram
            </div>
          </Col>
          <Col className="text-end">
            <ul className="col menu">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
            All right reserved, 2022
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;