import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import FuelReportsForm from './FuelReportsForm'
import CustomTable from '../../../components/CustomTable/CustomTable'
import MsSaleTableheader from './MsSaleTableheader'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import FuelTable from '../../../components/FuelTable/FuelTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import MsTableRow from './MsTableRow'






const MsSale = ({ msSaleFieldsVar, onMsSaleSubmit, previousDayMssales, sameDayMssales }) => {
  const theme = useTheme()


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
        <FuelTable TableName={"MS SALE"} headCells={MsSaleTableheader()} FilterdRow={FinoLabel.msSaleFilteredRow} rows={MsTableRow()} />

      </Card>

    </Box>
  )
}

export default MsSale