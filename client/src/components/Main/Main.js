import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getCoins, getRates, getTrends } from '../../api/coingecko';

// Components
import Hero from '../Hero/Hero';
import TopCoins from '../TopCoins/TopCoins';
import Trends from '../Trends/Trends';
import Ads from '../Ads/Ads';
import ATH from '../ATH/ATH';
import Heatmap from '../Heatmap/Heatmap';
import Headlines from '../Headlines/Headlines';
import './main.scss';

const Main = () => {

  const [coins, setCoins] = useState([]);
  const [rates, setRates] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  
  useEffect(() => {
    Promise.all([
      getRates(data => setRates(data.rates)),
      getCoins(data => setCoins(data)),
      getTrends(data => setTrends(data.coins.slice(0, 10)))
    ]).then(() => {
      setLoading('render');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  const setfromList = useCallback((e) => setValue(e), [value]);

  return (
    <>
      <div className={'loader ' + (loading ? 'loading' : 'loaded')}><div className="loader_logo"></div></div>
      <main className="hero">
        <Container>
          <Row>
            <Col lg={{ span: 5, offset: 1 }} className="start-form">
              <Hero coins={coins} value={value} />
            </Col>
            <Col lg={{ span: 4, offset: 1 }}>
              <TopCoins coins={coins} setCoinValue={setfromList} />
            </Col>
          </Row>
        </Container>
      </main>
      <Container>
        <Row>
          <Col>
            <ATH data={coins} />
          </Col>
          <Ads />
        </Row>
        <Row>
          <Col>
            <Heatmap data={coins.slice(0, 30)} />
          </Col>
          <Col>
            <Trends data={trends} rates={rates} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Headlines />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main;
