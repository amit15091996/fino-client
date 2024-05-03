import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { SiContactlesspayment } from "react-icons/si";
import { useTheme } from '@emotion/react';
import lock from "../../assets/lock.jpg"



const TopNavbar = () => {

  const theme=useTheme()
  return (
    <Card elevation={1} sx={{height:"8dvh",display:"flex",borderRadius:0,width:"100%",borderBottom:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
        
         <Box sx={{height:"100%",width:"50%",display:"flex",justifyContent:"flex-start",alignItems:"center",ml:2}}>
          <SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
          <Typography color={"secondary"} variant='v1'>FINO</Typography>
         </Box>

     <Box sx={{height:"100%",width:"50%",display:"flex",justifyContent:"flex-end",alignItems:"center",mr:1}}>
    <Avatar  sx={{":hover":{cursor:"pointer",transform:"scale(1.3)"}}}>F</Avatar>
    </Box>

    </Card>
  )
}

export default TopNavbar