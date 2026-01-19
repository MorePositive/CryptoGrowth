import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
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
              <ReactGA.OutboundLink to={REFERRAL_LINK.BINANCE} target="_blank" eventLabel="binance">
                <img src="https://bin.bnbstatic.com/static/images/common/favicon.ico" alt="Binance" />
              </ReactGA.OutboundLink>
              <ReactGA.OutboundLink to={REFERRAL_LINK.OKX} target="_blank" eventLabel="okx">
                <img src="https://www.okx.com/favicon.ico" alt="OKX" />
              </ReactGA.OutboundLink>
              <ReactGA.OutboundLink to={REFERRAL_LINK.HUOBI} target="_blank" eventLabel="huobi">
                <img src="https://www.huobi.com/favicon.ico" alt="Huobi" />
              </ReactGA.OutboundLink>
              <ReactGA.OutboundLink to={REFERRAL_LINK.GATE} target="_blank" eventLabel="gate">
                <img src="https://www.gate.io/favicon.ico?v=2.0" alt="Gate" />
              </ReactGA.OutboundLink>
            </div>
          </Col>
          <Col>
            <div className="social">
              <div>Contact us:</div>
              <ReactGA.OutboundLink to={SOCIAL_LINK.FACEBOOK} target="_blank" eventLabel="facebook">
                <img src="https://www.facebook.com/favicon.ico" alt="facebook" />
              </ReactGA.OutboundLink>
              <ReactGA.OutboundLink to={SOCIAL_LINK.TWITTER} target="_blank" eventLabel="twitter">
                <img src="https://www.twitter.com/favicon.ico" alt="twitter" />
              </ReactGA.OutboundLink>
              <ReactGA.OutboundLink to={SOCIAL_LINK.TELEGRAM} target="_blank" eventLabel="telegram">
                <img src="https://www.telegram.com/favicon.ico" alt="telegram" />
              </ReactGA.OutboundLink>
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