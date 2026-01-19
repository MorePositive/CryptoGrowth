import React, { Suspense, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ReactGA from 'react-ga';
import { isClient, priceFormat, dateFormat, dateShortFormat } from '../../helpers';
import { getInfo } from '../../api/coingecko';
import { getOHLC } from '../../api/cryptowatch';
import './timeline.scss';

const Timeline = (props) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [coinInfo, setCoinInfo] = useState(null);
  const [amountValue, setAmountValue] = useState(searchParams.get('amount'));
  const [fromValue, setFromValue] = useState(searchParams.get('from'));
  const [ohlc, setOHLC] = useState(null);
  const [graph, setGraph] = useState(null);
  const [stat, setStat] = useState(null);
  const coinValue = searchParams.get('coin');

  const updateCharts = (fields, coin) => {
    coin = coin || coinInfo;
    if(!coin) return;
    setLoading(true);

    if(fields?.from) setFromValue(fields.from);
    if(fields?.amount) setAmountValue(fields.amount);

    let from = Math.round(new Date(fromValue).getTime() / 1000);
    let before = Math.round(Date.now() / 1000);
    Promise.allSettled([
      getOHLC(coin.symbol, from, before, 'kraken')
    ]).then(results => {
      let coinData = results[0].value;

      if (coinData.error && !coinData.result) {
        setError({
          message: `Cannot load historical information for coin ${coin.name} (symbol ${coin.symbol}). Please check your spelling or try selecting different date`
        });
      } else {
        let ohlc = coinData.result['604800_Monday'];
        let coinGraph = [];
        let own = amountValue / ohlc[0][1];
        let highest = [ohlc[0][1]], lowest = [ohlc[0][1]];

        let date, cost;
        for(let i=0; i<ohlc.length; i++) {
          date = new Date(ohlc[i][0] * 1000);
          cost = own * ohlc[i][4];
          if (cost > highest[0]) highest = [ cost, date ];
          if (cost < lowest[0]) lowest = [ cost, date ];
          ohlc[i] = { x: date, y: ohlc[i].slice(1, 5) };
          coinGraph.push({ x: date, y: cost });
        }

        setOHLC(ohlc);
        setGraph([{ data: coinGraph }]);
        setStat({ highest, lowest });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    getInfo(coinValue, (data) => {
      if (data.error) {
        setError({
          message: `Cannot load information for coin ${coinValue}, please check your spelling`
        });
      } else {
        setCoinInfo(data);
        updateCharts(null, data);
      }
    });
  }, [ coinValue ]);

  const lineOptions = {
    type: 'line',
    height: 350,
    series: graph,
    colors: [ '#645FF2', '#38BDD1' ],
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
          formatter: () => 'Cost'
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
    height: 200,
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
        <Col className="investment">
          <h2>Investment:</h2>
            {coinInfo &&
              <span>
                <img src={coinInfo.image?.thumb} alt={coinInfo.name} width="18px" />
                <b>{coinInfo.name}</b> (symbol: {coinInfo.symbol.toUpperCase()}) on
              </span>
            }
          <input 
            type="date"
            value={fromValue}
            className="from"
            onChange={(e) => updateCharts({ from:e.target.value })} 
          />
          <span>in amount of $</span>
          <input 
            type="text"
            value={amountValue}
            className="amount"
            size="7"
            onChange={(e) => updateCharts({ amount:e.target.value })} 
          />
        </Col>
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
            <Card.Body className="block-returns">
              {coinInfo && stat && 
                <>
                  <h4>Your possible returns:</h4>
                  <p>The highest return would've occured on <b>{dateFormat.format(stat.highest[1])}</b> at the price of <b>{priceFormat.format(stat.highest[0])}</b></p>
                  <p>The lowest return would've occured on <b>{dateFormat.format(stat.lowest[1])}</b> at the price of <b>{priceFormat.format(stat.lowest[0])}</b></p>
                  <hr/>
                  <h4>{coinInfo.name} historic price:</h4>
                  <p>All time high was <b>{priceFormat.format(coinInfo.market_data.ath.usd)}</b> on {dateFormat.format(new Date(coinInfo.market_data.ath_date.usd))}</p>
                  <p>All time low was <b>{priceFormat.format(coinInfo.market_data.atl.usd)}</b> on {dateFormat.format(new Date(coinInfo.market_data.atl_date.usd))}</p>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="block">
            <Card.Body className="block-info">
              <base target="_blank" rel="noreferrer" />
              {coinInfo && 
                <>
                  <p dangerouslySetInnerHTML={{ __html:coinInfo.description.en}}></p>
                  <p>It was created on {dateFormat.format(new Date(coinInfo.genesis_date))} and it's homepage is <ReactGA.OutboundLink to={coinInfo.links.homepage[0]} target="_blank" eventLabel="coin-homepage">{coinInfo.links.homepage[0]}</ReactGA.OutboundLink></p>
                  <p>It has community score of {coinInfo.community_score.toFixed(2)} and has this presence ion social media:</p>
                  <ul>
                    <li>Telegram users: {coinInfo.community_data.telegram_channel_user_count || 'unknown'}</li>
                    <li>Reddit subscribers: {coinInfo.community_data.reddit_subscribers || 'unknown'}</li>
                    <li>Twitter followers: {coinInfo.community_data.twitter_followers || 'unknown'}</li>
                  </ul>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Timeline;
