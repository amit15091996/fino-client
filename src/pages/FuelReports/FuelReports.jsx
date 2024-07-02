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
import { dateFormater, dateToJavaUtilDate, isValidDate, stringToDateConverter } from '../../utils/DateTimeFormatter'
import { addMsSaleReportService } from '../../redux/slice/mssaleslice/addMsSaleSlice'
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar'
import dayjs from 'dayjs'
import { allDatesBetweenTwoDatesOfHsdTankOne, allDatesBetweenTwoDatesOfHsdTankTwo, allDatesBetweenTwoDatesOfMsSale, previousDayOfHsdSaleOne, previousDayOfHsdSaleTwo, previousDayOfHsdTankOneWhileEdit, previousDayOfHsdTankTwoWhileEdit, previousDayOfMssale, previousDayOfMssaleWhileEdit, sameDayOfHsdSaleOne, sameDayOfHsdSaleTwo, sameDayOfMssale } from '../../utils/FuelReportUtil'
import { getAllHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/getAllHsdtankTwoslice'
import { addHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/addHsdtankTwoslice'
import { getAllHsdTankOneReportService } from '../../redux/slice/hsdtankoneslice/getAllHsdtankOneslice'
import { addHsdTankOneReportService } from '../../redux/slice/hsdtankoneslice/addHsdtankOneslice'
import LeftDates from './FuelValidation/LeftDates'
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer'
import FuelReportsForm from './MsSale/FuelReportsForm'
import { updateMsSaleReportService } from '../../redux/slice/mssaleslice/updateMsSaleSlice'
import { deleteMsSaleReportService } from '../../redux/slice/mssaleslice/deleteMsSaleSlice'
import HsdSaleTankOne from './HsdSale01/HsdSaleTankOne'
import { updateHsdTankOneReportService } from '../../redux/slice/hsdtankoneslice/updateHsdtankOneslice'
import { deleteHsdTankOneReportService } from '../../redux/slice/hsdtankoneslice/deleteHsdtankOneslice'
import HsdSaleTankTwo from './HsdSale2/HsdSaleTankTwo'
import { updateHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/updateHsdtankTwoslice'
import { deleteHsdTankTwoReportService } from '../../redux/slice/hsdtanktwoslice/deleteHsdtankTwoslice'




const FuelReports = () => {
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()

  const [fuelTabValue, setFuelTabValue] = useState(0)
  const onFuelTabChange = (e, value) => { setFuelTabValue(value) }

  const [msSaleResponse, setMsSaleResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, msSaleData: {}, previousData: [] })
  const [msSaleEditResponse, setMsSaleEditResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, msSaleData: {}, msSalePreviousDate: {} })
  const [msSaleDeleteResponse, setMsSaleDeleteResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, msSaleData: {} })

  const [hsdTankOneResponse, setHsdTankOneResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankOneData: {} })
  const [hsdTankOneEditResponse, setHsdTankOneEditResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankOneData: {}, hsdTankOnePreviousData: {} })
  const [hsdTankOneDeleteResponse, setHsdTankOneDeleteResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankOneData: {} })


  const [hsdTankTwoResponse, setHsdTankTwoResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankTwoData: {} })
  const [hsdTankTwoEditResponse, setHsdTankTwoEditResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankTwoData: {}, hsdTankTwoPreviousData: {} })
  const [hsdTankTwoDeleteResponse, setHsdTankTwoDeleteResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, hsdTankTwoData: {} })



  const [msSaleFields, setMsSaleFields] = useState({
    MsSaleDate: dayjs(), inwardOfMSSale: 0, dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: 0,
    density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
  })

  const [hsdTankTwoFields, setHsdTankTwoFields] = useState({
    HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: 0, dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
    testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
  })

  const [hsdTankOneFields, setHsdTankOneFields] = useState({
    HsdTankOneDate: dayjs(), inwardOfHsdTankOne: 0, dipStockOfHsdTankOneInLtrs: "", dipStockOfHsdTankOneInCentimeters: ""
    , testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankOneNozzleOne: "", closingMeterOfHsdTankOneNozzleTwo: "",
    closingMeterOfHsdTankOneNozzleThree: "", closingMeterOfHsdTankOneNozzleFour: ""
  })


  const getAllMsSaleReports = () => { dispatch(getAllMsSaleReportService(protectedInterceptors)) }
  const getAllHsdSaleTwoReports = () => { dispatch(getAllHsdTankTwoReportService(protectedInterceptors)) }
  const getAllHsdSaleOneReports = () => { dispatch(getAllHsdTankOneReportService(protectedInterceptors)) }


  const GET_ALL_MS_SALE_SLICE_REDUCER = useSelector((state) => state.GET_ALL_MS_SALE_SLICE_REDUCER)
  const ADD_MS_SALE_SLICE_REDUCER = useSelector((state) => state.ADD_MS_SALE_SLICE_REDUCER)
  const DELETE_MS_SALE_SLICE_REDUCER = useSelector((state) => state.DELETE_MS_SALE_SLICE_REDUCER)
  const UPDATE_MS_SALE_SLICE_REDUCER = useSelector((state) => state.UPDATE_MS_SALE_SLICE_REDUCER)

  const GET_ALL_HSD_ONE_SLICE_REDUCER = useSelector((state) => state.GET_ALL_HSD_ONE_SLICE_REDUCER)
  const ADD_HSD_ONE_SLICE_REDUCER = useSelector((state) => state.ADD_HSD_ONE_SLICE_REDUCER)
  const DELETE_HSD_ONE_SLICE_REDUCER = useSelector((state) => state.DELETE_HSD_ONE_SLICE_REDUCER)
  const UPDATE_HSD_ONE_SLICE_REDUCER = useSelector((state) => state.UPDATE_HSD_ONE_SLICE_REDUCER)


  const GET_ALL_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.GET_ALL_HSD_TWO_SLICE_REDUCER)
  const ADD_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.ADD_HSD_TWO_SLICE_REDUCER)
  const DELETE_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.DELETE_HSD_TWO_SLICE_REDUCER)
  const UPDATE_HSD_TWO_SLICE_REDUCER = useSelector((state) => state.DELETE_HSD_TWO_SLICE_REDUCER)




  useEffect(() => { getAllMsSaleReports() }, [msSaleResponse?.refresh, msSaleEditResponse?.refresh, msSaleDeleteResponse?.refresh])
  useEffect(() => { getAllHsdSaleOneReports() }, [hsdTankOneResponse?.refresh, hsdTankOneDeleteResponse?.refresh, hsdTankOneEditResponse?.refresh])
  useEffect(() => { getAllHsdSaleTwoReports() }, [hsdTankTwoResponse?.refresh, hsdTankTwoEditResponse?.refresh, hsdTankTwoDeleteResponse?.refresh])


  const onMsSaleSubmit = (e) => {
    e.preventDefault();
    setMsSaleResponse((prev) => ({ ...prev, dialog: true, msSaleData: msSaleFields, previousData: allDatesBetweenTwoDatesOfMsSale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response) }))
  }
  const onMsSaleEditClick = (row) => {

    const prevDayMsSale = previousDayOfMssaleWhileEdit(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response, row?.msSaleDate);

    setMsSaleEditResponse((prev) => ({ ...prev, dialog: true, msSaleData: row, msSalePreviousDate: prevDayMsSale }));

    setMsSaleFields((prev) => ({
      ...prev,
      closingMeterOfMSSaleNozzleOne: row?.closingMeterOfMSSaleNozzleOne,
      closingMeterOfMSSaleNozzleTwo: row?.closingMeterOfMSSaleNozzleTwo,
      density: row?.density,
      dipStockOfMSSaleInCentimeters: row?.dipStockOfMSSaleInCentimeter,
      dipStockOfMSSaleInLtrs: row?.dipStockOfMSSaleInLtrs,
      inwardOfMSSale: row?.inwardOfMSSale,
      MsSaleDate: stringToDateConverter(row?.msSaleDate),
      remarks: row?.remarks, testing: row?.testing, waterDip: row?.waterDip

    }))
  }
  const onMsSaleDeleteClick = (row) => { setMsSaleDeleteResponse((prev) => ({ ...prev, dialog: true, msSaleData: row })); }

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

  const onMsSaleUpdateSubmit = async (e) => {
    e.preventDefault();
    const msSaleUpdatePayload = (payload) => ({ ...payload, MsSaleDate: dateToJavaUtilDate(payload?.MsSaleDate) })

    const { payload } = await dispatch(updateMsSaleReportService({ protectedInterceptors: protectedInterceptors, payload: msSaleUpdatePayload(msSaleFields), msSaleId: msSaleEditResponse?.msSaleData?.msSaleId }))
    if (payload?.statusCode === 200) {
      setMsSaleEditResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, msSaleData: {}, response: {}, msSalePreviousDate: {} }))
      setMsSaleFields({
        MsSaleDate: dayjs(), inwardOfMSSale: 0, dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: 0,
        density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
      })

    }
    else {
      setMsSaleResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
      setMsSaleFields({
        MsSaleDate: dayjs(), inwardOfMSSale: 0, dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: 0,
        density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
      })
    }
  }

  const onMsSaleDeleteSubmit = async (e) => {
    e.preventDefault();

    const { payload } = await dispatch(deleteMsSaleReportService({ protectedInterceptors: protectedInterceptors, msSaleId: msSaleDeleteResponse?.msSaleData?.msSaleId }))
    if (payload?.statusCode === 200) {
      setMsSaleDeleteResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, msSaleData: {} }))
    }
    else {
      setMsSaleDeleteResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }

  const onHsdTankOneSubmit = (e) => {
    e.preventDefault();
    setHsdTankOneResponse((prev) => ({ ...prev, dialog: true, hsdTankOneData: hsdTankOneFields }))
  }
  const onHsdTankOneEditClick = (row) => {
    setHsdTankOneEditResponse((prev) => ({ ...prev, dialog: true, hsdTankOneData: row, hsdTankOnePreviousData: previousDayOfHsdTankOneWhileEdit(GET_ALL_HSD_ONE_SLICE_REDUCER?.data?.response, row?.hsdTankOneDate) }));
    setHsdTankOneFields((prev) => ({
      ...prev,
      closingMeterOfHsdTankOneNozzleOne: row?.closingMeterOfHsdTankOneNozzleOne,
      closingMeterOfHsdTankOneNozzleTwo: row?.closingMeterOfHsdTankOneNozzleTwo,
      closingMeterOfHsdTankOneNozzleThree: row?.closingMeterOfHsdTankOneNozzleThree,
      closingMeterOfHsdTankOneNozzleFour: row?.closingMeterOfHsdTankOneNozzleFour,
      density: row?.density,
      dipStockOfHsdTankOneInLtrs: row?.dipOfHsdTankOneInLtrs,
      dipStockOfHsdTankOneInCentimeters: row?.dipOfHsdTankOneInCentimeter,
      inwardOfHsdTankOne: row?.inwardOfHsdTankOne,
      HsdTankOneDate: stringToDateConverter(row?.hsdTankOneDate),
      remarks: row?.remarks, testing: row?.testing, waterDip: row?.waterDip,

    }))

  }
  const onHsdTankOneDeleteClick = (row) => { setHsdTankOneDeleteResponse((prev) => ({ ...prev, dialog: true, hsdTankOneData: row })); }

  const onHsdTankOneSaleConfirm = async (e) => {
    e.preventDefault();
    const hsdTankOnePayload = (payload) => ({ ...payload, HsdTankOneDate: dateToJavaUtilDate(payload?.HsdTankOneDate) })

    const { payload } = await dispatch(addHsdTankOneReportService({ protectedInterceptors: protectedInterceptors, payload: hsdTankOnePayload(hsdTankOneFields) }))
    if (payload?.statusCode === 200) {
      setHsdTankOneResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankOneData: {}, response: {} }))
    }
    else {
      setHsdTankOneResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }

  const onHsdTankOneUpdateSubmit = async (e) => {
    e.preventDefault();
    const hsdTankOneUpdatePayload = (payload) => ({ ...payload, HsdTankOneDate: dateToJavaUtilDate(payload?.HsdTankOneDate) })

    const { payload } = await dispatch(updateHsdTankOneReportService({ protectedInterceptors: protectedInterceptors, payload: hsdTankOneUpdatePayload(hsdTankOneFields), hsdSaleOneId: hsdTankOneEditResponse?.hsdTankOneData?.dieselTankOneId }))
    if (payload?.statusCode === 200) {
      setHsdTankOneEditResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankOneData: {}, response: {} }))
      setHsdTankOneFields({
        HsdTankOneDate: dayjs(), inwardOfHsdTankOne: 0, dipStockOfHsdTankOneInLtrs: "", dipStockOfHsdTankOneInCentimeters: ""
        , testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankOneNozzleOne: "", closingMeterOfHsdTankOneNozzleTwo: "",
        closingMeterOfHsdTankOneNozzleThree: "", closingMeterOfHsdTankOneNozzleFour: ""
      })
    }
    else {
      setHsdTankOneEditResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
      setHsdTankOneFields({
        HsdTankOneDate: dayjs(), inwardOfHsdTankOne: 0, dipStockOfHsdTankOneInLtrs: "", dipStockOfHsdTankOneInCentimeters: ""
        , testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankOneNozzleOne: "", closingMeterOfHsdTankOneNozzleTwo: "",
        closingMeterOfHsdTankOneNozzleThree: "", closingMeterOfHsdTankOneNozzleFour: ""
      })
    }


  }

  const onHsdTankOneDeleteSubmit = async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(deleteHsdTankOneReportService({ protectedInterceptors: protectedInterceptors, hsdTankOneId: hsdTankOneDeleteResponse?.hsdTankOneData?.dieselTankOneId }))
    if (payload?.statusCode === 200) {
      setHsdTankOneDeleteResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankOneData: {} }))
    }
    else {
      setHsdTankOneDeleteResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }


  const onHsdTankTwoSubmit = (e) => {
    e.preventDefault();
    setHsdTankTwoResponse((prev) => ({ ...prev, dialog: true, hsdTankTwoData: hsdTankTwoFields }))

  }
  const onHsdTankTwoEditClick = (row) => {
    setHsdTankTwoEditResponse((prev) => ({ ...prev, dialog: true, hsdTankTwoData: row, hsdTankTwoPreviousData: previousDayOfHsdTankTwoWhileEdit(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response, row?.hsdTankTwoDate) }));
    setHsdTankTwoFields((prev) => ({
      ...prev,
      closingMeterOfHsdTankTwoNozzleOne: row?.closingMeterOfHsdTankTwoNozzleOne,
      closingMeterOfHsdTankTwoNozzleTwo: row?.closingMeterOfHsdTankTwoNozzleTwo,
      dipStockOfHsdTankTwoInCentimeters: row?.dipOfHsdTankTwoInCentimeter,
      dipStockOfHsdTankTwoInLtrs: row?.dipOfHsdTankTwoInLtrs,
      density: row?.density,
      inwardOfHsdTankTwo: row?.inwardOfHsdTankTwo,
      HsdTankTwoDate: stringToDateConverter(row?.hsdTankTwoDate),
      remarks: row?.remarks, testing: row?.testing, waterDip: row?.waterDip,

    }))

  }
  const onHsdTankTwoDeleteClick = (row) => { setHsdTankTwoDeleteResponse((prev) => ({ ...prev, dialog: true, hsdTankTwoData: row })); }



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

  const onHsdTankTwoUpdateSubmit = async (e) => {
    e.preventDefault();
    const hsdTankTwoUpdatePayload = (payload) => ({ ...payload, HsdTankTwoDate: dateToJavaUtilDate(payload?.HsdTankTwoDate) })

    const { payload } = await dispatch(updateHsdTankTwoReportService({ protectedInterceptors: protectedInterceptors, payload: hsdTankTwoUpdatePayload(hsdTankTwoFields), hsdSaleTwoId: hsdTankTwoEditResponse?.hsdTankTwoData?.dieselTankTwoId }))
    if (payload?.statusCode === 200) {
      setHsdTankTwoEditResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankTwoData: {}, response: {}, hsdTankTwoPreviousData: {} }))
      setHsdTankTwoFields({
        HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: 0, dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
        testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
      })
    }
    else {
      setHsdTankTwoEditResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
      setHsdTankTwoFields({
        HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: 0, dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
        testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
      })
    }
  }

  const onHsdTankTwoDeleteSubmit = async (e) => {
    e.preventDefault();
    const { payload } = await dispatch(deleteHsdTankTwoReportService({ protectedInterceptors: protectedInterceptors, hsdTankTwoId: hsdTankTwoDeleteResponse?.hsdTankTwoData?.dieselTankTwoId }))
    if (payload?.statusCode === 200) {
      setHsdTankTwoDeleteResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true, dialog: false, hsdTankTwoData: {} }))
    }
    else {
      setHsdTankTwoDeleteResponse((prev) => ({ ...prev, snackbar: true, dialog: false }))
    }
  }


  const previousDayMssales = useMemo(() => previousDayOfMssale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response), [GET_ALL_MS_SALE_SLICE_REDUCER])
  const sameDayMssales = useMemo(() => sameDayOfMssale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response), [GET_ALL_MS_SALE_SLICE_REDUCER])

  const previousDayHsdTankTwoSales = useMemo(() => previousDayOfHsdSaleTwo(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_TWO_SLICE_REDUCER])
  const sameDayTankTwoSales = useMemo(() => sameDayOfHsdSaleTwo(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_TWO_SLICE_REDUCER])

  const previousDayHsdTankOneSales = useMemo(() => previousDayOfHsdSaleOne(GET_ALL_HSD_ONE_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_ONE_SLICE_REDUCER])
  const sameDayTankOneSales = useMemo(() => sameDayOfHsdSaleOne(GET_ALL_HSD_ONE_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_ONE_SLICE_REDUCER])

  const datesWhereMsSaleIsNotAvailable = useMemo(() => allDatesBetweenTwoDatesOfMsSale(GET_ALL_MS_SALE_SLICE_REDUCER?.data?.response), [GET_ALL_MS_SALE_SLICE_REDUCER])
  const datesWhereHsdTankOneIsNotAvailable = useMemo(() => allDatesBetweenTwoDatesOfHsdTankOne(GET_ALL_HSD_ONE_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_ONE_SLICE_REDUCER])
  const datesWhereHsdTankTwoIsNotAvailable = useMemo(() => allDatesBetweenTwoDatesOfHsdTankTwo(GET_ALL_HSD_TWO_SLICE_REDUCER?.data?.response), [GET_ALL_HSD_TWO_SLICE_REDUCER])


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
        isAdmin={isAdmin}
        onMsSaleEditClick={onMsSaleEditClick}
        onMsSaleDeleteClick={onMsSaleDeleteClick}
      />,
      icon: <GiEnergyTank fontSize={18} />
    },
    {
      label: "HSD SALE 01",
      minWidth: 150,
      component: <HsdSaleOne

        key={"hsd_tank_one_sale_report"}
        hsdTankOneFieldsVar={{ hsdTankOneFields, setHsdTankOneFields }}
        allhsdTankOneReport={GET_ALL_HSD_ONE_SLICE_REDUCER}
        onHsdTankOneSubmit={onHsdTankOneSubmit}
        previousDayHsdTankOneSales={previousDayHsdTankOneSales}
        sameDayTankOneSales={sameDayTankOneSales}
        isAdmin={isAdmin}
        onHsdTankOneDeleteClick={onHsdTankOneDeleteClick}
        onHsdTankOneEditClick={onHsdTankOneEditClick}

      />,
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
        isAdmin={isAdmin}
        onHsdTankTwoDeleteClick={onHsdTankTwoDeleteClick}
        onHsdTankTwoEditClick={onHsdTankTwoEditClick}
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

        <Box sx={{ p: 2 }}></Box>

      </Box>


      <CustomDialog isFullWidth={true} maxWidth={"lg"} open={msSaleResponse?.dialog} onClose={() => { setMsSaleResponse((prev) => ({ ...prev, dialog: false })) }}>


        {
          ADD_MS_SALE_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"MS SALE"} onClose={() => { setMsSaleResponse((prev) => ({ ...prev, dialog: false })) }} />

              {datesWhereMsSaleIsNotAvailable?.length > 0 && <Box sx={{ p: 2 }}>
                <LeftDates datesArray={datesWhereMsSaleIsNotAvailable} />
              </Box>}

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
                {datesWhereMsSaleIsNotAvailable?.length > 0 && <Box sx={{ mr: 2 }}><CustomButton onClick={onMsSaleSubmitConfirm} title={"SUBMIT PREVIOUS DATES"} color={"error"} /></Box>}
                <CustomButton width={150} isDisabled={datesWhereMsSaleIsNotAvailable?.length > 0} onClick={onMsSaleSubmitConfirm} title={"SUBMIT"} color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>


      <CustomDialog isFullWidth={true} maxWidth={"lg"} open={hsdTankTwoResponse?.dialog} onClose={() => { setHsdTankTwoResponse((prev) => ({ ...prev, dialog: false })) }}>


        {
          ADD_HSD_TWO_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"HSD TANK 02"} onClose={() => { setHsdTankTwoResponse((prev) => ({ ...prev, dialog: false })) }} />
              {datesWhereHsdTankTwoIsNotAvailable?.length > 0 && <Box sx={{ p: 2 }}>
                <LeftDates datesArray={datesWhereHsdTankTwoIsNotAvailable} />
              </Box>}

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
                {datesWhereHsdTankTwoIsNotAvailable?.length > 0 && <Box sx={{ mr: 2 }}><CustomButton onClick={onMsSaleSubmitConfirm} title={"SUBMIT PREVIOUS DATES"} color={"error"} /></Box>}

                <CustomButton width={150} isDisabled={datesWhereHsdTankTwoIsNotAvailable?.length > 0} onClick={onHsdTankTwoSaleConfirm} title={"SUBMIT"} color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>


      <CustomDialog isFullWidth={true} maxWidth={"lg"} open={hsdTankOneResponse?.dialog} onClose={() => { setHsdTankOneResponse((prev) => ({ ...prev, dialog: false })) }}>


        {
          ADD_HSD_ONE_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"HSD TANK 01"} onClose={() => { setHsdTankOneResponse((prev) => ({ ...prev, dialog: false })) }} />
              {datesWhereHsdTankOneIsNotAvailable?.length > 0 && <Box sx={{ p: 2 }}>
                <LeftDates datesArray={datesWhereHsdTankOneIsNotAvailable} />
              </Box>}

              <Box sx={{ p: 2 }}>
                <Box sx={{ p: 1 }} >
                  <Typography color={"primary"} variant='v3' >Do you want to submit Hsd Tank 01 Sale reports for the day...</Typography>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Grid container>
                    {
                      Object.keys(hsdTankOneResponse?.hsdTankOneData)?.map((hsdOne) => {
                        return (
                          <Grid item xs={12} md={4}>
                            <Box sx={{ p: 1 }}>
                              <Chip size='small' sx={{ letterSpacing: 1.4, width: "100%" }} label={`${hsdOne?.toUpperCase()} : ${isDataAvailable(hsdTankOneResponse?.hsdTankOneData[hsdOne])}`}>
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
                {datesWhereHsdTankOneIsNotAvailable?.length > 0 && <Box sx={{ mr: 2 }}><CustomButton onClick={onMsSaleSubmitConfirm} title={"SUBMIT PREVIOUS DATES"} color={"error"} /></Box>}

                <CustomButton width={150} isDisabled={datesWhereHsdTankOneIsNotAvailable?.length > 0} onClick={onHsdTankOneSaleConfirm} title={"SUBMIT"} color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>

      <CustomDrawer anchor={"top"} open={msSaleEditResponse?.dialog} onClose={() => {
        setMsSaleFields({
          MsSaleDate: dayjs(), inwardOfMSSale: 0, dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: 0,
          density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
        })
        setMsSaleEditResponse((prev) => ({ ...prev, dialog: false, msSaleData: {}, msSalePreviousDate: {} }));

      }}>

        {

          UPDATE_MS_SALE_SLICE_REDUCER?.isLoading ? <Loading /> : <>
            <CustomDialogTitle title={"UPDATE MS SALE"} onClose={() => {
              setMsSaleFields({
                MsSaleDate: dayjs(), inwardOfMSSale: 0, dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: 0,
                density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: ""
              })
              setMsSaleEditResponse((prev) => ({ ...prev, dialog: false, msSaleData: {}, msSalePreviousDate: {} }));
            }} />
            <Box sx={{ p: 1.5 }}>
              <FuelReportsForm
                key={"ms_sale_update_form"}
                msSaleFieldsVar={{ msSaleFields, setMsSaleFields }}
                isUpdate={true}
                // title={"MS SALE"}
                previousDayMssales={msSaleEditResponse?.msSalePreviousDate}
                onSubmit={onMsSaleUpdateSubmit}
              />

            </Box>
          </>
        }


      </CustomDrawer>


      <CustomDialog isFullWidth={true} maxWidth={"sm"} open={msSaleDeleteResponse?.dialog} onClose={() => { setMsSaleDeleteResponse((prev) => ({ ...prev, dialog: false })) }}>
        {
          DELETE_MS_SALE_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"REMOVE MS SALE RECORD"} onClose={() => { setMsSaleDeleteResponse((prev) => ({ ...prev, dialog: false })) }} />
              <Box sx={{ p: 2 }}>
                <Box>
                  <Typography>Are you sure you wan to remove this record with Id <span> &nbsp; <Chip size='small' color='p1' label={msSaleDeleteResponse?.msSaleData?.msSaleId} /></span></Typography>
                </Box>
                <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
                  <CustomButton width={100} onClick={onMsSaleDeleteSubmit} title={"SUBMIT"} color={"error"} />

                </Box>

              </Box>

            </Box>
        }
      </CustomDialog>


      <CustomDrawer anchor={"top"} open={hsdTankOneEditResponse?.dialog} onClose={() => {
        setHsdTankOneEditResponse((prev) => ({ ...prev, dialog: false, hsdTankOneData: {}, hsdTankOnePreviousData: {} }));
        setHsdTankOneFields({
          HsdTankOneDate: dayjs(), inwardOfHsdTankOne: 0, dipStockOfHsdTankOneInLtrs: "", dipStockOfHsdTankOneInCentimeters: ""
          , testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankOneNozzleOne: "", closingMeterOfHsdTankOneNozzleTwo: "",
          closingMeterOfHsdTankOneNozzleThree: "", closingMeterOfHsdTankOneNozzleFour: ""
        })
      }}>

        {

          UPDATE_HSD_ONE_SLICE_REDUCER?.isLoading ? <Loading /> : <>
            <CustomDialogTitle title={"UPDATE HSD SALE TK-01"} onClose={() => {
              setHsdTankOneEditResponse((prev) => ({ ...prev, dialog: false, hsdTankOneData: {}, hsdTankOnePreviousData: {} }));
              setHsdTankOneFields({
                HsdTankOneDate: dayjs(), inwardOfHsdTankOne: 0, dipStockOfHsdTankOneInLtrs: "", dipStockOfHsdTankOneInCentimeters: ""
                , testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankOneNozzleOne: "", closingMeterOfHsdTankOneNozzleTwo: "",
                closingMeterOfHsdTankOneNozzleThree: "", closingMeterOfHsdTankOneNozzleFour: ""
              })
            }} />
            <Box sx={{ p: 1.5 }}>
              <HsdSaleTankOne
                hsdTankOneFieldsVar={{ hsdTankOneFields, setHsdTankOneFields }}
                onSubmit={onHsdTankOneUpdateSubmit}
                previousDayHsdTankOneSales={hsdTankOneEditResponse?.hsdTankOnePreviousData}
                isUpdate={true}
              />

            </Box>
          </>
        }


      </CustomDrawer>

      <CustomDialog isFullWidth={true} maxWidth={"sm"} open={hsdTankOneDeleteResponse?.dialog} onClose={() => { setHsdTankOneDeleteResponse((prev) => ({ ...prev, dialog: false })) }}>
        {
          DELETE_HSD_ONE_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"REMOVE HSD SALE TK-01"} onClose={() => { setHsdTankOneDeleteResponse((prev) => ({ ...prev, dialog: false })) }} />
              <Box sx={{ p: 2 }}>
                <Box>
                  <Typography>Are you sure you wan to remove this record with Id <span> &nbsp; <Chip size='small' color='p1' label={hsdTankOneDeleteResponse?.hsdTankOneData?.dieselTankOneId} /></span></Typography>
                </Box>
                <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
                  <CustomButton width={100} onClick={onHsdTankOneDeleteSubmit} title={"SUBMIT"} color={"error"} />

                </Box>

              </Box>

            </Box>
        }
      </CustomDialog>



      <CustomDrawer anchor={"top"} open={hsdTankTwoEditResponse?.dialog} onClose={() => {
        setHsdTankTwoEditResponse((prev) => ({ ...prev, dialog: false, hsdTankTwoData: {}, hsdTankTwoPreviousData: {} }));
        setHsdTankTwoFields({
          HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: 0, dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
          testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
        })
      }}>

        {

          UPDATE_HSD_TWO_SLICE_REDUCER?.isLoading ? <Loading /> : <>
            <CustomDialogTitle title={"UPDATE HSD SALE TK-02"} onClose={() => {
              setHsdTankTwoEditResponse((prev) => ({ ...prev, dialog: false, hsdTankTwoData: {}, hsdTankTwoPreviousData: {} }));
              setHsdTankTwoFields({
                HsdTankTwoDate: dayjs(), inwardOfHsdTankTwo: 0, dipStockOfHsdTankTwoInLtrs: "", dipStockOfHsdTankTwoInCentimeters: "",
                testing: 0, density: "", waterDip: "", remarks: "", closingMeterOfHsdTankTwoNozzleOne: "", closingMeterOfHsdTankTwoNozzleTwo: ""
              })
            }} />
            <Box sx={{ p: 1.5 }}>
              <HsdSaleTankTwo
                hsdTankTwoFieldsVar={{ hsdTankTwoFields, setHsdTankTwoFields }}
                previousDayHsdTankTwoSales={hsdTankTwoEditResponse?.hsdTankTwoPreviousData}
                onSubmit={onHsdTankTwoUpdateSubmit}
                isUpdate={true}
              />

            </Box>
          </>
        }


      </CustomDrawer>


      <CustomDialog isFullWidth={true} maxWidth={"sm"} open={hsdTankTwoDeleteResponse?.dialog} onClose={() => { setHsdTankTwoDeleteResponse((prev) => ({ ...prev, dialog: false })) }}>
        {
          DELETE_HSD_TWO_SLICE_REDUCER?.isLoading ? <Loading /> :
            <Box>
              <CustomDialogTitle title={"REMOVE HSD SALE TK-02"} onClose={() => { setHsdTankTwoDeleteResponse((prev) => ({ ...prev, dialog: false })) }} />
              <Box sx={{ p: 2 }}>
                <Box>
                  <Typography>Are you sure you wan to remove this record with Id <span> &nbsp; <Chip size='small' color='p1' label={hsdTankTwoDeleteResponse?.hsdTankTwoData?.dieselTankTwoId} /></span></Typography>
                </Box>
                <Box sx={{ ...GlobalStyles.alignmentStyles_2 }}>
                  <CustomButton width={100} onClick={onHsdTankTwoDeleteSubmit} title={"SUBMIT"} color={"error"} />

                </Box>

              </Box>

            </Box>
        }
      </CustomDialog>


      <CustomSnackbar open={msSaleResponse?.snackbar} onClose={() => { setMsSaleResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_MS_SALE_SLICE_REDUCER?.data?.statusMessage} severity={ADD_MS_SALE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={msSaleEditResponse?.snackbar} onClose={() => { setMsSaleEditResponse((prev) => { return { ...prev, snackbar: false } }) }} message={UPDATE_MS_SALE_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_MS_SALE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={msSaleDeleteResponse?.snackbar} onClose={() => { setMsSaleDeleteResponse((prev) => { return { ...prev, snackbar: false } }) }} message={DELETE_MS_SALE_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_MS_SALE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />

      <CustomSnackbar open={hsdTankOneResponse?.snackbar} onClose={() => { setHsdTankOneResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_HSD_ONE_SLICE_REDUCER?.data?.statusMessage} severity={ADD_HSD_ONE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={hsdTankOneEditResponse?.snackbar} onClose={() => { setHsdTankOneEditResponse((prev) => { return { ...prev, snackbar: false } }) }} message={UPDATE_HSD_ONE_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_HSD_ONE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={hsdTankOneDeleteResponse?.snackbar} onClose={() => { setHsdTankOneDeleteResponse((prev) => { return { ...prev, snackbar: false } }) }} message={DELETE_HSD_ONE_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_HSD_ONE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />



      <CustomSnackbar open={hsdTankTwoResponse?.snackbar} onClose={() => { setHsdTankTwoResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_HSD_TWO_SLICE_REDUCER?.data?.statusMessage} severity={ADD_HSD_TWO_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={hsdTankTwoEditResponse?.snackbar} onClose={() => { setHsdTankTwoEditResponse((prev) => { return { ...prev, snackbar: false } }) }} message={UPDATE_HSD_TWO_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_HSD_TWO_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
      <CustomSnackbar open={hsdTankTwoDeleteResponse?.snackbar} onClose={() => { setHsdTankTwoDeleteResponse((prev) => { return { ...prev, snackbar: false } }) }} message={DELETE_HSD_TWO_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_HSD_TWO_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />
    </Box>
  )
}

export default FuelReports