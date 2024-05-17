import { Box, Card } from '@mui/material'
import React from 'react'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import ReportsSerching from './ReportsSerching'

const CmsReports = ({bankDepositData}) => {
  return (
    <Box >
  <Box sx={{mt:2}}>
<ReportsSerching/>
        
       </Box>

     <Card sx={{p:1,mt: 2, mr: 1, mb: 5 }}>
     

    
    <CustomTable
      TableName={"CMS REPORTS"}
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

export default CmsReports