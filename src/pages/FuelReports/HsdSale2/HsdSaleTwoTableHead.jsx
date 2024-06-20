import { useTheme } from '@emotion/react';
import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';

const HsdSaleTwoTableHead = () => {
  
  const theme = useTheme();

  
  return( 
  [
    {id:"date",label:"Date"},
    {id:"openingStock",label:"Opening Stock"},
    {id:"inwards",label:"Inwards"},
    {id:"totalStock",label:"Total Stock"},
    {id:"totalSales",label:"Total Sales"},
    {id:"closingStock",label:"Closing Stock"},
    {id:"dipStock",label:"Dip Stock"},
    {id:"variation",label:"Variation"},
    {id:"dipStockInCms",label:"Dip Stock(CM's)"},
    {id:"dipStockLtrs",label:"Dip Stock(LTR's)"},
    {id:"mpdtwo",label:<Box>
  
  <Box sx={{width:"100%",borderBottom:`1.5px solid ${GlobalStyles.sideTopNavborderColor}`,...GlobalStyles.alignmentStyles}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>MPD-01</Typography>
  </Box>

  <Box sx={{width:"100%",display:"flex",borderBottom:`1.5px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Box sx={{width:"50%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>A1</Typography>
    </Box>
    <Box sx={{width:"50%",...GlobalStyles.alignmentStyles}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>B1</Typography>
    </Box>
  </Box>

  <Box sx={{width:"100%",display:"flex"}}>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales}</Typography>
    </Box>
  </Box>
    </Box>},
     {id:"totalMeterSales",label:"Total Meter Sales(LTR's)"},
     {id:"testing",label:"Testing"},
     {id:"density",label:"Density"},
     {id:"waterDip",label:"Water Dip"},
     {id:"remarks",label:"remarks"},
])
}

export default HsdSaleTwoTableHead