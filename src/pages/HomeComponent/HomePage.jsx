import { Box, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import homepage from "../../assets/homepage.png"
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import CustomButton from '../../components/CustomButton/CustomButton'
import { SiContactlesspayment } from "react-icons/si";
import { IoMdLogIn } from "react-icons/io";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer'
import FinoLogin from './FinoLogin'
import CustomDialog from '../../components/CustomDialog/CustomDialog'
import DynamicHead from "../../components/DynamicHead/DynamicHead"
import { FinoLabel } from '../../labels/FinoLabel'

const HomePage = ({}) => {
const theme=useTheme()

const [loginDialog,setLoginDialog]=useState(false)
const onLoginButtonClick=()=>{
    setLoginDialog(true)
}



  return (
    <Box sx={{height:"100%", width:"100%",overflow:"auto",
    background:`linear-gradient(90deg, rgba(2,0,36,1), rgba(7,87,022,0.7529061624649859)),url(${homepage}) no-repeat `,
    backgroundSize:"100% 100%",
    backgroundRepeat:"no-repeat"
    
    }}>

<DynamicHead
        title={FinoLabel.homePage}
        key={FinoLabel.homePage}
      />

{/* borderBottom:`1px solid ${theme?.palette?.p3?.main} ` */}


    <Box sx={{height:"8dvh",width:"100%",display:"flex",justifyContent:"space-between"}}>
   
   
        <Box sx={{display:"flex",mt:0.5,ml:1}}>
          <SiContactlesspayment fontSize={30} color={theme?.palette?.p3?.main} />
          <Box sx={{ml:1,mt:0.4}}>
          <Typography color={theme?.palette?.p3?.main} variant='v1'>FINO</Typography>
          </Box>
         </Box>
       
<Box  sx={{display:"flex"}}>
<Box sx={{mt:0.5,mr:2}}>
<CustomButton onClick={onLoginButtonClick} startIcon={<IoMdLogIn/>} variant={"outlined"}  color={"p3"} title={"Login"}/>
</Box>

<Box sx={{mt:0.5,mr:1}}>
<CustomButton startIcon={<FaArrowUpRightFromSquare/>} variant={"outlined"}  color={"p3"} title={"signup"}/>
</Box>
       </Box>


    </Box>  


     

<CustomDialog open={loginDialog} anchor={"bottom"}  onClose={()=>{setLoginDialog(false)}}>
    <FinoLogin/>
</CustomDialog>



    </Box>
  )
}

export default HomePage