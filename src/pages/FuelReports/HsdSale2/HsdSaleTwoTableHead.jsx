import { useTheme } from '@emotion/react';
import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';

const HsdSaleTwoTableHead = () => {
  
  const theme = useTheme();

  
  return( 
  [
    {id:"hsdTankTwoDate",label:"Date"?.toUpperCase()},
    {id:"openingStockOfHsdTankTwo",label:"Opening Stock"?.toUpperCase()},
    {id:"inwardOfHsdTankTwo",label:"Inwards"?.toUpperCase()},
    {id:"totalStockHsdTankTwo",label:"Total Stock"?.toUpperCase()},
    {id:"totalSalesHsdTankTwo",label:"Total Sales"?.toUpperCase()},
    {id:"closingStockHsdTankTwo",label:"Closing Stock"?.toUpperCase()},
    {id:"dipStockOfHsdTankTwo",label:"Dip Stock"?.toUpperCase()},
    {id:"variationOfHsdTankTwo",label:"Variation"?.toUpperCase()},
    {id:"dipOfHsdTankTwoInCentimeter",label:"Dip Stock(CM's)"?.toUpperCase()},
    {id:"dipOfHsdTankTwoInLtrs",label:"Dip Stock(LTR's)"?.toUpperCase()},
    {id:"mpdtwo",label:<Box sx={{minWidth:350}}>
  
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
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
    <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
    </Box>
  </Box>
    </Box>},
     {id:"totalSalesForTheDayHsdTankTwo",label:"Total Meter Sales(LTR's)"?.toUpperCase()},
     {id:"testing",label:"Testing"?.toUpperCase()},
     {id:"density",label:"Density"?.toUpperCase()},
     {id:"waterDip",label:"Water Dip"?.toUpperCase()},
     {id:"remarks",label:"Remarks"?.toUpperCase()},
])
}

export default HsdSaleTwoTableHead