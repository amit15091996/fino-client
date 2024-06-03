import { Box } from '@mui/material'
import React, { useState } from 'react'
import DynamicHead from '../../components/DynamicHead/DynamicHead'
import AuthHook from '../../hooks/AuthHook'
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { GiEnergyTank } from "react-icons/gi";
import { GiFuelTank } from "react-icons/gi";
import { GiScubaTanks } from "react-icons/gi";
import MsSale from './MsSale/MsSale'
import HsdSaleOne from './HsdSale01/HsdSaleOne'
import HsdSaleTwo from './HsdSale2/HsdSaleTwo'

const FuelReports = () => {
  const{jwtToken,userName,error,userRoles,fullName}=AuthHook()
  const[fuelTabValue,setFuelTabValue]=useState(0)
  const onFuelTabChange=(e,value)=>{setFuelTabValue(value)}


  const fuelTabs=[
    {
    label:"MS SALE 01",
    minWidth:140,
    component:<><MsSale/></> ,
    icon:<GiEnergyTank fontSize={18}/>
  },
    {
      label:"HSD SALE 01",
      minWidth:150,
      component:<><HsdSaleOne/></>,
      icon:<GiFuelTank fontSize={18}/>
    },
    {
      label:"HSD SALE 02",
      minWidth:150,
      component:<><HsdSaleTwo/></>,
      icon:<GiScubaTanks fontSize={18}/>
    },
  
  ]
  



  return (
    <Box>
<Box>

<DynamicHead title={`${fullName?.toLocaleUpperCase()}'S FUEL REPORTS`}/>


    <Box sx={{mt:2}}>
        <CustomTabs tabDetails={fuelTabs} value={fuelTabValue} onChange={onFuelTabChange} cardPosition={{display:"flex",justifyContent:"flex-start"}} tabPosition={{justifyContent:"flex-start"}} />

      </Box>
 
</Box>

    </Box>
  )
}

export default FuelReports