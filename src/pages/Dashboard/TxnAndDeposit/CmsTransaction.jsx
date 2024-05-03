import { Box } from '@mui/material'
import React from 'react'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { FinoLabel } from '../../../labels/FinoLabel'
import { depositData } from './BankDeposit'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { GlobalStyles } from '../../../styles/GlobalStyles'


const CmsTransaction = () => {
  return (
    <Box sx={{mt:1}}>

     <Box sx={{mr:1,...GlobalStyles.alignmentStyles_2}}>
        <CustomButton variant={"contained"} color={"secondary"} title={"ADD"}/>
       </Box>

        <Box sx={{mt:1,mr:1}}>
        <CustomTable TableName={"CMS TRANSACTION"} headCells={FinoLabel.bankDepositTableHead} rows={depositData} />
        </Box>
    </Box>
  )
}

export default CmsTransaction