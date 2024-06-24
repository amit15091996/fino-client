import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import HsdSaleTankTwo from './HsdSaleTankTwo'
import HsdSaleTwoTableHead from './HsdSaleTwoTableHead'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'



const HsdSaleTwo = ({hsdTankTwoFieldsVar,allhsdTankTwoReport,onHsdTankTwoSubmit,previousDayHsdTankTwoSales,sameDayTankTwoSales}) => {

  const theme=useTheme()

  
  return (


    <Box>
 <Box sx={{mt:1.5}}>
    <HsdSaleTankTwo  hsdTankTwoFieldsVar={hsdTankTwoFieldsVar} sameDayTankTwoSales={sameDayTankTwoSales} previousDayHsdTankTwoSales={previousDayHsdTankTwoSales} onSubmit={onHsdTankTwoSubmit} title={"HSD SALE TK-02"} />
      </Box>

    <Card sx={{p:2,mt:1.5}}>
  <FuelTable TableName={"HSD SALE TK-02"} headCells={HsdSaleTwoTableHead()} FilterdRow={FinoLabel.msSaleFilteredRow} rows={[]}/>

 </Card>
    </Box>
   
  )
}

export default HsdSaleTwo