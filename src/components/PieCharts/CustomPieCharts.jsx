import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';


const sizing = { margin: { right: 5 },width: 100,height: 150,legend: { hidden: true },};

const CustomPieCharts = ({chartData,getArcLabel}) => {
  
  return (
    <PieChart
      series={[{outerRadius: 75,data:chartData?chartData:[],arcLabel: getArcLabel && getArcLabel, },]}
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

export default CustomPieCharts;
