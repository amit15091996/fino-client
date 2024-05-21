import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { SiContactlesspayment } from "react-icons/si";
import { useTheme } from '@emotion/react';
import lock from "../../assets/lock.jpg"
import { useNavigate } from 'react-router-dom';



const TopNavbar = () => {

  const theme=useTheme()
  const navigate = useNavigate();




  return (
    <Card  sx={{height:"8dvh",display:"flex",borderRadius:0,width:"100%",borderBottom:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
        
         <Box onClick={()=>{navigate("/")}} sx={{cursor:"pointer",height:"100%",width:"50%",display:"flex",justifyContent:"flex-start",alignItems:"center",ml:2}}>
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