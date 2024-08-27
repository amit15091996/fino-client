import { useTheme } from '@emotion/react';
import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';
const HsdSaleOneTableHeader = () => {

  const theme = useTheme();


  return (
    [
      { id: "hsdTankOneDate", label: "DATE"?.toUpperCase() },
      { id: "openingStockOfHsdTankOne", label: "Opening Stock"?.toUpperCase() },
      { id: "inwardOfHsdTankOne", label: "Inwards"?.toUpperCase() },
      { id: "totalStockHsdTankOne", label: "Total Stock"?.toUpperCase() },
      { id: "totalSalesHsdTankOne", label: "Total Sales"?.toUpperCase() },
      { id: "closingStockHsdTankOne", label: "Closing Stock"?.toUpperCase() },
      { id: "dipStockOfHsdTankOne", label: "Dip Stock"?.toUpperCase() },
      { id: "variationOfHsdTankOne", label: "Variation"?.toUpperCase() },
      { id: "dipOfHsdTankOneInCentimeter", label: "Dip Stock(CM's)"?.toUpperCase() },
      { id: "dipOfHsdTankOneInLtrs", label: "Dip Stock(LTR's)"?.toUpperCase() },
      {
        id: "mpdOne", label: <Box sx={{minWidth:400}}>

          <Box sx={{ width: "100%", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}`, ...GlobalStyles.alignmentStyles }}>
            <Typography variant='v6' color={theme?.palette?.p1?.main}>MPD-01</Typography>
          </Box>

          <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
            <Box sx={{ width: "50%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>A2</Typography>
            </Box>
            <Box sx={{ width: "50%", ...GlobalStyles.alignmentStyles }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>B2</Typography>
            </Box>
          </Box>

          <Box sx={{ width: "100%", display: "flex" }}>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles,borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.totalSalesInLtr?.toUpperCase()}</Typography>
            </Box>
          </Box>
        </Box>
      },
      {
        id: "mpdTwo", label: <Box sx={{minWidth:400}}>

          <Box sx={{ width: "100%", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}`, ...GlobalStyles.alignmentStyles }}>
            <Typography variant='v6' color={theme?.palette?.p1?.main}>MPD-02</Typography>
          </Box>

          <Box sx={{ width: "100%", display: "flex", borderBottom: `1.5px solid ${GlobalStyles.sideTopNavborderColor}` }}>
            <Box sx={{ width: "50%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>A2</Typography>
            </Box>
            <Box sx={{ width: "50%", ...GlobalStyles.alignmentStyles }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>B2</Typography>
            </Box>
          </Box>

          <Box sx={{ width: "100%", display: "flex" }}>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles,borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.sales?.toUpperCase()}</Typography>
            </Box>
            <Box sx={{ width: "25%", ...GlobalStyles.alignmentStyles }}>
              <Typography variant='v6' color={theme?.palette?.p1?.main}>{FinoLabel.totalSalesInLtr?.toUpperCase()}</Typography>
            </Box>
          </Box>
        </Box>
      },
      { id: "totalSalesForTheDayHsdTankOne", label: "Total Meter Sales(LTR's)"?.toUpperCase() },
      { id: "testing", label: "Testing"?.toUpperCase() },
      { id: "density", label: "Density"?.toUpperCase() },
      { id: "waterDip", label: "Water Dip"?.toUpperCase() },
      { id: "remarks", label: "Remarks"?.toUpperCase() },
    ]
  )
}

export default HsdSaleOneTableHeader