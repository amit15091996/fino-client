import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import HsdSaleTankOne from './HsdSaleTankOne'
import CustomTable from '../../../components/CustomTable/CustomTable'
import HsdSaleOneTableHeader from './HsdSaleOneTableHeader'
import { useTheme } from '@emotion/react'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import { GlobalStyles } from '../../../styles/GlobalStyles'




const HsdSaleOne = () => {

  const theme=useTheme()



  const HSDSALETK01=[
    {date:"12/01/2024",openingStock:19000,inwards:10,totalStock:19010,
    totalSales:100,closingStock:18910,dipStock:10,variation:-2,dipStockInCms:100,dipStockLtrs:200,
    totalMeterSales:200,testing:12,density:1,waterDip:10,remarks:"testing data",
    mpdTwo: <Box sx={{width:"100%",display:"flex"}}>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' >1000</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' >20</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
    <Typography variant='v6' >2000</Typography>
    </Box>
    <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
    <Typography variant='v6'>30</Typography>
    </Box>
  </Box>,
   mpdOne: <Box sx={{width:"100%",display:"flex"}}>
   <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
   <Typography variant='v6' >1000</Typography>
   </Box>
   <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
   <Typography variant='v6' >20</Typography>
   </Box>
   <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
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
  mpdTwo: <Box sx={{height:"100%",width:"100%",display:"flex"}}>
  <Box sx={{height:"100%",width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >1000</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >20</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >2000</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
  <Typography variant='v6'>30</Typography>
  </Box>
  </Box>,
  mpdOne: <Box sx={{width:"100%",display:"flex"}}>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >1000</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >20</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
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
  mpdOne: <Box sx={{width:"100%",display:"flex"}}>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >1000</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >20</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
  <Typography variant='v6' >2000</Typography>
  </Box>
  <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
  <Typography variant='v6'>30</Typography>
  </Box>
</Box>,
 mpdTwo: <Box sx={{width:"100%",display:"flex"}}>
 <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
 <Typography variant='v6' >1000</Typography>
 </Box>
 <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
 <Typography variant='v6' >20</Typography>
 </Box>
 <Box sx={{width:"25%",...GlobalStyles.alignmentStyles,borderRight:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
 <Typography variant='v6' >2000</Typography>
 </Box>
 <Box sx={{width:"25%",...GlobalStyles.alignmentStyles}}>
 <Typography variant='v6'>30</Typography>
 </Box>
 </Box>,
  },
  ]



  return (

    <Box>
 <Box sx={{mt:1.5}}>

<HsdSaleTankOne title={"HSD SALE TK-01"} />
  </Box>

<Card sx={{p:2,mt:1.5}}>
  <FuelTable TableName={"HSD SALE TK-01"} headCells={HsdSaleOneTableHeader()} FilterdRow={FinoLabel.msSaleFilteredRow} rows={HSDSALETK01}/>

 </Card>

    </Box>


   
  )
}

export default HsdSaleOne