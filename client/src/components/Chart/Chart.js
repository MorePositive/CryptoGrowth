import React from 'react';
import ApexChart from 'react-apexcharts';

const Chart = (options, series) => {
  return (
    <ApexChart options={options} series={series} type={options.type} height={options.height} />
  );
};

export default Chart;
