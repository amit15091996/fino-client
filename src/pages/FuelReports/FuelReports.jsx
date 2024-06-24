import { Box, Chip, DialogTitle, Grid, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import DynamicHead from '../../components/DynamicHead/DynamicHead'
import AuthHook from '../../hooks/AuthHook'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { GiEnergyTank } from "react-icons/gi";
import { GiFuelTank } from "react-icons/gi";
import { GiScubaTanks } from "react-icons/gi";
import MsSale from './MsSale/MsSale'
import HsdSaleOne from './HsdSale01/HsdSaleOne'
import HsdSaleTwo from './HsdSale2/HsdSaleTwo'
import ProtectedInterceptors from '../../hooks/ProtectedInterceptors'
import HasAuthority from '../../hooks/HasAuthority'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMsSaleReportService } from '../../redux/slice/mssaleslice/getAllMsSaleList'
import CustomDialog from '../../components/CustomDialog/CustomDialog'
import Loading from '../../components/Loading/Loading'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomDialogTitle from '../../components/CustomDialog/CustomDialogTitle'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { isDataAvailable } from '../../utils/IsDataPresent'
import { dateFormater, dateToJavaUtilDate, isValidDate } from '../../utils/DateTimeFormatter'
import { addMsSaleReportService } from '../../redux/slice/mssaleslice/addMsSaleSlice'
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar'
import dayjs from 'dayjs'
import { previousDayOfHsdSaleTwo, previousDayOfMssale, sameDayOfHsdSaleTwo, sameDayOfMssale } from '../../utils/FuelReportUtil'
import { getAllHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/getAllHsdtankTwoslice'
import { addHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/addHsdtankTwoslice'




const FuelReports = () => {
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()

  const [fuelTabValue, setFuelTabValue] = useState(0)
  const onFuelTabChange = (e, value) => { setFuelTabValue(value) }

  const [msSaleResponse, setMsSaleResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, msSaleData: {} })
  const [hsdTankTwoResponse, setHsdTankTwoResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankTwoData: {} })

  const [msSaleFields, setMsSaleFields] = useState({
    MsSaleDate: dayjs(), inwardOfMSSale: "", dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: "",
    density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
  })

  const [hsdTankTwoFields, setHsdTankTwoFields] = useState({
    HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: "", dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
    testing: "", density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
  })



  const getAllMsSaleReports = () => { dispatch(getAllMsSaleReportService(protectedInterceptors)) }
  const getAllHsdSaleTwoReports = () => { dispatch(getAllHsdTankTwoReportService(protectedInterceptors)) }


  const GET_ALL_MS_SALE_SLICE_REDUCER = useSelector((state) => state.GET_ALL_MS_SALE_SLICE_REDUCER)
  const ADD_MS_SALE_SLICE_REDUCER = useSelector((state) => state.ADD_MS_SALE_SLICE_REDUCER)
  const DELETE_MS_SALE_SLICE_REDUCER = useSelector((state) => state.DELETE_MS_SALE_SLICE_REDUCER)

  const GET_ALL_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.GET_ALL_HSD_TWO_SLICE_REDUCER)
  const ADD_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.ADD_HSD_TWO_SLICE_REDUCER)
  const DELETE_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.DELETE_HSD_TWO_SLICE_REDUCER)

  useEffect(() => { getAllMsSaleReports() }, [msSaleResponse?.refresh])
  useEffect(() => { getAllHsdSaleTwoReports() }, [hsdTankTwoResponse?.refresh])

  const onMsSaleSubmit = (e) => {
    e.preventDefault();
    setMsSaleResponse((prev) => ({ ...prev, dialog: true, msSaleData: msSaleFields }))
  }
  const onHsdTankTwoSubmit = (e) => {
    e.preventDefault();
    setHsdTankTwoResponse((prev) => ({ ...prev, dialog: true, hsdTankTwoData: hsdTankTwoFields }))

  }

  const onMsSaleSubmitConfirm = async (e) => {
    e.preventDefault();
    const msSalePayload = (payload) => ({ ...payload, MsSaleDate: dateToJavaUtilDate(payload?.MsSaleDate) })

    const { payload } = await dispatch(addMsSaleReportService({ protectedInterceptors: protectedInterceptors, payload: msSalePayload(msSaleFields) }))
    if (payload?.statusCode === 200) {
      setMsSaleResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, msSaleData: {}, response: {} }))
    }
    else {
      setMsSaleResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }

  const onHsdTankTwoSaleConfirm = async (e) => {
    e.preventDefault();
    const hsdTankTwoPayload = (payload) => ({ ...payload, HsdTankTwoDate: dateToJavaUtilDate(payload?.HsdTankTwoDate) })

    const { payload } = await dispatch(addHsdTankTwoReportService({ protectedInterceptors: protectedInterceptors, payload: hsdTankTwoPayload(hsdTankTwoFields) }))
    if (payload?.statusCode === 200) {
      setHsdTankTwoResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankTwoData: {}, response: {} }))
    }
    else {
      setHsdTankTwoResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }

  const previousDayMssales = useMemo(() => previousDayOfMssale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response), [GET_ALL_MS_SALE_SLICE_REDUCER])
  const sameDayMssales = useMemo(() => sameDayOfMssale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response), [GET_ALL_MS_SALE_SLICE_REDUCER])

  const previousDayHsdTankTwoSales = useMemo(() => previousDayOfHsdSaleTwo(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_TWO_SLICE_REDUCER])
  const sameDayTankTwoSales = useMemo(() => sameDayOfHsdSaleTwo(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_TWO_SLICE_REDUCER])


  const fuelTabs = [
    {
      label: "MS SALE 01",
      minWidth: 140,
      component: <MsSale
        key={"ms_sale_reports"}
        msSaleFieldsVar={{ msSaleFields, setMsSaleFields }}
        getAllmsSaleReport={GET_ALL_MS_SALE_SLICE_REDUCER}
        onMsSaleSubmit={onMsSaleSubmit}
        previousDayMssales={previousDayMssales}
        sameDayMssales={sameDayMssales}
      />,
      icon: <GiEnergyTank fontSize={18} />
    },
    {
      label: "HSD SALE 01",
      minWidth: 150,
      component: <HsdSaleOne />,
      icon: <GiFuelTank fontSize={18} />
    },
    {
      label: "HSD SALE 02",
      minWidth: 150,
      component: <HsdSaleTwo
        key={"hsd_tank_two_sale_report"}
        hsdTankTwoFieldsVar={{ hsdTankTwoFields, setHsdTankTwoFields }}
        allhsdTankTwoReport={GET_ALL_HSD_TWO_SLICE_REDUCER}
        onHsdTankTwoSubmit={onHsdTankTwoSubmit}
        previousDayHsdTankTwoSales={previousDayHsdTankTwoSales}
        sameDayTankTwoSales={sameDayTankTwoSales}

      />,
      icon: <GiScubaTanks fontSize={18} />
    },

  ]





  return (
    <Box>
      <Box>

        <DynamicHead title={`FUEL REPORT'S OF ${fullName?.toLocaleUpperCase()}`} />


        <Box sx={{ mt: 2 }}>
          <CustomTabs tabDetails={fuelTabs} value={fuelTabValue} onChange={onFuelTabChange} cardPosition={{ display: "flex", justifyContent: "flex-start" }} tabPosition={{ justifyContent: "flex-start" }} />

        </Box>

      </Box>


      <CustomDialog isFullWidth={true} maxWidth={"lg"} open={msSaleResponse?.dialog} onClose={() => { setMsSaleResponse((prev) => ({ ...prev, dialog: false })) }}>


        {
          ADD_MS_SALE_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"MS SALE"} onClose={() => { setMsSaleResponse((prev) => ({ ...prev, dialog: false })) }} />


              <Box sx={{ p: 2 }}>
                <Box sx={{ p: 1 }} >
                  <Typography color={"primary"} variant='v3' >Do you want to submit MS Sale reports for the day...</Typography>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Grid container>
                    {
                      Object.keys(msSaleResponse?.msSaleData)?.map((msKey) => {
                        return (
                          <Grid item xs={12} md={4}>
                            <Box sx={{ p: 1 }}>
                              <Chip size='small' sx={{ letterSpacing: 1.4, width: "100%" }} label={`${msKey?.toUpperCase()} : ${isDataAvailable(msSaleResponse?.msSaleData[msKey])}`}>
                              </Chip>
                            </Box>
                          </Grid>
                        )
                      })

                    }
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ p: 2, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
                <CustomButton width={150} onClick={onMsSaleSubmitConfirm} title={"SUBMIT"} color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>


      <CustomDialog isFullWidth={true} maxWidth={"lg"} open={hsdTankTwoResponse?.dialog} onClose={() => { setHsdTankTwoResponse((prev) => ({ ...prev, dialog: false })) }}>


        {
          ADD_HSD_TWO_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"HSD TANK 02"} onClose={() => { setHsdTankTwoResponse((prev) => ({ ...prev, dialog: false })) }} />


              <Box sx={{ p: 2 }}>
                <Box sx={{ p: 1 }} >
                  <Typography color={"primary"} variant='v3' >Do you want to submit Hsd Tank 02 Sale reports for the day...</Typography>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Grid container>
                    {
                      Object.keys(hsdTankTwoResponse?.hsdTankTwoData)?.map((hsdTwo) => {
                        return (
                          <Grid item xs={12} md={4}>
                            <Box sx={{ p: 1 }}>
                              <Chip size='small' sx={{ letterSpacing: 1.4, width: "100%" }} label={`${hsdTwo?.toUpperCase()} : ${isDataAvailable(hsdTankTwoResponse?.hsdTankTwoData[hsdTwo])}`}>
                              </Chip>
                            </Box>
                          </Grid>
                        )
                      })

                    }
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ p: 2, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
                <CustomButton width={150} onClick={onHsdTankTwoSaleConfirm} title={"SUBMIT"} color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>



      <CustomSnackbar open={msSaleResponse?.snackbar} onClose={() => { setMsSaleResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_MS_SALE_SLICE_REDUCER?.data?.statusMessage} severity={ADD_MS_SALE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={hsdTankTwoResponse?.snackbar} onClose={() => { setHsdTankTwoResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_HSD_TWO_SLICE_REDUCER?.data?.statusMessage} severity={ADD_HSD_TWO_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />

    </Box>
  )
}

export default FuelReports