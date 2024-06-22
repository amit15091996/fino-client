import { Box, Chip, DialogTitle, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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




const FuelReports = () => {
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { isAdmin, isClient, isManager, isUser } = HasAuthority()

  const [fuelTabValue, setFuelTabValue] = useState(0)
  const onFuelTabChange = (e, value) => { setFuelTabValue(value) }

  const [msSaleFields, setMsSaleFields] = useState({
    MsSaleDate: dayjs(), inwardOfMSSale: "", dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: "",
    density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: "", openingStockOfMSSale: "",
    openingMeterOfMSSaleNozzleOne: "", openingMeterOfMSSaleNozzleTwo: ""
  })
  const [msSaleResponse, setMsSaleResponse] = useState({ response: {}, snackbar: false, refresh: false, dialog: false, msSaleData: {} })

  const getAllMsSaleReports = () => { dispatch(getAllMsSaleReportService(protectedInterceptors)) }


  const GET_ALL_MS_SALE_SLICE_REDUCER = useSelector((state) => state.GET_ALL_MS_SALE_SLICE_REDUCER)
  const ADD_MS_SALE_SLICE_REDUCER = useSelector((state) => state.ADD_MS_SALE_SLICE_REDUCER)
  const DELETE_MS_SALE_SLICE_REDUCER = useSelector((state) => state.DELETE_MS_SALE_SLICE_REDUCER)

  useEffect(() => { getAllMsSaleReports() }, [msSaleResponse?.refresh])

  const onMsSaleSubmit = (e) => {
    e.preventDefault();
    let { openingStockOfMSSale, openingMeterOfMSSaleNozzleTwo, openingMeterOfMSSaleNozzleOne, ...insertedData } = msSaleFields
    setMsSaleResponse((prev) => ({ ...prev, dialog: true, msSaleData: insertedData }))}


const onMsSaleSubmitConfirm=async(e)=>{
  e.preventDefault();
  const msSalePayload=(payload)=>({...payload,MsSaleDate:dateToJavaUtilDate(payload?.MsSaleDate)})
  let { openingStockOfMSSale, openingMeterOfMSSaleNozzleTwo, openingMeterOfMSSaleNozzleOne, ...insertedData } = msSaleFields

  const { payload } = await dispatch(addMsSaleReportService({ protectedInterceptors: protectedInterceptors,payload: msSalePayload(insertedData) }))
    if (payload?.statusCode === 200) {
      setMsSaleResponse((prev) => ({ ...prev, refresh: !prev?.refresh, snackbar: true,dialog:false,msSaleData:{},response:{} }))
      setMsSaleFields((prev)=>(
        {...prev,
          MsSaleDate:prev?.MsSaleDate, inwardOfMSSale: "", dipStockOfMSSaleInLtrs: "", dipStockOfMSSaleInCentimeters: "", testing: "",
          density: "", waterDip: "", remarks: "", closingMeterOfMSSaleNozzleOne: "", closingMeterOfMSSaleNozzleTwo: "", openingStockOfMSSale:prev?.openingStockOfMSSale,
          openingMeterOfMSSaleNozzleOne:prev?.openingMeterOfMSSaleNozzleOne, openingMeterOfMSSaleNozzleTwo:prev?.openingMeterOfMSSaleNozzleTwo
        }
      ))
    }
    else {
      setMsSaleResponse((prev) => ({ ...prev, snackbar: true,dialog:false }))
    }  
}






  const fuelTabs = [
    {
      label: "MS SALE 01",
      minWidth: 140,
      component: <MsSale
        key={"ms_sale_reports"}
        msSaleFieldsVar={{ msSaleFields, setMsSaleFields }}
        getAllmsSaleReport={GET_ALL_MS_SALE_SLICE_REDUCER}
        onMsSaleSubmit={onMsSaleSubmit}

      />,
      icon: <GiEnergyTank fontSize={18} />
    },
    {
      label: "HSD SALE 01",
      minWidth: 150,
      component: <><HsdSaleOne /></>,
      icon: <GiFuelTank fontSize={18} />
    },
    {
      label: "HSD SALE 02",
      minWidth: 150,
      component: <><HsdSaleTwo /></>,
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
              <Box sx={{p:1}} >
                  <Typography color={"primary"} variant='v3' >Do you want to submit MS Sale reports for the day...</Typography>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Grid container>
                    {
                      Object.keys(msSaleResponse.msSaleData)?.map((msKey) => {
                        return (
                          <Grid item xs={12} md={4}>
                            <Box sx={{ p: 1 }}>
                              <Chip  size='small' sx={{ letterSpacing: 1.4,width:"100%" }} label={`${msKey.toUpperCase()} : ${isDataAvailable(msSaleResponse?.msSaleData[msKey])}`}>
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
                <CustomButton width={150} onClick={onMsSaleSubmitConfirm} title={"SUBMIT"}  color={"p1"} />
              </Box>

            </Box>
        }
      </CustomDialog>

      <CustomSnackbar open={msSaleResponse?.snackbar} onClose={() => { setMsSaleResponse((prev) => { return { ...prev, snackbar: false } }) }} message={ADD_MS_SALE_SLICE_REDUCER?.data?.statusMessage} severity={ADD_MS_SALE_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />

    </Box>
  )
}

export default FuelReports