import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import FuelReportsForm from './FuelReportsForm'
import CustomTable from '../../../components/CustomTable/CustomTable'
import MsSaleTableheader from './MsSaleTableheader'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import { dateFormater } from '../../../utils/DateTimeFormatter'






const MsSale = ({ msSaleFieldsVar, onMsSaleSubmit, previousDayMssales, sameDayMssales, getAllmsSaleReport,isAdmin }) => {
  const theme = useTheme()


  const MsTableRow = Array.isArray(getAllmsSaleReport?.data?.response) ? getAllmsSaleReport?.data?.response?.map((msSale) => {
    const closingAndSale = {
      mpdtwo: <Box sx={{ width: "100%", display: "flex",height:"100%" }}>
        <Box sx={{ height:"100%",width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{msSale?.openingMeterOfMSSaleNozzleOne}</Typography>
        </Box>
        <Box sx={{ height:"100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{msSale?.salesForMSSaleNozzleOne}</Typography>
        </Box>
        <Box sx={{ height:"100%", width: "25%", ...GlobalStyles.alignmentStyles, borderRight: GlobalStyles?.borderStyle }}>
          <Typography variant='v6' >{msSale?.openingMeterOfMSSaleNozzleTwo}</Typography>
        </Box>
        <Box sx={{  height:"100%",width: "25%", ...GlobalStyles.alignmentStyles }}>
          <Typography variant='v6'>{msSale?.salesForMSSaleNozzleTwo}</Typography>
        </Box>
      </Box>
    }
    return { ...msSale, msSaleDate: dateFormater(msSale?.msSaleDate), ...closingAndSale }
  }) : []



  return (
    <Box>
      <Box sx={{ mt: 1.5 }}>
        <FuelReportsForm
          key={"ms_sale_adding_form"}
          onSubmit={onMsSaleSubmit}
          msSaleFieldsVar={msSaleFieldsVar}
          title={"MS SALE"}
          previousDayMssales={previousDayMssales}
          sameDayMssales={sameDayMssales}
        />
      </Box>

      <Card sx={{ p: 2, mt: 1.5 }}>
        <FuelTable
          TableName={"MS SALE"}
          headCells={MsSaleTableheader()}
          FilterdRow={FinoLabel.msSaleFilteredRow}
          rows={MsTableRow}
          isActionRequired={isAdmin}
        />

      </Card>

    </Box>
  )
}

export default MsSale