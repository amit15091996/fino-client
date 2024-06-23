import { useTheme } from '@emotion/react'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { Box, Typography } from '@mui/material'


const MsTableRow = () => {
    const theme=useTheme()



  return (
   [
        {date:"12/01/2024",openingStock:19000,inwards:10,totalStock:19010,
        totalSales:100,closingStock:18910,dipStock:10,variation:-2,dipStockInCms:100,dipStockLtrs:200,
        totalMeterSales:200,testing:12,density:1,waterDip:10,remarks:"testing data",
        mpdtwo: <Box sx={{width:"100%",display:"flex"}}>
        <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v6' >1000</Typography>
        </Box>
        <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v6' >20</Typography>
        </Box>
        <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v6' >2000</Typography>
        </Box>
        <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
        <Typography variant='v6'>30</Typography>
        </Box>
      </Box>
      },
      {date:"12/01/2024",openingStock:29000,inwards:10,totalStock:19010,
      totalSales:100,closingStock:18910,dipStock:10,variation:-2,dipStockInCms:100,dipStockLtrs:200,
      totalMeterSales:200,testing:12,density:1,waterDip:10,remarks:"testing data",
      mpdtwo: <Box sx={{height:"100%",width:"100%",display:"flex"}}>
      <Box sx={{height:"100%",width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >1000</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >20</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >2000</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
      <Typography variant='v6'>30</Typography>
      </Box>
      </Box>
      },
      {date:"12/01/2024",openingStock:15000,inwards:10,totalStock:19010,
      totalSales:100,closingStock:18910,dipStock:10,variation:-2,dipStockInCms:100,dipStockLtrs:200,
      totalMeterSales:200,testing:12,density:1,waterDip:10,remarks:"testing data",
      mpdtwo: <Box sx={{width:"100%",display:"flex"}}>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >1000</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >20</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
      <Typography variant='v6' >2000</Typography>
      </Box>
      <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
      <Typography variant='v6'>30</Typography>
      </Box>
      </Box>
      },
      ]
  )
}

export default MsTableRow