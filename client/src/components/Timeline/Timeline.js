import React, { Suspense, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { isClient, priceFormat, dateFormat, dateShortFormat } from '../../helpers';
import { getInfo } from '../../api/coingecko';
import './timeline.scss';

const Timeline = (props) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [coinValue, setCoinValue] = useState(searchParams.get('coin'));
  const [coinInfo, setCoinInfo] = useState(null);
  const [amountValue, setAmountValue] = useState(searchParams.get('amount'));
  const [fromValue, setFromValue] = useState(searchParams.get('from'));
  const [ohlc, setOHLC] = useState(null);
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    getInfo(coinValue, (data) => {
      if (data.error) {
        setError({
          message: `Cannot load information for coin ${coinValue}, please check your spelling`
        });
      } else {
        setCoinInfo(data);

        let from = Math.round(new Date(fromValue).getTime() / 1000);
        let before = Math.round(Date.now() / 1000);
        fetch(`/api/ohlc/${data.symbol}/${from}/${before}/weekly`)
          .then(res => res.json())
          .then(data => {
            if (data.error && !data.result) {
              setError({
                message: `Cannot load historical information for coin ${coinValue} (symbol ${data.symbol}). Please check your spelling or try selecting different date`
              });
            } else {
              let ohlc = data.result['604800_Monday'];
              let graph = [];
              let own = amountValue / ohlc[0][1];
              for(let i=0; i<ohlc.length; i++) {
                ohlc[i] = { x: new Date(ohlc[i][0] * 1000), y: ohlc[i].slice(1, 5) };
                graph.push({ x: ohlc[i].x, y: own * ohlc[i].y[3] });
              }
              setOHLC(ohlc);
              setGraph(graph);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          });
      }
    });
  }, []);

  const lineOptions = {
    type: 'line',
    height: 350,
    series: [{ data:graph }],
    colors: [ '#645FF2' ],
    chart: {
      animations: { enabled: false },
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0
    },
    tooltip: {
      x: {
        show: false,
        formatter: (val) => dateFormat.format(val)
      },
      y: {
        formatter: (val) => priceFormat.format(val),
        title: {
          formatter: () => 'Price'
        }
      },
      marker: {
        show: false
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (val, opts) => dateShortFormat.format(val)
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: (val) => priceFormat.format(val)
      }
    }
  };

  const ohlcOptions = {
    type: 'candlestick',
    height: 350,
    series: [{ data:ohlc }],
    chart: {
      toolbar: {
        show: true,
        tools: {
          download:false
        }
      }
    },
    tooltip: {
      x: {
        show: false,
        formatter: (val) => dateFormat.format(val)
      },
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const o = priceFormat.format(w.globals.seriesCandleO[seriesIndex][dataPointIndex])
        const h = priceFormat.format(w.globals.seriesCandleH[seriesIndex][dataPointIndex])
        const l = priceFormat.format(w.globals.seriesCandleL[seriesIndex][dataPointIndex])
        const c = priceFormat.format(w.globals.seriesCandleC[seriesIndex][dataPointIndex])
        return (
          '<div class="apexcharts-tooltip-box apexcharts-tooltip-candlestick">' +
            '<div>Open: <span class="value">' + o + '</span></div>' +
            '<div>High: <span class="value">' + h + '</span></div>' +
            '<div>Low: <span class="value">' + l + '</span></div>' +
            '<div>Close: <span class="value">' + c + '</span></div>' +
          '</div>'
        )
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    }
  };

  const Chart = React.lazy(() => isClient() ? import('../Chart/Chart') : 'Chart with coin data');

  return (
    <Container>
      <Row>
        <Col><h2>Investment: ${amountValue} worth of {coinValue} on {fromValue}</h2></Col>
      </Row>
      {error && <div>{error.message}</div>}
      <Row>
        <Col>
          <Card className="block">
            <Card.Body className="block-line">
              <Suspense>
                {loading
                ? <div className="loading"><div className="spinner"></div>Loading information...</div>
                : <Chart options={lineOptions} series={lineOptions.series} />
                }
              </Suspense>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="block">
            <Card.Title>Financial chart for {coinInfo?.name}</Card.Title>
            <Card.Body className="block-ohlc">
              <Suspense>
                {loading
                ? <div className="loading"><div className="spinner"></div>Loading information...</div>
                :  <Chart options={ohlcOptions} series={ohlcOptions.series} />
                }
              </Suspense>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="block">
            <Card.Body className="block-info">
          The lowest return occured on 05-25-2020 at -50%
          The highest return occured on 05-26-2020 at 500%
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>If you have build your portfolio out of top 5 coins, your return for same period of time would be 200%</Col>
        <Col>Some other useless metrics</Col>
      </Row>
    </Container>
  );
};

export default Timeline;
