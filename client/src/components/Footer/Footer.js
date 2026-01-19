import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { REFERRAL_LINK, SOCIAL_LINK } from '../../constants/social';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <div>Some of the information above is taken from sources like these</div>
            <div className="exchanges">
              <a href={REFERRAL_LINK.BINANCE} target="_blank" rel="noreferrer">
                <img src="https://bin.bnbstatic.com/static/images/common/favicon.ico" alt="Binance" />
              </a>
              <a href={REFERRAL_LINK.OKX} target="_blank" rel="noreferrer">
                <img src="https://www.okx.com/favicon.ico" alt="OKX" />
              </a>
              <a href={REFERRAL_LINK.HUOBI} target="_blank" rel="noreferrer">
                <img src="https://www.huobi.com/favicon.ico" alt="Huobi" />
              </a>
              <a href={REFERRAL_LINK.GATE} target="_blank" rel="noreferrer">
                <img src="https://www.gate.io/favicon.ico?v=2.0" alt="Gate" />
              </a>
            </div>
          </Col>
          <Col>
            <div className="social">
              <div>Contact us:</div>
              <a href={SOCIAL_LINK.FACEBOOK} target="_blank" rel="noreferrer">
                <img src="https://www.facebook.com/favicon.ico" alt="facebook" />
              </a>
              <a href={SOCIAL_LINK.TWITTER} target="_blank" rel="noreferrer">
                <img src="https://www.twitter.com/favicon.ico" alt="twitter" />
              </a>
              <a href={SOCIAL_LINK.TELEGRAM} target="_blank" rel="noreferrer">
                <img src="https://www.telegram.com/favicon.ico" alt="telegram" />
              </a>
            </div>
          </Col>
        </Row>
        <Col className="text-end">
            <ul className="col menu">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
            All right reserved, 2022
          </Col>
      </Container>
    </footer>
  );
};

export default Footer;