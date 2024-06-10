import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Q1(in Litre)', value: 400, color: '#0088FE' },
  { label: 'Q2(in Litre)', value: 300, color: '#00C49F' },
  { label: 'Q3(in Litre)', value: 300, color: '#FFBB28' },
  { label: 'Q4(in Litre)', value: 200, color: '#FF8042' },
];

const sizing = {
  margin: { right: 5 },
  width: 100,
  height: 150,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

const PieCharts=()=>{
  return (
    <PieChart
      series={[
        {
          outerRadius: 75,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}

export default PieCharts
