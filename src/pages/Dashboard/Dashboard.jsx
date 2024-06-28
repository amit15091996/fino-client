import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
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
import { dateFormater, dateToJavaUtilDate } from '../../utils/DateTimeFormatter';
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar';
import Loading from '../../components/Loading/Loading';
import { cmsTransactionService } from '../../redux/slice/cmsslice/CmsTransactionSlice';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import UnderLine from '../../components/UnderLine/UnderLine';
import { getAllClientsService } from '../../redux/slice/clientslice/getAllClients';
import { isAnyDataAvailableInsideAnObject, isDataPresent } from '../../utils/IsDataPresent';
import { IsArray } from '../../utils/IsArray';
import HasAuthority from '../../hooks/HasAuthority';
import ClientDashboard from './ClientDashboard/ClientDashboard';
import { getClientDetailsByUserNameService } from '../../redux/slice/clientslice/getClientsDetailsByUserName';
import { TwoDecimalPlaceAdd } from '../../utils/TwoDecimalPlaceAdd';
import { monthWiseClientTxnAmount } from '../../utils/ChartUtils';
import CustomPieCharts from '../../components/PieCharts/CustomPieCharts';
import CustomBarCharts from '../../components/BarCharts/CustomBarCharts';

const Dashboard = ({ }) => {
  const navigate = useNavigate();
  const theme = useTheme()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()



  const [tabValue, setTabValue] = useState(0)
  const [bankAndCmsDepositfields, setBankAndCmsDepositfields] = useState({
    recievedFrom: "", collectedBy: fullName, collectionAmount: "", TransactionDate: null, onlineAmount: "", cashAmount: "", balanceAmount: "",
    remarks: ""
  })
  const [bankDepositSnackBarOpen, setBankDepositSnackBarOpen] = useState(false)
  const [cmsTransactionSnackBarOpen, setCmsTransactionSnackBarOpen] = useState(false)
  const [clientSearchParams, setClientSearchParams] = useState({ year: "", month: "", fromDate: null, toDate: null })
  const [clientDetailsResponse, setClientDetailsResponse] = useState({ isLoading: false, previousData: [], newData: [], error: "" })


  const getAllClients = () => { dispatch(getAllClientsService(protectedInterceptors)) }
  const getClientDetailsByUsername = async () => {
    setClientDetailsResponse((prev) => ({ ...prev, isLoading: true }))
    const { payload } = await dispatch(getClientDetailsByUserNameService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, payload: {} }))
    if (payload?.statusCode === 200) {
      const clientData = IsArray(payload?.response) ? payload?.response : []
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, previousData: clientData }))
    } else {
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, previousData: [], newData: [], error: payload?.statusMessage }))
    }
  }


  const BANK_DEPOSIT_SLICE_REDUCER = useSelector((state) => state.BANK_DEPOSIT_SLICE_REDUCER)
  const CMS_TRANSACTION_SLICE_REDUCER = useSelector((state) => state.CMS_TRANSACTION_SLICE_REDUCER)
  const GET_ALL_CLIENTS_SLICE_REDUCER = useSelector((state) => state?.GET_ALL_CLIENTS_SLICE_REDUCER)
  const GET_CLIENT_BY_USERNAME_SLICE_REDUCER = useSelector((state) => state?.GET_CLIENT_BY_USERNAME_SLICE_REDUCER)


  const onBankDepositSave = async (e) => {
    e.preventDefault()
    let bankPayload = (bankDeposit) => { return { ...bankDeposit, TransactionDate: dateToJavaUtilDate(bankDeposit?.TransactionDate), collectedBy: userName } };
    const { payload } = await dispatch(bankDepositService({ protectedInterceptors: protectedInterceptors, payload: bankPayload(bankAndCmsDepositfields) }))
    if (payload?.statusCode === 200) {
      setBankDepositSnackBarOpen(true)
      setBankAndCmsDepositfields({
        recievedFrom: "", collectedBy: fullName, collectionAmount: "", TransactionDate: null, onlineAmount: "", cashAmount: "", balanceAmount: "",
        remarks: ""
      })
    }
    else {
      setBankDepositSnackBarOpen(true)
    }


  }

  const onCmsTransactionSave = async (e) => {
    e.preventDefault()
    let cmsPayload = (cmsT) => { return { ...cmsT, TransactionDate: dateToJavaUtilDate(cmsT?.TransactionDate), collectedBy: userName } };
    const { payload } = await dispatch(cmsTransactionService({ protectedInterceptors: protectedInterceptors, payload: cmsPayload(bankAndCmsDepositfields) }))
    if (payload?.statusCode === 200) {
      setCmsTransactionSnackBarOpen(true)
      setBankAndCmsDepositfields({
        recievedFrom: "", collectedBy: fullName, collectionAmount: "", TransactionDate: null, onlineAmount: "", cashAmount: "", balanceAmount: "",
        remarks: ""
      })
    }
    else {
      setCmsTransactionSnackBarOpen(true)
    }


  }




  const clientList = useMemo(() => {
    return (
      IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
        GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
          let { bankName, ...clients } = item;
          return clients;
        })
      )?.filter((cll) => isDataPresent(cll?.clientName))?.map((cln) => cln?.clientName) : []
    )


  }, [GET_ALL_CLIENTS_SLICE_REDUCER])

  const bankList = useMemo(() => {
    return (
      IsArray(GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response) ? (
        GET_ALL_CLIENTS_SLICE_REDUCER?.data?.response?.map((item) => {
          let { clientName, ...banks } = item;
          return banks;
        })
      )?.filter((cll) => isDataPresent(cll?.bankName))?.map((cln) => cln?.bankName) : []
    )


  }, [GET_ALL_CLIENTS_SLICE_REDUCER])


  useEffect(() => { if (isUser || isAdmin || isManager) { getAllClients() } }, [])
  useEffect(() => { if (isClient) { getClientDetailsByUsername(); } }, [])

  useEffect(() => {
    setBankAndCmsDepositfields((prev) => { return { ...prev, balanceAmount: (prev.collectionAmount) - ((+prev.cashAmount) + (+prev.onlineAmount)) } })
  }, [bankAndCmsDepositfields?.onlineAmount, bankAndCmsDepositfields?.cashAmount, bankAndCmsDepositfields.collectionAmount])


  const handleTabChange = (e, value) => {
    setTabValue(value)
    setBankAndCmsDepositfields({
      recievedFrom: "", collectedBy: fullName, collectionAmount: "", TransactionDate: null, onlineAmount: "", cashAmount: "", balanceAmount: "",
      remarks: ""
    })

  }



  const tabs = [
    {
      label: "Bank Deposit ",
      minWidth: 140,
      component: <>{BANK_DEPOSIT_SLICE_REDUCER?.isLoading ? <Loading /> : <Box sx={{ mt: 1 }}><DepositAndCmsForm isBankDeposit={true} bankList={bankList} clientList={clientList} onSubmit={onBankDepositSave} title={"BANK DEPOSIT"} fields={{ bankAndCmsDepositfields, setBankAndCmsDepositfields }} /></Box>}</>,
      icon: <BsBank fontSize={18} />
    },
    {
      label: "Cms Transaction",
      minWidth: 150,
      component: <>{CMS_TRANSACTION_SLICE_REDUCER?.isLoading ? <Loading /> : <Box sx={{ mt: 1 }}><DepositAndCmsForm bankList={bankList} clientList={clientList} onSubmit={onCmsTransactionSave} title={"CMS TRANSACTION"} fields={{ bankAndCmsDepositfields, setBankAndCmsDepositfields }} /></Box>}</>,
      icon: <TbTransactionRupee fontSize={18} />
    },

  ]

  // client details integration starts Headers

  const totalAmount = useMemo(() => IsArray(clientDetailsResponse?.previousData) ? TwoDecimalPlaceAdd(clientDetailsResponse?.previousData?.map((item) => item?.collectionAmount)?.reduce((a, b) => a + b, 0)) : TwoDecimalPlaceAdd(0), [clientDetailsResponse?.previousData])
  const yearOptinsForClientCmsTxn = useMemo(() => {
    let year = []
    if (Array.isArray(clientDetailsResponse?.previousData)) {
      new Set(clientDetailsResponse?.previousData?.map((item) => `${item?.cmsTransactionDate?.split("-")[0]}`)).forEach((i) => {
        year.push(i)
      }); return year
    }
    else { return [] }

  }, [clientDetailsResponse?.previousData])


  const onClientYearChange = async (year) => {

    setClientSearchParams({ ...clientSearchParams, year: year })
    setClientDetailsResponse((prev) => ({ ...prev, isLoading: true }))
    const { payload } = await dispatch(getClientDetailsByUserNameService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, payload: { year: year ? year : "" } }))
    if (payload?.statusCode === 200) {
      const clientSearchData = IsArray(payload?.response) ? payload?.response : []
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, newData: clientSearchData }))
    } else {
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, previousData: [], newData: [], error: payload?.statusMessage }))
    }

  }

  const onClientMonthChange = async (month) => {

    setClientSearchParams({ ...clientSearchParams, month: month })
    setClientDetailsResponse((prev) => ({ ...prev, isLoading: true }))
    const { payload } = await dispatch(getClientDetailsByUserNameService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, payload: { month: month ? month : "" } }))
    if (payload?.statusCode === 200) {
      const clientSearchData = IsArray(payload?.response) ? payload?.response : []
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, newData: clientSearchData }))
    } else {
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, previousData: [], newData: [], error: payload?.statusMessage }))
    }

  }


  const onClientDateChange = async (e, dates) => {
    e.preventDefault();
    setClientSearchParams({ ...clientSearchParams, fromDate: dates?.fromDate, toDate: dates?.toDate })
    setClientDetailsResponse((prev) => ({ ...prev, isLoading: true }))
    const { payload } = await dispatch(getClientDetailsByUserNameService({ protectedInterceptors: protectedInterceptors, mobileNumber: userName, payload: { fromDate: dates?.fromDate ? dateToJavaUtilDate(dates?.fromDate) : "", toDate: dates?.toDate ? dateToJavaUtilDate(dates?.toDate) : "" } }))
    if (payload?.statusCode === 200) {
      const clientSearchData = IsArray(payload?.response) ? payload?.response : []
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, newData: clientSearchData }))
    } else {
      setClientDetailsResponse((prev) => ({ ...prev, isLoading: false, previousData: [], newData: [], error: payload?.statusMessage }))
    }

  }

const memorizedClientBar=useMemo(()=>monthWiseClientTxnAmount(clientDetailsResponse?.previousData),[clientDetailsResponse?.previousData])


  return (
    <Box >

      <DynamicHead title={`DASHBOARD OF ${fullName?.toLocaleUpperCase()}`} />



      {
        (isUser || isAdmin || isManager) && <>

          <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
            <Card sx={{ height: 80, width: 140 }}>
              <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                <MdAccountBalanceWallet fontSize={28} color={theme?.palette?.primary?.main} />
              </Box>
              <Box sx={{ ...GlobalStyles.alignmentStyles }}>
                <Typography variant='v2' color="primary">Opening Balance</Typography>
              </Box>
              <Box sx={{ mt: 1, ...GlobalStyles.alignmentStyles }}>
                <Typography variant='v2' color="primary">10000.00</Typography>
              </Box>
            </Card>

          </Box>


          <Box sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box sx={{ mr: 1, mb: 1, mt: 2 }}>
                  <Card>
                    <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                      <Typography variant="v5">
                        Yearly Sale's
                      </Typography>
                      <UnderLine color={theme?.palette?.p1?.main} width={21} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <CustomBarCharts />
                    </Box>
                  </Card>

                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                  <Card>
                    <Box sx={{ ml: 1, mb: 1, mt: 2 }}>
                      <Typography variant="v5">
                        Quarterly Sale's
                      </Typography>
                      <UnderLine color={theme?.palette?.p1?.main} width={21} />
                    </Box>
                    <Box sx={{ p: 2, ...GlobalStyles.alignmentStyles }}>
                      <CustomPieCharts />
                    </Box>
                  </Card>
                </Box>
              </Grid>

            </Grid>
          </Box>

          <Box sx={{ mt: 2 }}>
            <CustomTabs tabDetails={tabs} value={tabValue} onChange={handleTabChange} cardPosition={{ display: "flex", justifyContent: "flex-start" }} tabPosition={{ justifyContent: "flex-start" }} />

          </Box>

        </>
      }


      {
        isClient && <Box>
          <ClientDashboard
            clientTable={
              isAnyDataAvailableInsideAnObject(clientSearchParams) ?
                clientDetailsResponse?.newData?.map((client) => ({ ...client, cmsTransactionDate: dateFormater(client?.cmsTransactionDate) }))
                : clientDetailsResponse?.previousData?.map((client) => ({ ...client, cmsTransactionDate: dateFormater(client?.cmsTransactionDate) }))

            }
            totalAmount={totalAmount}
            yearOptinsForClientCmsTxn={yearOptinsForClientCmsTxn}
            onYearChange={onClientYearChange}
            clientDetailsResponse={clientDetailsResponse}
            onMonthChange={onClientMonthChange}
            onDateSerch={onClientDateChange}
            memorizedClientBar={memorizedClientBar}
          />

        </Box>
      }




      <CustomSnackbar open={bankDepositSnackBarOpen} onClose={() => { setBankDepositSnackBarOpen(false) }} message={BANK_DEPOSIT_SLICE_REDUCER?.data?.statusMessage} severity={BANK_DEPOSIT_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={cmsTransactionSnackBarOpen} onClose={() => { setCmsTransactionSnackBarOpen(false) }} message={CMS_TRANSACTION_SLICE_REDUCER?.data?.statusMessage} severity={CMS_TRANSACTION_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />

    </Box>
  )
}

export default Dashboard