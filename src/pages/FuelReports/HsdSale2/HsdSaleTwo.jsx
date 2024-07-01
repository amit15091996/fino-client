import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import HsdSaleTankTwo from './HsdSaleTankTwo'
import HsdSaleTwoTableHead from './HsdSaleTwoTableHead'
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import { dateFormater } from '../../../utils/DateTimeFormatter'
import { FuelReportExcelHead } from '../../../labels/FuelReportExcelHead'



const HsdSaleTwo = ({ hsdTankTwoFieldsVar, allhsdTankTwoReport, onHsdTankTwoSubmit, previousDayHsdTankTwoSales,
  sameDayTankTwoSales, isAdmin, onHsdTankTwoEditClick, onHsdTankTwoDeleteClick }) => {

  const theme = useTheme()


  const hsdTankTwoTableRow = Array.isArray(allhsdTankTwoReport?.data?.response) ? allhsdTankTwoReport?.data?.response?.map((hsdTwo) => {
    const closingAndSale = {
      mpdtwo: <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdTwo?.openingMeterOfHsdTankTwoNozzleOne}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdTwo?.salesForHsdTankTwoNozzleOne}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdTwo?.openingMeterOfHsdTankTwoNozzleTwo}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles }}>
          <Typography variant='v6'>{hsdTwo?.salesForHsdTankTwoNozzleTwo}</Typography>
        </Box>
      </Box>
    }
    return { ...hsdTwo, hsdTankTwoDate: dateFormater(hsdTwo?.hsdTankTwoDate), ...closingAndSale }
  }) : []




  return (


    <Box>
      <Box sx={{ mt: 1.5 }}>
        <HsdSaleTankTwo
          hsdTankTwoFieldsVar={hsdTankTwoFieldsVar}
          sameDayTankTwoSales={sameDayTankTwoSales}
          previousDayHsdTankTwoSales={previousDayHsdTankTwoSales}
          onSubmit={onHsdTankTwoSubmit} title={"HSD SALE TK-02"} />
      </Box>

      <Card sx={{ p: 2, mt: 1.5 }}>
        <FuelTable
          isActionRequired={isAdmin}
          TableName={"HSD SALE TK-02"} headCells={HsdSaleTwoTableHead()}
          FilterdRow={FinoLabel.msSaleFilteredRow}
          rows={hsdTankTwoTableRow}
          onEditClick={onHsdTankTwoEditClick}
          onDeleteClick={onHsdTankTwoDeleteClick}
          excelHead={FuelReportExcelHead?.hsdTankTwoExcelHead}
          excelRows={Array.isArray(allhsdTankTwoReport?.data?.response) ? allhsdTankTwoReport?.data?.response?.map((hsdTwo) => ({ ...hsdTwo, hsdTankTwoDate: dateFormater(hsdTwo?.hsdTankTwoDate) })) : []}
        />

      </Card>
    </Box>

  )
}

export default HsdSaleTwo