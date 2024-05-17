import { useTheme } from '@emotion/react'
import React, { useState } from 'react'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { BsBank } from "react-icons/bs";
import { TbTransactionRupee } from "react-icons/tb";
import { Box } from '@mui/material';
import BankReports from './ReportsComponents/BankReports';
import CmsReports from './ReportsComponents/CmsReports';


export const depositData = [
  {
    id: 1,
    date: "01/05/2023",
    receiveFrom: "Client 1",
    amount: "25000.00",
    collectedBy: "Adam Reid",
  },
  {
    id: 2,
    date: "01/05/2023",
    receiveFrom: "Client 2",
    amount: "15000.00",
    collectedBy: "Spencer Reid",
  },
  {
    id: 3,
    date: "01/05/2023",
    receiveFrom: "Client 3",
    amount: "18500.00",
    collectedBy: "Luke Wood",
  },
  {
    id: 4,
    date: "01/05/2023",
    receiveFrom: "Client 4",
    amount: "19500.00",
    collectedBy: "Spencer Will",
  },
];


const Reports = () => {

  const[reportsTab,setReportsTab]=useState(0)
  const handleReportTabChanges=(e,value)=>{setReportsTab(value)}
    const theme=useTheme()
  
  const reportTabs=[
    {label:"Bank  Reports ",minWidth:140,component:<BankReports bankDepositData={depositData}/>,icon:<BsBank fontSize={18}/>},
    {label:"Cms Reports",minWidth:150,component:<CmsReports bankDepositData={depositData}/>,icon:<TbTransactionRupee fontSize={18}/>},
  
  ]


  return (
    <Box>
    
    <Box sx={{mt:2}}>
        <CustomTabs tabDetails={reportTabs} value={reportsTab} onChange={handleReportTabChanges} cardPosition={{display:"flex",justifyContent:"flex-start"}} tabPosition={{justifyContent:"flex-start"}} />

      </Box>

    </Box>
  )
}

export default Reports