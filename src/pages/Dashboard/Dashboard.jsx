import { Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { MdAccountBalanceWallet } from "react-icons/md";
import { useTheme } from '@emotion/react';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import BankDeposit from './TxnAndDeposit/BankDeposit';
import CmsTransaction from './TxnAndDeposit/CmsTransaction';


const Dashboard = ({}) => {
const[tabValue,setTabValue]=useState(0)
const handleTabChange=(e,value)=>{setTabValue(value)}
  const theme=useTheme()

const tabs=[
  {label:"Bank Deposit ",minWidth:140,component:<BankDeposit/>},
  {label:"Cms Transaction",minWidth:140,component:<CmsTransaction/>},

]


  return (
    <Box sx={GlobalStyles.outLetFirstElementStyle}>

      <Box sx={{...GlobalStyles.alignmentStyles_2}}>
        <Card sx={{height:80,width:140,mr:1}}>
          <Box sx={{...GlobalStyles.alignmentStyles}}>
          <MdAccountBalanceWallet fontSize={28} color={theme?.palette?.primary?.main}  />
          </Box>
          <Box sx={{...GlobalStyles.alignmentStyles}}>
          <Typography variant='v2' color="primary">Opening Balance</Typography>
          </Box>
          <Box sx={{mt:1,...GlobalStyles.alignmentStyles}}>
          <Typography variant='v2' color="primary">10000.00</Typography>
          </Box>

        </Card>

      </Box>

      <Box sx={{mt:2}}>
        <CustomTabs tabDetails={tabs} value={tabValue} onChange={handleTabChange} cardPosition={{display:"flex",justifyContent:"flex-start"}} tabPosition={{justifyContent:"flex-start"}} />

      </Box>


    </Box>
  )
}

export default Dashboard