import { useTheme } from '@emotion/react';
import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';



const MsSaleTableheader = () => {
    const theme = useTheme();


  return [
        {id:"msSaleDate",label:"Date"},
        {id:"openingStockOfMSSale",label:"Opening Stock"},
        {id:"inwardOfMSSale",label:"Inwards"},
        {id:"totalStockMSSale",label:"Total Stock"},
        {id:"totalSalesMSSale",label:"Total Sales"},
        {id:"closingStockMSSale",label:"Closing Stock"},
        {id:"dipStockOfMSSale",label:"Dip Stock"},
        {id:"variationOfMSSale",label:"Variation"},
        {id:"dipStockOfMSSaleInCentimeter",label:"Dip Stock(CM's)"},
        {id:"dipStockOfMSSaleInLtrs",label:"Dip Stock(LTR's)"},
        {id:"mpdtwo",label:<Box>
      
      <Box sx={{width:"100%",borderBottom:GlobalStyles?.borderStyle,...GlobalStyles.alignmentStyles}}>
        <Typography variant='v6' color={theme?.palette?.p1?.main}>MPD-02</Typography>
      </Box>

      <Box sx={{width:"100%",display:"flex",borderBottom:GlobalStyles?.borderStyle}}>
        <Box sx={{width:"50%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
        <Typography variant='v6' color={theme?.palette?.p1?.main}>A1</Typography>
        </Box>
        <Box sx={{width:"50%",...GlobalStyles.alignmentStyles}}>
        <Typography variant='v6' color={theme?.palette?.p1?.main}>A2</Typography>
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
         {id:"totalMeterSalesForTheDayForMSSaleInLtrs",label:"Total Meter Sales(LTR's)"},
         {id:"testing",label:"Testing"},
         {id:"density",label:"Density"},
         {id:"waterDip",label:"Water Dip"},
         {id:"remarks",label:"remarks"},
  ]
}

export default MsSaleTableheader

