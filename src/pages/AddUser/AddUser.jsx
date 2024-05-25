import { Box, Card, Chip, Grid, MenuItem, Typography } from "@mui/material"
import FinoSignup from "../HomeComponent/FinoSignup"
import CustomTextField from "../../components/CustomTextField/CustomTextField"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { useTheme } from "@emotion/react"
import { FinoLabel } from "../../labels/FinoLabel"
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import CustomButton from "../../components/CustomButton/CustomButton";
import UnderLine from "../../components/UnderLine/UnderLine"
import CustomDropDown, { menuItemStyle } from "../../components/CustomDropDown/CustomDropDown"
import CustomTable from "../../components/CustomTable/CustomTable"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsersService } from "../../redux/slice/userslice/AllUserSlice"
import { useEffect, useMemo, useState } from "react"
import ProtectedInterceptors from "../../hooks/ProtectedInterceptors"
import { registerService } from "../../redux/slice/userslice/RegisterSlice"
import { dateFormater, dateToJavaUtilDate } from "../../utils/DateTimeFormatter"
import CustomSnackbar from "../../components/Customsnackbar/CustomSnackbar"
import Loading from "../../components/Loading/Loading"
import TableLoader from "../../components/CustomTable/TableHelpers/TableLoader"
import DynamicHead from "../../components/DynamicHead/DynamicHead"
import AuthHook from "../../hooks/AuthHook"

const AddUser = ({}) => {
 const theme = useTheme();
const dispatch=useDispatch()
const { jwtToken, userName, error, userRoles, fullName } = AuthHook()

const protectedInterceptors=ProtectedInterceptors()
const[userRegisterFields,setUserRegisterFields]=useState({"firstName":"","lastName":"","dateOfBirth":null,"password":"", "mobileNumber":"","emailId":"","userRole":"","confirmPassword":""})
const [registeredUserSnackBar,setRegisteredUserSnackBar]=useState({open:false,message:"",refresh:false,error:false})

const getAllUsers=()=>{dispatch(getAllUsersService(protectedInterceptors))}
const GET_ALL_USERS_SLICE_REDUCER=useSelector((state)=>state.GET_ALL_USERS_SLICE_REDUCER)
const REGISTER_SLICE_REDUCER=useSelector((state)=>state.REGISTER_SLICE_REDUCER)

useEffect(()=>{getAllUsers()},[registeredUserSnackBar?.refresh])
const usersDetails=useMemo(()=>{
return Array.isArray(GET_ALL_USERS_SLICE_REDUCER?.data?.response)? GET_ALL_USERS_SLICE_REDUCER?.data?.response?.map((item=>{
  return{...item,dateOfBirth:dateFormater(item?.dateOfBirth),userRoles:item?.userRoles?.map((k)=>{return <Box sx={{p:0.2}}><Chip variant="outlined" size="small" color="p2" label={k?.roleName}></Chip></Box>})}
})):[]
},[GET_ALL_USERS_SLICE_REDUCER])



const onUserRegister= async(e)=>{
  e.preventDefault()
  if(userRegisterFields.password===userRegisterFields.confirmPassword){

    let registerPayload=(register)=>{return{...register,dateOfBirth:dateToJavaUtilDate(register?.dateOfBirth)}};
  let { confirmPassword,...newRegisterPayload} =registerPayload(userRegisterFields)
  const {payload}=await dispatch(registerService({protectedInterceptors:protectedInterceptors,payload:newRegisterPayload}))
  if(payload?.statusCode===200){
    setUserRegisterFields({"firstName":"","lastName":"","dateOfBirth":null,"password":"", "mobileNumber":"","emailId":"","userRole":"","confirmPassword":""})
    setRegisteredUserSnackBar((prev)=>{return{...prev,open:true,message:payload?.statusMessage,refresh:!prev.refresh}})
  }
  else{
    setRegisteredUserSnackBar((prev)=>{return{...prev,open:true,message:payload?.statusMessage,error:true}})
  }
  }
  else{
    setRegisteredUserSnackBar((prev)=>{return{...prev,open:true,message:"Password and confirm password must be same",error:true}})

  }


}


  return (
  <>

<DynamicHead title={`${fullName?.toLocaleUpperCase()}'S USER'S REPORTS`}/>



{
  REGISTER_SLICE_REDUCER?.isLoading? <Card sx={{p:2,mr:1}}><Loading/></Card>:
  <Card sx={{p:2,mr:1}}>
      
  <Box sx={{ml:1,mb:1.5}}>
   <Typography variant="v5">
     {FinoLabel.registerAUser}
   </Typography>
   <UnderLine color={theme?.palette?.p1?.main} width={21}/>
   </Box>
 <form onSubmit={onUserRegister}>
<Grid container >
 <Grid item xs={12} md={3}>
   <Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
     <CustomTextField
     isRequired={true}
     value={userRegisterFields?.firstName}
     onChange={(e)=>{setUserRegisterFields({...userRegisterFields,firstName:e.target.value})}}
       label={FinoLabel.firstName}
       placeholder={FinoLabel.firstName}
       isFullwidth={true}
     />
   </Box>

 </Grid>
 <Grid item xs={12} md={3}>
 <Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
     <CustomTextField
      isRequired={true}
      value={userRegisterFields?.lastName}
      onChange={(e)=>{setUserRegisterFields({...userRegisterFields,lastName:e.target.value})}}
       label={FinoLabel.surname}
       placeholder={FinoLabel.surname}
       isFullwidth={true}
     />
   </Box>
   </Grid>

   <Grid item xs={12} md={3}>
   <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
   <CustomDatePicker isFullWidth={true} label={FinoLabel.dateOfBirth}
    isRequired={true}
    value={userRegisterFields?.dateOfBirth}
    onChange={(value)=>{setUserRegisterFields({...userRegisterFields,dateOfBirth:value})}}
   />
 </Box>
   </Grid>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
   <CustomTextField
    isRequired={true}
    value={userRegisterFields?.mobileNumber}
    onChange={(e)=>{setUserRegisterFields({...userRegisterFields,mobileNumber:e.target.value})}}
     label={FinoLabel.mobileNumber}
     placeholder={FinoLabel.mobileNumber}
     isFullwidth={true}
   />
 </Box>
   </Grid>
</Grid>

<Grid container>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
   <CustomTextField
    isRequired={true}
    value={userRegisterFields?.emailId}
    onChange={(e)=>{setUserRegisterFields({...userRegisterFields,emailId:e.target.value})}}
     label={FinoLabel.emailID}
     placeholder={FinoLabel.emailID}
     isFullwidth={true}
   />
 </Box>
</Grid>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
  <CustomDropDown isFullwidth={true}
   isRequired={true}
   value={userRegisterFields?.userRole}
   onChange={(e)=>{setUserRegisterFields({...userRegisterFields,userRole:e.target.value})}}
  label={FinoLabel.userRole}
  placeholder={FinoLabel.userRole}
  children={FinoLabel.finoUserRoles?.map((item)=>{
   return(<MenuItem sx={menuItemStyle} key={item} value={item} id={item}>{item}</MenuItem>)
  })}
  />
 </Box>

</Grid>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
   <CustomTextField
    isRequired={true}
    value={userRegisterFields?.password}
    onChange={(e)=>{setUserRegisterFields({...userRegisterFields,password:e.target.value})}}
     label={FinoLabel.password}
     placeholder={FinoLabel.password}
     isFullwidth={true}
   />
 </Box>
</Grid>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
   <CustomTextField
     label={FinoLabel.confirmPassword}
     placeholder={FinoLabel.confirmPassword}
     isRequired={true}
     value={userRegisterFields?.confirmPassword}
     onChange={(e)=>{setUserRegisterFields({...userRegisterFields,confirmPassword:e.target.value})}}
      isFullwidth={true}
      helpertext={userRegisterFields.password!==userRegisterFields.confirmPassword ?<Typography color={"error"} variant="v2" sx={{fontSize:11}}>Password and confirm password must be same</Typography>:""}
   />
 </Box>
</Grid>

</Grid>
<Box sx={{ p: 1, ...GlobalStyles.alignmentStyles_2 }}>
   <CustomButton
     endIcon={<FaArrowUpRightFromSquare />}
     color={"primary"}
     // variant={"outlined"}
     title={FinoLabel.registerAUser}
   />
 </Box>
 </form>         
</Card>
}

   

    <Card sx={{ mt: 2, mr: 1, mb:5,p:1.5}}>
      {
        GET_ALL_USERS_SLICE_REDUCER?.isLoading?<TableLoader/>:
        <CustomTable
          TableName={"USER DETAILS"}
          headCells={FinoLabel.userDetailsTableHead}
          rows={usersDetails}
          isActionRequired={true}
        />
      }
        
      </Card>


<CustomSnackbar open={registeredUserSnackBar?.open} onClose={()=>{setRegisteredUserSnackBar((prev)=>{return{...prev,open:false,message:"",error:false,refresh:false}})}} message={registeredUserSnackBar?.message} severity={registeredUserSnackBar.error?"error":"success"} />



    </>   
  )
}

export default AddUser
