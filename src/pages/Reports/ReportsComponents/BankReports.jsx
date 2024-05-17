import { Box, Card } from '@mui/material'
import React from 'react'
import { FinoLabel } from '../../../labels/FinoLabel'
import CustomTable from '../../../components/CustomTable/CustomTable'
import ReportsSerching from './ReportsSerching'

const BankReports = ({bankDepositData}) => {
  return (
   <Box >

<Box sx={{mt:2}}>
<ReportsSerching/>
        
       </Box>
  
  <Card sx={{p:1,mt: 2, mr: 1, mb: 5 }}>

        <CustomTable
          TableName={"BANK REPORTS"}
        //   onEditClick={onUpdateClick}
          headCells={FinoLabel.bankDepositTableHead}
        //   onDeleteClick={onDepositDelete}
          rows={bankDepositData}
        //   isActionRequired={true}
        />

  </Card>

   </Box>
  )
}

export default BankReports