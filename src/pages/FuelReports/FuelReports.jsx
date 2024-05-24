import { Box } from '@mui/material'
import React from 'react'
import FuelReportsForm from './FuelReportsForm'
import DynamicHead from '../../components/DynamicHead/DynamicHead'
import AuthHook from '../../hooks/AuthHook'

const FuelReports = () => {

  const{jwtToken,userName,error,userRoles,fullName}=AuthHook()



  return (
    <Box>
<Box sx={{mt:1}}>

<DynamicHead title={`${fullName?.toLocaleUpperCase()}'S FUEL REPORTS`}/>


  <FuelReportsForm title={"MS SALE"}/>

</Box>

    </Box>
  )
}

export default FuelReports