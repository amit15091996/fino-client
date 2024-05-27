import { useTheme } from '@emotion/react'
import React, { useEffect, useMemo, useState } from 'react'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { HiOutlineBanknotes } from "react-icons/hi2";
import { PiBankBold } from "react-icons/pi";
import { Box, Button, Card } from '@mui/material';
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
import { dateFormater, dateToJavaUtilDate } from '../../utils/DateTimeFormatter';
import { TwoDecimalPlaceAdd } from '../../utils/TwoDecimalPlaceAdd';
import { getAllUsersService } from '../../redux/slice/userslice/AllUserSlice';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import { bankTxnSearchService, setBankSearchSliceToInitialState } from '../../redux/slice/bankslice/BankTxnSearchSlice';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import { cmsTxnSearchService, setCmsSearchSliceToInitialState } from '../../redux/slice/cmsslice/CmsTxnSearchSlice';


const Reports = ({ }) => {

  const theme = useTheme()
  const [reportsTab, setReportsTab] = useState(0)
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [collectedBySearch, setCollectedBySearch] = useState("")
  const [serachDates, setSerachDates] = useState({ fromDate: null, toDate: null })


  const { isAdmin, isClient, isManager, isUser } = HasAuthority()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const getAllBankTransaction = (bank) => { dispatch(allBankDepositByUserNameService(bank)) }
  const getAllCmsTransaction = (cms) => { dispatch(allCmsTxnByUserNameService(cms)) }
  const getAllUsers = () => { dispatch(getAllUsersService(protectedInterceptors)) }
  const GET_ALL_USERS_SLICE_REDUCER = useSelector((state) => state.GET_ALL_USERS_SLICE_REDUCER)
  const GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER)
  const GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER)
  const BANK_TXN_SEARCH_SLICE_REDUCER = useSelector((state) => state?.BANK_TXN_SEARCH_SLICE_REDUCER)
  const CMS_TXN_SEARCH_SLICE_REDUCER = useSelector((state) => state?.CMS_TXN_SEARCH_SLICE_REDUCER)




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

  }, [GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER,BANK_TXN_SEARCH_SLICE_REDUCER])

  const yearOptinsForCmsTxn = useMemo(() => {
    let year = []
    if (Array.isArray(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response)) {
      new Set(GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER?.data?.response?.map((item) => `${item?.cmsTransactionDate?.split("-")[0]}`)).forEach((i) => {
        year.push(i)
      }); return year
    }
    else { return [] }

  }, [GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER,CMS_TXN_SEARCH_SLICE_REDUCER])

  useEffect(() => {
    getAllBankTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })
    getAllCmsTransaction({ protectedInterceptors: protectedInterceptors, mobileNumber: userName })
  }, [])

  useEffect(() => { if (isAdmin) { getAllUsers() } }, [])
  const handleReportTabChanges = (e, value) => { setYear(""); setMonth(""); setSerachDates({ fromDate: null, toDate: null });setCollectedBySearch("") ;setReportsTab(value) }
  const onBankTxnEditClick = (row) => { }
  const onBankTxnDeleteClick = (row) => { }
  const onCmsTxnEditClick = (row) => { }
  const onCmsTxnDeleteClick = (row) => { }

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

      <DynamicHead title={`${fullName?.toLocaleUpperCase()}'S TXN REPORTS`} />


      <Box sx={{ mt: 2 }}>
        <CustomTabs tabDetails={reportTabs} value={reportsTab} onChange={handleReportTabChanges} cardPosition={{ display: "flex", justifyContent: "flex-start" }} tabPosition={{ justifyContent: "flex-start" }} />

      </Box>


    </Box>
  )
}

export default Reports