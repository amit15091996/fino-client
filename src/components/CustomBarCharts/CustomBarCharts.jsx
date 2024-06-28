import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ResponsiveChartContainer } from '@mui/x-charts';




const CustomBarCharts = ({ dataset, series, height, width, yAxis, yAxisLabel }) => {
  return (

    <BarChart
     height={height ? height : "100%"}
      width={width ? width : "100%"}
      dataset={dataset ? dataset : []}
      series={series ? series : []}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      yAxis={[{ label: yAxisLabel }]}
      slotProps={{ legend: { padding: -7 } }}
      borderRadius={5}
      sx={{maxHeight:height,maxWidth:width}}
      />

  );
}

export default CustomBarCharts;


