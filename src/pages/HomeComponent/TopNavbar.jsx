import { Avatar, Box, Card } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'

const TopNavbar = () => {

  return (
    <Card elevation={1} sx={{height:"8dvh",borderRadius:0,width:"100%",borderBottom:`1px solid ${GlobalStyles.sideTopNavborderColor}`}}>
     <Box sx={{height:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center",mr:1}}>
    <Avatar sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(7,87,222,0.9529061624649859) 100%, rgba(0,212,255,1) 100%)",":hover":{cursor:"pointer",transform:"scale(1.3)"}}}>P</Avatar>
    </Box>

    </Card>
  )
}

export default TopNavbar