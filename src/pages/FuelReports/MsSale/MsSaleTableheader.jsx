import { useTheme } from '@emotion/react';
import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';



const MsSaleTableheader = () => {
    const theme = useTheme();


  return [
        {id:"msSaleDate",label:"Date"?.toUpperCase()},
        {id:"openingStockOfMSSale",label:"Opening Stock"?.toUpperCase()},
        {id:"inwardOfMSSale",label:"Inwards"?.toUpperCase()},
        {id:"totalStockMSSale",label:"Total Stock"?.toUpperCase()},
        {id:"totalSalesMSSale",label:"Total Sales"?.toUpperCase()},
        {id:"closingStockMSSale",label:"Closing Stock"?.toUpperCase()},
        {id:"dipStockOfMSSale",label:"Dip Stock"?.toUpperCase()},
        {id:"variationOfMSSale",label:"Variation"?.toUpperCase()},
        {id:"dipStockOfMSSaleInCentimeter",label:"Dip Stock(CM's)"?.toUpperCase()},
        {id:"dipStockOfMSSaleInLtrs",label:"Dip Stock(LTR's)"?.toUpperCase()},
        {id:"mpdtwo",label:<Box sx={{minWidth:350}}>
      
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
         {id:"totalMeterSalesForTheDayForMSSaleInLtrs",label:"Total Meter Sales(LTR's)"?.toUpperCase()},
         {id:"testing",label:"Testing"?.toUpperCase()},
         {id:"density",label:"Density"?.toUpperCase()},
         {id:"waterDip",label:"Water Dip"?.toUpperCase()},
         {id:"remarks",label:"Remarks"?.toUpperCase()},
  ]
}

export default MsSaleTableheader

