import { useTheme } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { HiOutlineBanknotes } from "react-icons/hi2";
import { PiBankBold } from "react-icons/pi";
import { Box, Button, Card, Chip, IconButton, Typography } from '@mui/material';
import HasAuthority from "../../hooks/HasAuthority"
import CustomTable from '../../components/CustomTable/CustomTable';
import ReportsSerching from './ReportsComponents/ReportsSerching';
import { FinoLabel } from '../../labels/FinoLabel';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedInterceptors from '../../hooks/ProtectedInterceptors';
import AuthHook from '../../hooks/AuthHook';
import { allBankDepositByUserNameService } from '../../redux/slice/bankslice/AllBankDepositByUserName';
import { allCmsTxnByUserNameService } from '../../redux/slice/cmsslice/AllCmsTxnByUserName';
import TableLoader from '../../components/CustomTable/TableHelpers/TableLoader';
import { IsArray } from '../../utils/IsArray';
import { dateFormater, dateToJavaUtilDate, stringToDateConverter } from '../../utils/DateTimeFormatter';
import { TwoDecimalPlaceAdd } from '../../utils/TwoDecimalPlaceAdd';
import { getAllUsersService } from '../../redux/slice/userslice/AllUserSlice';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { bankTxnSearchService, setBankSearchSliceToInitialState } from '../../redux/slice/bankslice/BankTxnSearchSlice';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import { cmsTxnSearchService, setCmsSearchSliceToInitialState } from '../../redux/slice/cmsslice/CmsTxnSearchSlice';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import CustomTooltips from '../../components/CustomTooltips/CustomTooltips';
import { IoClose } from "react-icons/io5";
import { GlobalStyles } from '../../styles/GlobalStyles';
import { FcDeleteRow } from 'react-icons/fc';
import CustomButton from '../../components/CustomButton/CustomButton';
import { deleteBankTxnService } from '../../redux/slice/bankslice/BankTxnDeleteSlice';
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar';
import Loading from '../../components/Loading/Loading';
import { deleteCmsTxnService } from '../../redux/slice/cmsslice/CmsTxnDeleteSlice';
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';
import DepositAndCmsForm from '../Dashboard/TxnAndDeposit/DepositAndCmsForm';
import { updateBankTxnService } from '../../redux/slice/bankslice/BankTxnUpdateSlice';
import { updateCmsTxnService } from '../../redux/slice/cmsslice/CmsTxnUpdateSlice';
import { getAllClientsService } from '../../redux/slice/clientslice/getAllClients';
import { isDataPresent } from '../../utils/IsDataPresent';



const Reports = ({ }) => {

  const theme = useTheme()
  const [reportsTab, setReportsTab] = useState(0)
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [collectedBySearch, setCollectedBySearch] = useState("")
  const [serachDates, setSerachDates] = useState({ fromDate: null, toDate: null })
  const[bankTxnDelete,setBankTxnDelete]=useState({dialog:false,row:{},snack:false,refresh:false})
  const[cmsTxnDelete,setCmsTxnDelete]=useState({dialog:false,row:{},snack:false,refresh:false})
  const[bankAndCmsDepositfields,setBankAndCmsDepositfields]=useState({
    recievedFrom:"",collectedBy:"",collectionAmount:"",TransactionDate:null,onlineAmount:"",cashAmount:"",balanceAmount:"",
    remarks:""
  })

  const[updatedBankTxn,setUpdatedBankTxn]=useState({open:false,snack:false,row:{},refresh:false})
  const[updatedCmsTxn,setUpdatedCmsTxn]=useState({open:false,snack:false,row:{},refresh:false})


  const { isAdmin, isClient, isManager, isUser } = HasAuthority()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  
  const getAllClients = () => { dispatch(getAllClientsService(protectedInterceptors)) }
  const getAllBankTransaction = (bank) => { dispatch(allBankDepositByUserNameService(bank)) }
  const getAllCmsTransaction = (cms) => { dispatch(allCmsTxnByUserNameService(cms)) }
  const getAllUsers = () => { dispatch(getAllUsersService(protectedInterceptors)) }
  const GET_ALL_USERS_SLICE_REDUCER = useSelector((state) => state.GET_ALL_USERS_SLICE_REDUCER)
  const GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER)
  const GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER)
  const BANK_TXN_SEARCH_SLICE_REDUCER = useSelector((state) => state?.BANK_TXN_SEARCH_SLICE_REDUCER)
  const CMS_TXN_SEARCH_SLICE_REDUCER = useSelector((state) => state?.CMS_TXN_SEARCH_SLICE_REDUCER)
  const DELETE_BANK_TXN_SLICE_REDUCER = useSelector((state) => state?.DELETE_BANK_TXN_SLICE_REDUCER)
  const DELETE_CMS_TXN_SLICE_REDUCER = useSelector((state) => state?.DELETE_CMS_TXN_SLICE_REDUCER)
  const UPDATE_BANK_TXN_SLICE_REDUCER = useSelector((state) => state?.UPDATE_BANK_TXN_SLICE_REDUCER)
  const UPDATE_CMS_TXN_SLICE_REDUCER = useSelector((state) => state?.UPDATE_CMS_TXN_SLICE_REDUCER)
  const GET_ALL_CLIENTS_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_CLIENTS_SLICE_REDUCER)

  
  useEffect(()=>{
    setBankAndCmsDepositfields((prev)=>{return{...prev,balanceAmount:(prev.collectionAmount)-((+prev.cashAmount)+ (+prev.onlineAmount))}})
  },[bankAndCmsDepositfields?.onlineAmount,bankAndCmsDepositfields?.cashAmount,bankAndCmsDepositfields.collectionAmount])
  
  

  const collectedBy = useMemo(() => {
    return Array.isArray(GET_ALL_USERS_SLICE_REDUCER?.data?.response) ?
      GET_ALL_USERS_SLICE_REDUCER?.data?.response?.map((item) => `${item?.userName}(${item?.mobileNumber})`)
      : []
  }, [GET_ALL_USERS_SLICE_REDUCER])

  const yearOptinsForBankTxn = useMemo(() => {
    let year = []
    if (Array.isArray(GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response)) {
      new Set(GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item) => `${item?.bankTransactionDate?.split("-")[0]}`)).forEach((i) => {
        year.push(i)
      }); return year
    }
    else { return [] }

  }, [GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER])

  const yearOptinsForCmsTxn = useMemo(() => {
    let year = []
    if (Array.isArray(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response)) {
      new Set(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item) => `${item?.cmsTransactionDate?.split("-")[0]}`)).forEach((i) => {
        year.push(i)
      }); return year
    }
    else { return [] }

  }, [GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER])

  useEffect(() => {getAllBankTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })}, [bankTxnDelete?.refresh,updatedBankTxn?.refresh])
  useEffect(()=>{ getAllCmsTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })},[cmsTxnDelete?.refresh,updatedCmsTxn?.refresh])

  useEffect(() => { if (isAdmin) { getAllUsers() } }, [])
  const handleReportTabChanges = (e, value) => { setYear(""); setMonth(""); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("") ;setReportsTab(value) }
  const onBankTxnEditClick = (row) => { 
    setUpdatedBankTxn((prev)=>{return{...prev,open:true,row:row}});
    setBankAndCmsDepositfields((prev)=>{return{...prev,balanceAmount:row?.balanceAmount,cashAmount:row?.cashAmount,
      collectedBy:row?.depositedBy,collectionAmount:row?.collectionAmount,onlineAmount:row?.onlineAmount,recievedFrom:row?.depositedInBank,
      remarks:row?.remarks,TransactionDate:stringToDateConverter(row?.bankTransactionDate)
    }})
  }
  const onBankTxnDeleteClick = (row) => { setBankTxnDelete((prev)=>({...prev,dialog:true,row:row}))}
  const onCmsTxnEditClick = (row) => {
    setUpdatedCmsTxn((prev)=>{return{...prev,open:true,row:row}});
    setBankAndCmsDepositfields((prev)=>{return{...prev,balanceAmount:row?.balanceAmount,cashAmount:row?.cashAmount,
      collectedBy:row?.collectedBy,collectionAmount:row?.collectionAmount,onlineAmount:row?.onlineAmount,recievedFrom:row?.recievedFrom,
      remarks:row?.remarks,TransactionDate:stringToDateConverter(row?.cmsTransactionDate)
    }})
   }
  const onCmsTxnDeleteClick = (row) => { setCmsTxnDelete((prev)=>({...prev,dialog:true,row:row})) }

const onBankTxnDeleteConfirmation=async(e)=>{
e.preventDefault()
const{payload}=await dispatch(deleteBankTxnService({protectedInterceptors:protectedInterceptors,bankTxnId:bankTxnDelete?.row?.bankTransactionId}))
if(payload?.statusCode===200){setBankTxnDelete((prev)=>{return{...prev,dialog:false,row:{},snack:true,refresh:!prev?.refresh}})}
else{ setBankTxnDelete((prev)=>{return{...prev,snack:true}})}
}

const onCmsTxnDeleteConfirmation=async(e)=>{
  e.preventDefault()
  const{payload}=await dispatch(deleteCmsTxnService({protectedInterceptors:protectedInterceptors,cmsTxnId:cmsTxnDelete?.row?.cmsTransactionId}))
  if(payload?.statusCode===200){setCmsTxnDelete((prev)=>{return{...prev,dialog:false,row:{},snack:true,refresh:!prev?.refresh}})}
  else{ setCmsTxnDelete((prev)=>{return{...prev,snack:true}})}
  }

  const onYearChange = async (e, value) => {
    setYear(value); setMonth(""); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("");
    dispatch(bankTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, year: value }))
  }
  const onMonthChange = async (e) => {
    setYear(""); setMonth(e.target.value); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("") ;
    dispatch(bankTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, month: e.target.value }))
  }

  const onDatesSearchClick = async (e) => {
    e.preventDefault()
    setYear(""); setMonth("");setCollectedBySearch("") ;
    dispatch(bankTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, fromDate: dateToJavaUtilDate(serachDates?.fromDate), toDate: dateToJavaUtilDate(serachDates?.toDate) }))
  }

  const onCmsYearChange = async (e, value) => {

    setYear(value); setMonth(""); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("") ;
    dispatch(cmsTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, year: value }))
  }

  const onCmsMonthChange = async (e) => {
    setYear(""); setMonth(e.target.value); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("") ;
    dispatch(cmsTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, month: e.target.value }))
  }

  const onCmsDatesSearchClick = async (e) => {
    e.preventDefault()
    setYear(""); setMonth("");setCollectedBySearch("") ;
    dispatch(cmsTxnSearchService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, fromDate: dateToJavaUtilDate(serachDates?.fromDate), toDate: dateToJavaUtilDate(serachDates?.toDate) }))
  }

const onBankCollectedByChange=async (e,value)=>{
 dispatch(setBankSearchSliceToInitialState()) 
setCollectedBySearch(value)
if(value==="ALL"){
  dispatch(getAllBankTransaction({ protectedInterceptors: protectedInterceptors,transactionType:value }))
}
else{
  const searchParams=typeof value==="string"?value.split("(")[1].match(/[0-9]+/):""
  getAllBankTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber:searchParams})
}

}


const onCmsCollectedByChange=async (e,value)=>{
  dispatch(setCmsSearchSliceToInitialState()) 
  setCollectedBySearch(value)
  if(value==="ALL"){
    dispatch(getAllCmsTransaction({ protectedInterceptors: protectedInterceptors,transactionType:value }))
  }
  else{
    const searchParams=typeof value==="string"?value.split("(")[1].match(/[0-9]+/):""
    getAllCmsTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber:searchParams})
  }
  
  }

  const bankTxnArray = useMemo(() => {

    if (BANK_TXN_SEARCH_SLICE_REDUCER?.data !== null && BANK_TXN_SEARCH_SLICE_REDUCER?.data !== undefined) {
      return IsArray(BANK_TXN_SEARCH_SLICE_REDUCER?.data?.response) ?
        BANK_TXN_SEARCH_SLICE_REDUCER?.data?.response?.map((item) => {
          return {
            ...item, bankTransactionDate: dateFormater(item?.bankTransactionDate),
            collectionAmount: TwoDecimalPlaceAdd(item?.collectionAmount),
            onlineAmount: TwoDecimalPlaceAdd(item?.onlineAmount),
            cashAmount: TwoDecimalPlaceAdd(item?.cashAmount),
            balanceAmount: TwoDecimalPlaceAdd(item?.balanceAmount),
          }
        }) : []
    }

    else {
      return IsArray(GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response) ?
        GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item) => {
          return {
            ...item, bankTransactionDate: dateFormater(item?.bankTransactionDate),
            collectionAmount: TwoDecimalPlaceAdd(item?.collectionAmount),
            onlineAmount: TwoDecimalPlaceAdd(item?.onlineAmount),
            cashAmount: TwoDecimalPlaceAdd(item?.cashAmount),
            balanceAmount: TwoDecimalPlaceAdd(item?.balanceAmount),
          }
        }) : []
    }
  }, [GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER, BANK_TXN_SEARCH_SLICE_REDUCER])


  const cmsTxnArray = useMemo(() => {

    if (CMS_TXN_SEARCH_SLICE_REDUCER?.data !== null && CMS_TXN_SEARCH_SLICE_REDUCER?.data !== undefined) {
      return IsArray(CMS_TXN_SEARCH_SLICE_REDUCER?.data?.response) ?
        CMS_TXN_SEARCH_SLICE_REDUCER?.data?.response?.map((item) => {
          return {
            ...item, cmsTransactionDate: dateFormater(item?.cmsTransactionDate),
            collectionAmount: TwoDecimalPlaceAdd(item?.collectionAmount),
            onlineAmount: TwoDecimalPlaceAdd(item?.onlineAmount),
            cashAmount: TwoDecimalPlaceAdd(item?.cashAmount),
            balanceAmount: TwoDecimalPlaceAdd(item?.balanceAmount),
          }
        })
        : []
    }

    else {
      return IsArray(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response) ?
        GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item) => {
          return {
            ...item, cmsTransactionDate: dateFormater(item?.cmsTransactionDate),
            collectionAmount: TwoDecimalPlaceAdd(item?.collectionAmount),
            onlineAmount: TwoDecimalPlaceAdd(item?.onlineAmount),
            cashAmount: TwoDecimalPlaceAdd(item?.cashAmount),
            balanceAmount: TwoDecimalPlaceAdd(item?.balanceAmount),
          }
        })
        : []

    }
  }, [GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER, CMS_TXN_SEARCH_SLICE_REDUCER])



const onBankTxnUpdateSubmit= async(e)=>{
  e.preventDefault()
  const{payload}=await dispatch(updateBankTxnService({protectedInterceptors:protectedInterceptors,bankTxnId:updatedBankTxn?.row?.bankTransactionId,payload:{...bankAndCmsDepositfields,TransactionDate:dateToJavaUtilDate(bankAndCmsDepositfields?.TransactionDate)}}))
if(payload?.statusCode===200){
  setUpdatedBankTxn((prev)=>{return{...prev,open:false,refresh:!prev.refresh,row:{},snack:true}})
}
else{   setUpdatedBankTxn((prev)=>{return{...prev,snack:true}})
}


}

const onCmsTxnUpdateSubmit=async(e)=>{
  e.preventDefault()
  const{payload}=await dispatch(updateCmsTxnService({protectedInterceptors:protectedInterceptors,cmsTxnId:updatedCmsTxn?.row?.cmsTransactionId,payload:{...bankAndCmsDepositfields,TransactionDate:dateToJavaUtilDate(bankAndCmsDepositfields?.TransactionDate)}}))
if(payload?.statusCode===200){
  setUpdatedCmsTxn((prev)=>{return{...prev,open:false,refresh:!prev.refresh,row:{},snack:true}})
}
else{   setUpdatedCmsTxn((prev)=>{return{...prev,snack:true}})
}


}


const clientList = useMemo(() => {
  return (
      IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
          GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
              let { bankName, ...clients } = item;
              return clients;
          })
      )?.filter((cll) => isDataPresent(cll?.clientName))?.map((cln)=>cln?.clientName) : []
  )


}, [GET_ALL_CLIENTS_SLICE_REDUCER])

const bankList = useMemo(() => {
  return (
      IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
          GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
              let { clientName, ...banks } = item;
              return banks;
          })
      )?.filter((cll) => isDataPresent(cll?.bankName))?.map((cln)=>cln?.bankName) : []
  )


}, [GET_ALL_CLIENTS_SLICE_REDUCER])

const companyList = useMemo(() => {
  return (
      IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
          GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
              let { clientName, ...banks } = item;
              return banks;
          })
      )?.filter((cll) => isDataPresent(cll?.companyName))?.map((cln) => cln?.companyName) : []
  )


}, [GET_ALL_CLIENTS_SLICE_REDUCER])


useEffect(()=>{getAllClients()},[])



  const reportTabs = [
    {
      label: "Bank  Reports ",
      minWidth: 140,
      component: <>
        <Box>
          <Box sx={{ mt: 2 }}>
            <ReportsSerching year={year} onCollectedByChange={onBankCollectedByChange} collectedBySearch={collectedBySearch} onYearChange={onYearChange} month={month} onMonthChange={onMonthChange} dates={{ serachDates, setSerachDates }} handleDateSearch={onDatesSearchClick} autoCompleteOptions={collectedBy} yearOptions={yearOptinsForBankTxn} isAdmin={isAdmin} />
          </Box>
          <Card sx={{ p: 1, mt: 2, mr: 1, mb: 5 }}>
            {
              GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER?.isLoading || BANK_TXN_SEARCH_SLICE_REDUCER?.isLoading ? <TableLoader /> :
                <>
                  {
                    IsArray(bankTxnArray) && bankTxnArray.length > 0 ? <CustomTable TableName={"BANK REPORTS"}
                      onEditClick={onBankTxnEditClick}
                      headCells={FinoLabel.bankDepositTableHead}
                      onDeleteClick={onBankTxnDeleteClick}
                      rows={bankTxnArray}
                      isActionRequired={isAdmin}
                    /> : <CustomAlert alertTitle={FinoLabel.noRecordFound} alertDescription={FinoLabel.noRecordFoundDesc} color={"secondary"} variant={"outlined"} severity={"info"} />
                  }
                </>

            }



          </Card>

        </Box>

      </>,
      icon: <PiBankBold fontSize={18} />
    },
    {
      label: "Cms Reports",
      minWidth: 150,
      component: <>
        <Box >
          <Box sx={{ mt: 2 }}>
            <ReportsSerching onCollectedByChange={onCmsCollectedByChange} collectedBySearch={collectedBySearch} handleDateSearch={onCmsDatesSearchClick} year={year} onYearChange={onCmsYearChange} month={month} onMonthChange={onCmsMonthChange} dates={{ serachDates, setSerachDates }} autoCompleteOptions={collectedBy} yearOptions={yearOptinsForCmsTxn} isAdmin={isAdmin} />
          </Box>
          <Card sx={{ p: 1, mt: 2, mr: 1, mb: 5 }}>
            {
              GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.isLoading || CMS_TXN_SEARCH_SLICE_REDUCER?.isLoading ? <TableLoader /> :

                <>

                  {
                    IsArray(cmsTxnArray) && cmsTxnArray.length > 0 ? <CustomTable
                      TableName={"CMS REPORTS"}
                      onEditClick={onCmsTxnEditClick}
                      headCells={FinoLabel.cmsTransactionTableHead}
                      onDeleteClick={onCmsTxnDeleteClick}
                      rows={cmsTxnArray}
                      isActionRequired={isAdmin}
                    /> : <CustomAlert alertTitle={FinoLabel.noRecordFound} alertDescription={FinoLabel.noRecordFoundDesc} color={"secondary"} variant={"outlined"} severity={"info"} />
                  }

                </>


            }


          </Card>

        </Box>
      </>,
      icon: <HiOutlineBanknotes fontSize={18} />
    },

  ]






  return (
    <Box>

      <DynamicHead title={`TXN REPORTS OF ${fullName?.toLocaleUpperCase()}`} />


      <Box sx={{ mt: 2 }}>
        <CustomTabs tabDetails={reportTabs} value={reportsTab} onChange={handleReportTabChanges} cardPosition={{ display: "flex", justifyContent: "flex-start" }} tabPosition={{ justifyContent: "flex-start" }} />

      </Box>
      <Box sx={{padding:"3px"}}></Box>

      <CustomDialog open={bankTxnDelete?.dialog} onClose={() => setBankTxnDelete((prev)=>{return{...prev,dialog:false}})}>
       
       {
        DELETE_BANK_TXN_SLICE_REDUCER?.isLoading?<Loading/>:
        <Box sx={{ p: 1 }}>
        <Box sx={{ ...GlobalStyles.alignmentStyles_2 }} ><CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() =>setBankTxnDelete((prev)=>{return{...prev,dialog:false}})} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
          <IoClose /></IconButton> </CustomTooltips></Box>

        <Box sx={{ p: 2, flexWrap: "wrap" }}>
          <Typography color={"info"} variant='v2' >Do you really wish to Remove this Transaction with Id  &nbsp;<span><Chip size="small" variant="outlined" color="p1" label={`${bankTxnDelete?.row?.bankTransactionId} `} /></span></Typography>
        </Box>
        <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
          <CustomButton title={"DELETE"} onClick={onBankTxnDeleteConfirmation} variant={"outlined"} color={"p1"} endIcon={<FcDeleteRow/>} />
        </Box>

      </Box>
       }
       
      
      </CustomDialog>

      <CustomDialog open={cmsTxnDelete?.dialog} onClose={() => setCmsTxnDelete((prev)=>{return{...prev,dialog:false}})}>
       
       {
        DELETE_CMS_TXN_SLICE_REDUCER?.isLoading?<Loading/>:
        <Box sx={{ p: 1 }}>
        <Box sx={{ ...GlobalStyles.alignmentStyles_2 }} ><CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() =>setCmsTxnDelete((prev)=>{return{...prev,dialog:false}})} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
          <IoClose /></IconButton> </CustomTooltips></Box>

        <Box sx={{ p: 2, flexWrap: "wrap" }}>
          <Typography color={"info"} variant='v2' >Do you really wish to Remove this Transaction with Id  &nbsp;<span><Chip size="small" variant="outlined" color="p1" label={`${cmsTxnDelete?.row?.cmsTransactionId} `} /></span></Typography>
        </Box>
        <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
          <CustomButton title={"DELETE"} onClick={onCmsTxnDeleteConfirmation} variant={"outlined"} color={"p1"} endIcon={<FcDeleteRow/>} />
        </Box>

      </Box>
       }
       
      
      </CustomDialog>


<CustomDrawer isCloseButtonRequired={true} anchor={"right"} open={updatedBankTxn?.open} onClose={()=>{setUpdatedBankTxn((prev)=>{return{...prev,open:false,row:{}}})}}>
  <Box sx={{maxWidth:400}}>
    {
      UPDATE_BANK_TXN_SLICE_REDUCER?.isLoading?<Loading/>:
      <DepositAndCmsForm isBankDeposit={true} bankList={bankList} clientList={clientList} onSubmit={onBankTxnUpdateSubmit} title={"UPDATE BANK DEPOSIT"} fields={{bankAndCmsDepositfields,setBankAndCmsDepositfields}} isUpdate={true}  />
    }
 </Box>
</CustomDrawer>

<CustomDrawer isCloseButtonRequired={true} anchor={"right"} open={updatedCmsTxn?.open} onClose={()=>{setUpdatedCmsTxn((prev)=>{return{...prev,open:false,row:{}}})}}>
  <Box sx={{maxWidth:400}}>
    {
      UPDATE_CMS_TXN_SLICE_REDUCER?.isLoading?<Loading/>:
      <DepositAndCmsForm bankList={bankList} clientList={clientList} companyList={companyList} onSubmit={onCmsTxnUpdateSubmit} title={"UPDATE CMS DEPOSIT"} fields={{bankAndCmsDepositfields,setBankAndCmsDepositfields}} isUpdate={true}  />
    }
 </Box>
</CustomDrawer>

<CustomSnackbar open={bankTxnDelete?.snack} onClose={()=>{setBankTxnDelete((prev)=>{return{...prev,snack:false}})}} message={DELETE_BANK_TXN_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_BANK_TXN_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
<CustomSnackbar open={cmsTxnDelete?.snack} onClose={()=>{setCmsTxnDelete((prev)=>{return{...prev,snack:false}})}} message={DELETE_CMS_TXN_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_CMS_TXN_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
<CustomSnackbar open={updatedBankTxn?.snack} onClose={()=>{setUpdatedBankTxn((prev)=>{return{...prev,snack:false}})}} message={UPDATE_BANK_TXN_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_BANK_TXN_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
<CustomSnackbar open={updatedCmsTxn?.snack} onClose={()=>{setUpdatedCmsTxn((prev)=>{return{...prev,snack:false}})}} message={UPDATE_CMS_TXN_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_CMS_TXN_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />



    </Box>
  )
}

export default Reports