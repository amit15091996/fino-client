import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { MdAccountBalanceWallet } from "react-icons/md";
import { useTheme } from '@emotion/react';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import { BsBank } from "react-icons/bs";
import { TbTransactionRupee } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import AuthHook from '../../hooks/AuthHook';
import DepositAndCmsForm from './TxnAndDeposit/DepositAndCmsForm';
import { bankDepositService } from '../../redux/slice/bankslice/BankDepositSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedInterceptors from '../../hooks/ProtectedInterceptors';
import { dateToJavaUtilDate } from '../../utils/DateTimeFormatter';
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar';
import Loading from '../../components/Loading/Loading';
import { cmsTransactionService } from '../../redux/slice/cmsslice/CmsTransactionSlice';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import BarCharts from '../../components/BarCharts/BarCharts';
import UnderLine from '../../components/UnderLine/UnderLine';
import PieCharts from '../../components/PieCharts/PieCharts';

const Dashboard = ({}) => {
const navigate = useNavigate();
const theme=useTheme()
const dispatch=useDispatch()
const protectedInterceptors=ProtectedInterceptors()
const{jwtToken,userName,error,userRoles,fullName}=AuthHook()

const[tabValue,setTabValue]=useState(0)
const[bankAndCmsDepositfields,setBankAndCmsDepositfields]=useState({
  recievedFrom:"",collectedBy:fullName,collectionAmount:"",TransactionDate:null,onlineAmount:"",cashAmount:"",balanceAmount:"",
  remarks:""
})
const[bankDepositSnackBarOpen,setBankDepositSnackBarOpen]=useState(false)
const[cmsTransactionSnackBarOpen,setCmsTransactionSnackBarOpen]=useState(false)

const BANK_DEPOSIT_SLICE_REDUCER=useSelector((state)=>state.BANK_DEPOSIT_SLICE_REDUCER)
const CMS_TRANSACTION_SLICE_REDUCER=useSelector((state)=>state.CMS_TRANSACTION_SLICE_REDUCER)

const onBankDepositSave= async (e)=>{
  e.preventDefault()
   let bankPayload=(bankDeposit)=>{return{...bankDeposit,TransactionDate:dateToJavaUtilDate(bankDeposit?.TransactionDate),collectedBy:userName}};
  const {payload}=await dispatch(bankDepositService({protectedInterceptors:protectedInterceptors,payload:bankPayload(bankAndCmsDepositfields)}))
  if(payload?.statusCode===200){
    setBankDepositSnackBarOpen(true)
    setBankAndCmsDepositfields({
      recievedFrom:"",collectedBy:fullName,collectionAmount:"",TransactionDate:null,onlineAmount:"",cashAmount:"",balanceAmount:"",
      remarks:""
    })
  }
  else{
    setBankDepositSnackBarOpen(true)
  }
  

}

const onCmsTransactionSave= async (e)=>{
  e.preventDefault()
   let cmsPayload=(cmsT)=>{return{...cmsT,TransactionDate:dateToJavaUtilDate(cmsT?.TransactionDate),collectedBy:userName}};
  const {payload}=await dispatch(cmsTransactionService({protectedInterceptors:protectedInterceptors,payload:cmsPayload(bankAndCmsDepositfields)}))
  if(payload?.statusCode===200){
    setCmsTransactionSnackBarOpen(true)
    setBankAndCmsDepositfields({
      recievedFrom:"",collectedBy:fullName,collectionAmount:"",TransactionDate:null,onlineAmount:"",cashAmount:"",balanceAmount:"",
      remarks:""
    })
  }
  else{
    setCmsTransactionSnackBarOpen(true)
  }
  

}


useEffect(()=>{
  setBankAndCmsDepositfields((prev)=>{return{...prev,balanceAmount:(prev.collectionAmount)-((+prev.cashAmount)+ (+prev.onlineAmount))}})
},[bankAndCmsDepositfields?.onlineAmount,bankAndCmsDepositfields?.cashAmount,bankAndCmsDepositfields.collectionAmount])


const handleTabChange=(e,value)=>{
  setTabValue(value)
  setBankAndCmsDepositfields({
    recievedFrom:"",collectedBy:fullName,collectionAmount:"",TransactionDate:null,onlineAmount:"",cashAmount:"",balanceAmount:"",
    remarks:""
  })

}





const tabs=[
  {
  label:"Bank Deposit ",
  minWidth:140,
  component:<>{BANK_DEPOSIT_SLICE_REDUCER?.isLoading?<Loading/>:<Box sx={{ mt: 1 }}><DepositAndCmsForm onSubmit={onBankDepositSave} title={"BANK DEPOSIT"} fields={{bankAndCmsDepositfields,setBankAndCmsDepositfields}} /></Box>}</> ,
  icon:<BsBank fontSize={18}/>
},
  {
    label:"Cms Transaction",
    minWidth:150,
    component:<>{CMS_TRANSACTION_SLICE_REDUCER?.isLoading?<Loading/>: <Box sx={{ mt: 1 }}><DepositAndCmsForm onSubmit={onCmsTransactionSave} title={"CMS TRANSACTION"} fields={{bankAndCmsDepositfields,setBankAndCmsDepositfields}} /></Box>}</>,
    icon:<TbTransactionRupee fontSize={18}/>
  },

]


  return (
    <Box >

      <DynamicHead title={`${fullName?.toLocaleUpperCase()}'S DASHBOARD`}/>

      <Box sx={{...GlobalStyles.alignmentStyles_2}}>
        <Card sx={{height:80,width:140}}>
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
<Grid container>
        <Grid item xs={12} md={6}>
        <Box sx={{mr:1,mb:1,mt:2}}>
        <Card>
        <Box sx={{ml:1,mb:1,mt:2}}>
          <Typography variant="v5">
          Yearly Sale's
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>
          <Box sx={{p:2}}>
          <BarCharts/>
            </Box>
        </Card>

      </Box>
        </Grid>
        <Grid item xs={12} md={6}>
        <Box sx={{ml:1,mb:1,mt:2}}>
        <Card>
        <Box sx={{ml:1,mb:1,mt:2}}>
          <Typography variant="v5">
          Quarterly Sale's
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>
          <Box sx={{p:2,...GlobalStyles.alignmentStyles}}>
          <PieCharts/>
          </Box>
        </Card>

      </Box>
      </Grid>

      </Grid>
</Box>
      
      
      

      

     

      <Box sx={{mt:2}}>
        <CustomTabs tabDetails={tabs} value={tabValue} onChange={handleTabChange} cardPosition={{display:"flex",justifyContent:"flex-start"}} tabPosition={{justifyContent:"flex-start"}} />

      </Box>

      <CustomSnackbar open={bankDepositSnackBarOpen} onClose={()=>{setBankDepositSnackBarOpen(false)}} message={BANK_DEPOSIT_SLICE_REDUCER?.data?.statusMessage} severity={BANK_DEPOSIT_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
      <CustomSnackbar open={cmsTransactionSnackBarOpen} onClose={()=>{setCmsTransactionSnackBarOpen(false)}} message={CMS_TRANSACTION_SLICE_REDUCER?.data?.statusMessage} severity={CMS_TRANSACTION_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />

    </Box>
  )
}

export default Dashboard