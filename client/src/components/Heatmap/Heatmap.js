import React from 'react';
import { Card } from 'react-bootstrap';
import ApexChart from 'react-apexcharts';
import { formatBigNumber } from '../../helpers';
import './heatmap.scss';

const Heatmap = ({ data }) => {
  if (!data || !data.length) return ('no data yet');

  const COLORS = [ '#ff0000', '#ff6666', '#00ee00', '#66ee66' ];
  const getColor = (coin) => {
    var change24 = coin.price_change_percentage_24h;
    if (change24 > 3) {
        return COLORS[2];
    } else if (change24 > 0) {
        return COLORS[3];
    } else if (change24 < -3) {
        return COLORS[0];
    } else if (change24 < 0) {
        return COLORS[1];
    }
  };
  
  let reverseMap = {};
  let total = data.reduce((a, coin) => a + coin.market_cap, 0);
  let dataset = data.map((coin, n) => {
    reverseMap[coin.name] = coin;
    return {
        x: coin.name,
        y: coin.market_cap / total * 100,
        fillColor: getColor(coin)
    };
  });

  const options = {
    series: [{
        data: dataset
    }],
    chart: {
        animations: {
            enabled: false
        },
        toolbar: {
            show: false
        },
        parentHeightOffset: 0
    },
    states: {
        hover: {
            filter: {
                type: 'darken'
            }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
            let cap = formatBigNumber(reverseMap[val].market_cap);
            if (opts.value < 0.7) {
                return cap;
            } else {
                return [ val, cap ];
            }
        }
    },
    tooltip: {
        y: {
            formatter: (val, opts) => {
                let name = options.series[0].data[opts.dataPointIndex].x;
                return '24H change: ' + reverseMap[name].price_change_percentage_24h.toFixed(2) + '%';
            },
            title: {
                formatter: (series, opts) => {
                    let name = options.series[0].data[opts.dataPointIndex].x;
                    return name + ': ' + formatBigNumber(reverseMap[name].market_cap);
                }
            }
        }
    },
    grid: {
        padding: {
          top: -20
        }
    }
  };

  return (
    <Card className="block">
        <Card.Title>Market Capitalization (top {data.length})</Card.Title>
        <Card.Body className="block-heatmap">
            { data
            ? <ApexChart options={options} series={options.series} type="treemap" height={290} />
            : 'no data yet' }
        </Card.Body>
    </Card>
  );
};

export default Heatmap;
