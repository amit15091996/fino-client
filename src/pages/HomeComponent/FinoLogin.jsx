import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'
import DynamicHead from '../../components/DynamicHead/DynamicHead'
import { FinoLabel } from '../../labels/FinoLabel'
import loginImage from "../../assets/loginImage.jpg"
import { GlobalStyles } from '../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigate } from 'react-router-dom'


const FinoLogin = ({}) => {

const theme=useTheme()
const navigate=useNavigate()

const onLogin=(e)=>{
  e.preventDefault()
  navigate("/Layout/Dashboard")

}



  return (
    <Box sx={{height:"100%",width:"100%"}}>
      <DynamicHead title={FinoLabel.loginPageTitle} key={FinoLabel.loginPageTitle} />
     
    
      <Box sx={{height:"100%",width:"100%",...GlobalStyles.alignmentStyles}}>  
      <Card  sx={{height:420,width:350,border:`1px solid ${theme?.palette?.p1?.main}`}}>
      <form onSubmit={onLogin}>
       <Box sx={{bgcolor:theme?.palette?.p1?.main}}>
       <Box  sx={{...GlobalStyles.alignmentStyles}}>
        <Avatar  sx={{ mt:0.5,width: 50, height: 50,objectFit:"fill"}} alt='L' src={loginImage} />
       </Box>
       <Box sx={{...GlobalStyles.alignmentStyles}}>
       <Typography color="#FFF"  variant='v1'>{FinoLabel.loginPageTitle}</Typography>
       </Box>
       <Box sx={{...GlobalStyles.alignmentStyles}}>
       <Typography  color="#FFF" variant='v2'>{FinoLabel.loginPageTitle_1}</Typography>
       </Box>
       </Box>
      
       <Box sx={{p:1,mt:3,...GlobalStyles.alignmentStyles}}>
        <CustomTextField label={FinoLabel.userName} placeholder={FinoLabel.userName}  endIcon={<FaUserCircle color={theme?.palette?.primary?.main} fontSize={20}/>}   isFullwidth={true}/>
       </Box>

       <Box sx={{p:1,mt:2,...GlobalStyles.alignmentStyles}}>
        <CustomTextField type={"password"} label={FinoLabel.password} placeholder={FinoLabel.password}  endIcon={<TbPasswordFingerprint color={theme?.palette?.primary?.main} fontSize={20}/>}   isFullwidth={true}/>
       </Box>

       <Box sx={{cursor:"pointer",...GlobalStyles.alignmentStyles_2,mr:1}}>
       <Typography color="primary" variant='v2'>{FinoLabel.forgotPassword}</Typography>
       </Box>

       <Box sx={{p:1,mt:1,...GlobalStyles.alignmentStyles}}>
        <CustomButton color={"p1"} isFullwidth={true} title={FinoLabel.loginPageTitle}/>
       </Box>
       </form>

       <Box sx={{mt:3,...GlobalStyles.alignmentStyles}}>
       <Typography color="error" variant='v2'>{FinoLabel.dontHaveAnAccount}</Typography>
       </Box>
       <Box sx={{p:1,...GlobalStyles.alignmentStyles}}>
        <Box sx={{width:"60%"}}>
        <CustomButton  color={"success"} isFullwidth={true} title={FinoLabel.createAnAccount}/>
        </Box>
       </Box>
      </Card>
      </Box>
      

    </Box>
  )
}

export default FinoLogin