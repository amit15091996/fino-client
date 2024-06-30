import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import HsdSaleTankOne from './HsdSaleTankOne'
import CustomTable from '../../../components/CustomTable/CustomTable'
import HsdSaleOneTableHeader from './HsdSaleOneTableHeader'
import { useTheme } from '@emotion/react'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { dateFormater } from '../../../utils/DateTimeFormatter'




const HsdSaleOne = ({ hsdTankOneFieldsVar, allhsdTankOneReport, onHsdTankOneSubmit, previousDayHsdTankOneSales,
  sameDayTankOneSales, isAdmin, onHsdTankOneDeleteClick, onHsdTankOneEditClick }) => {

  const theme = useTheme()


  const hsdTankOneTableRow = Array.isArray(allhsdTankOneReport?.data?.response) ? allhsdTankOneReport?.data?.response?.map((hsdOne) => {
    const closingAndSaleofMpdOne = {
      mpdOne: <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.openingMeterOfHsdTankOneNozzleOne}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.salesForHsdTankOneNozzleOne}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.openingMeterOfHsdTankOneNozzleTwo}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles }}>
          <Typography variant='v6'>{hsdOne?.salesForHsdTankOneNozzleTwo}</Typography>
        </Box>
      </Box>
    }
    const closingAndSaleofMpdTwo = {
      mpdTwo: <Box sx={{ width: "100%", display: "flex", height: "100%" }}>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.openingMeterOfHsdTankOneNozzleThree}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.salesForHsdTankOneNozzleThree}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{hsdOne?.openingMeterOfHsdTankOneNozzleFour}</Typography>
        </Box>
        <Box sx={{ height: "100%", width: "25%", ...GlobalStyles.alignmentStyles }}>
          <Typography variant='v6'>{hsdOne?.salesForHsdTankOneNozzleFour}</Typography>
        </Box>
      </Box>
    }
    return { ...hsdOne, hsdTankOneDate: dateFormater(hsdOne?.hsdTankOneDate), ...closingAndSaleofMpdOne, ...closingAndSaleofMpdTwo }
  }) : []





  return (

    <Box>
      <Box sx={{ mt: 1.5 }}>

        <HsdSaleTankOne
          title={"HSD SALE TK-01"}
          hsdTankOneFieldsVar={hsdTankOneFieldsVar}
          onSubmit={onHsdTankOneSubmit}
          previousDayHsdTankOneSales={previousDayHsdTankOneSales}
          sameDayTankOneSales={sameDayTankOneSales}
        />
      </Box>

      <Card sx={{ p: 2, mt: 1.5 }}>
        <FuelTable
          TableName={"HSD SALE TK-01"}
          headCells={HsdSaleOneTableHeader()}
          FilterdRow={FinoLabel.msSaleFilteredRow}
          rows={hsdTankOneTableRow}
          isActionRequired={isAdmin}
          onDeleteClick={onHsdTankOneDeleteClick}
          onEditClick={onHsdTankOneEditClick}
        />
      </Card>

    </Box>



  )
}

export default HsdSaleOne