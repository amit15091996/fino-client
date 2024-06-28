import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';


const sizing = { margin: { right: 5 },legend: { hidden:false },};

const CustomPieCharts = ({chartData,getArcLabel,height,width}) => {
  

  return (
    <PieChart
      series={[{outerRadius: 75,data:chartData?chartData:[],arcLabel: getArcLabel && getArcLabel, },]}
      height={height?height:"100%"}
      width={width?width:"100%"}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
       maxHeight:height,
       maxWidth:width
      }}
      {...sizing}
    />
  );
}

export default CustomPieCharts;
