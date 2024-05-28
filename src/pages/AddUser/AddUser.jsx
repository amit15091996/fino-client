import { Box, Card, Chip, Divider, Grid, IconButton, MenuItem, Typography } from "@mui/material"
import FinoSignup from "../HomeComponent/FinoSignup"
import CustomTextField from "../../components/CustomTextField/CustomTextField"
import { GlobalStyles } from "../../styles/GlobalStyles"
import { useTheme } from "@emotion/react"
import { FinoLabel } from "../../labels/FinoLabel"
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import { FaArrowUpRightFromSquare, FaForwardFast, FaUpDownLeftRight } from "react-icons/fa6";
import CustomButton from "../../components/CustomButton/CustomButton";
import UnderLine from "../../components/UnderLine/UnderLine"
import CustomDropDown, { menuItemStyle } from "../../components/CustomDropDown/CustomDropDown"
import CustomTable from "../../components/CustomTable/CustomTable"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsersService } from "../../redux/slice/userslice/AllUserSlice"
import { useEffect, useMemo, useState } from "react"
import ProtectedInterceptors from "../../hooks/ProtectedInterceptors"
import { registerService } from "../../redux/slice/userslice/RegisterSlice"
import { dateFormater, dateToJavaUtilDate, stringToDateConverter } from "../../utils/DateTimeFormatter"
import CustomSnackbar from "../../components/Customsnackbar/CustomSnackbar"
import Loading from "../../components/Loading/Loading"
import TableLoader from "../../components/CustomTable/TableHelpers/TableLoader"
import DynamicHead from "../../components/DynamicHead/DynamicHead"
import AuthHook from "../../hooks/AuthHook"
import HasAuthority from "../../hooks/HasAuthority"
import CustomDialog from "../../components/CustomDialog/CustomDialog"
import CustomTooltips from "../../components/CustomTooltips/CustomTooltips"
import { IoClose } from "react-icons/io5";
import { FcDeleteDatabase, FcDeleteRow } from "react-icons/fc"
import { disableUserService } from "../../redux/slice/userslice/DisableUserSlice"
import { GrUpdate } from "react-icons/gr"
import CustomDrawer from "../../components/CustomDrawer/CustomDrawer"
import { IsArray } from "../../utils/IsArray"
import { MdDeleteForever } from "react-icons/md"
import { deleteAnRoleService } from "../../redux/slice/userslice/DeleteAnRole"
import { assignAnRoleService } from "../../redux/slice/userslice/AssignAnRoleSlice"
import { updateUserService } from "../../redux/slice/userslice/UpdateUserSlice"




const AddUser = ({}) => {
 const theme = useTheme();
const dispatch=useDispatch()
const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
const { isAdmin, isClient, isManager, isUser } = HasAuthority()



const protectedInterceptors=ProtectedInterceptors()
const[userRegisterFields,setUserRegisterFields]=useState({"firstName":"","lastName":"","dateOfBirth":null,"password":"", "mobileNumber":"","emailId":"","userRole":"","confirmPassword":""})
const [registeredUserSnackBar,setRegisteredUserSnackBar]=useState({open:false,message:"",refresh:false,error:false})
const[userDeleteOperation,setUserDeleteOperation]=useState({dialog:false,snackbar:false,row:{}})
const[userUpdateOperation,setUserUpdateOperation]=useState({dialog:false,snackbar:false,row:{},firstName:"",lastName:"",dateOfBirth:null,emailId:"",refresh:false})
const[assignNewRole,setAssignNewRole]=useState({snackbar:false,role:"",refresh:false})
const[deleteRole,setDeleteRole]=useState({dialog:false,snack:false,row:{},message:"",refresh:false})

const getAllUsers=()=>{dispatch(getAllUsersService(protectedInterceptors))}
const GET_ALL_USERS_SLICE_REDUCER=useSelector((state)=>state?.GET_ALL_USERS_SLICE_REDUCER)
const REGISTER_SLICE_REDUCER=useSelector((state)=>state?.REGISTER_SLICE_REDUCER)
const DISABLE_USER_SLICE_REDUCER=useSelector((state)=>state?.DISABLE_USER_SLICE_REDUCER)
const UPDATE_USER_SLICE_REDUCER=useSelector((state)=>state?.UPDATE_USER_SLICE_REDUCER)
const ASSIGN_ROLE_SLICE_REDUCER=useSelector((state)=>state?.ASSIGN_ROLE_SLICE_REDUCER)
const DELETE_ROLE_SLICE_REDUCER=useSelector((state)=>state?.DELETE_ROLE_SLICE_REDUCER)



useEffect(()=>{getAllUsers()},[registeredUserSnackBar?.refresh,DISABLE_USER_SLICE_REDUCER,deleteRole?.refresh,assignNewRole?.refresh,userUpdateOperation?.refresh])

const removeRole=(k)=>{setDeleteRole((prev)=>{return{...prev,dialog:true,row:k}})}

const onRoleDeleteConfirm= async(e)=>{
  
  const {payload}=await dispatch(deleteAnRoleService({protectedInterceptors:protectedInterceptors,roleId:deleteRole?.row?.finoUserRolesId}))
  if(payload?.statusCode===200){
    setDeleteRole((prev)=>{return{...prev,dialog:false,message:payload?.statusMessage,snack:true,refresh:!prev.refresh}})
  }
  else{
    setDeleteRole((prev)=>{return{...prev,message:payload?.statusMessage,snack:true}})
  }

}

const onANewRoleAdd= async( e)=>{
e.preventDefault()
const {payload}=await dispatch(assignAnRoleService({protectedInterceptors:protectedInterceptors,userRole:assignNewRole?.role,mobileNumber:userUpdateOperation?.row?.mobileNumber}))
  if(payload?.statusCode===200){
    setAssignNewRole((prev)=>{return{...prev,snackbar:true,refresh:!prev.refresh}})
  }
  else{
    setAssignNewRole((prev)=>{return{...prev,snackbar:true}})
  }

}


const usersDetails=useMemo(()=>{
return Array.isArray(GET_ALL_USERS_SLICE_REDUCER?.data?.response)? GET_ALL_USERS_SLICE_REDUCER?.data?.response?.map((item=>{
  return{...item,dateOfBirth:dateFormater(item?.dateOfBirth),userRoles:item?.userRoles?.map((k)=>{return <Box sx={{p:0.2}}><Chip variant="outlined" size="small" color="p2" clickable onDelete={()=>removeRole(k)} label={k?.roleName}></Chip></Box>})}
})):[]
},[GET_ALL_USERS_SLICE_REDUCER,DELETE_ROLE_SLICE_REDUCER])

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

const onUserDelete=(row)=>{setUserDeleteOperation((prev)=>{return{...prev,dialog:true,row:row}})}
const onUserEditClick=(row)=>{setUserUpdateOperation((prev)=>{return{dialog:true,dateOfBirth:stringToDateConverter(row?.dateOfBirth),emailId:row?.emailId,firstName:row?.userName?.split(" ")[0],lastName:row?.userName?.split(" ")[1],row:row}})}
const onUserDeleteConfirmation=async(e)=>{
e.preventDefault()
const{payload}=await dispatch(disableUserService({protectedInterceptors:protectedInterceptors,mobileNumber:userDeleteOperation?.row?.mobileNumber}))
if(payload?.statusCode===200){setUserDeleteOperation((prev)=>{return{...prev,dialog:false,row:{},snackbar:true}})}
else{ setUserDeleteOperation((prev)=>{return{...prev,snackbar:true}})}}

const onUserUpdateConfirmation=async(e)=>{
  e.preventDefault();
  let updateUserData=userUpdateOperation
  let{row,snackbar,dialog,refresh,...newUser}=updateUserData
  const updateUserPayload=(user)=>({...user,dateOfBirth:dateToJavaUtilDate(user?.dateOfBirth)})
  
const {payload}=await dispatch(updateUserService({protectedInterceptors:protectedInterceptors,mobileNumber:userUpdateOperation?.row?.mobileNumber,payload:updateUserPayload(newUser)}))
 if(payload?.statusCode===200){
setUserUpdateOperation((prev)=>({...prev,refresh:!prev?.refresh,snackbar:true}))
 }
 else{
   setUserUpdateOperation((prev)=>({...prev,snackbar:true}))
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
          isActionRequired={isAdmin}
          onDeleteClick={onUserDelete}
          onEditClick={onUserEditClick}
        />
      }
        
      </Card>


      <CustomDialog open={userDeleteOperation?.dialog} onClose={() => setUserDeleteOperation((prev)=>{return{...prev,dialog:false}})}>
       
       {
        DISABLE_USER_SLICE_REDUCER?.isLoading?<Loading/>:
        <Box sx={{ p: 1 }}>
        <Box sx={{ ...GlobalStyles.alignmentStyles_2 }} ><CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() =>setUserDeleteOperation((prev)=>{return{...prev,dialog:false}})} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
          <IoClose /></IconButton> </CustomTooltips></Box>

        <Box sx={{ p: 2, flexWrap: "wrap" }}>
          <Typography color={"info"} variant='v2' >Do you really wish to Remove this user <span><Chip size="small" variant="outlined" color="p1" label={`${userDeleteOperation?.row?.userName}-${userDeleteOperation?.row?.mobileNumber}`} /></span> from our system......?</Typography>
        </Box>
        <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
          <CustomButton title={"DELETE"} onClick={onUserDeleteConfirmation} variant={"outlined"} color={"p1"} endIcon={<FcDeleteRow/>} />
        </Box>

      </Box>
       }
       
      
      </CustomDialog>


      <CustomDrawer anchor={"right"} open={userUpdateOperation?.dialog} onClose={() => setUserUpdateOperation((prev)=>{return{...prev,dialog:false}})}>
       
      <Box sx={{ p: 1}}>
          <Box sx={{ ...GlobalStyles.alignmentStyles_2}} >
            <CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() =>setUserUpdateOperation((prev)=>{return{...prev,dialog:false}})} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
            <IoClose /></IconButton>
             </CustomTooltips>
             </Box>


             {
    UPDATE_USER_SLICE_REDUCER?.isLoading?<Loading/>:<Box sx={{border: `1px solid ${GlobalStyles.sideTopNavborderColor}`, m: 1.5, borderRadius: 1.5, p:1}}>
    <Box sx={{ ...GlobalStyles.alignmentStyles, border: `1px solid ${theme?.palette?.p1?.main}`, m: 1, borderRadius: 1.5, p: 0.3, boxShadow: ` -3px -3px 1px ${theme?.palette?.p1?.main}` }}>
        <Typography color={theme?.palette?.p1?.main} variant="v3">
        UPDATE USER 
        </Typography>
    </Box>
 <Box sx={{ maxWidth: 370,height:"100%",display:"flex",alignItems:"center",p:1.5}} >
    <form  onSubmit={onUserUpdateConfirmation}>
   <Box sx={{mt:0.6,...GlobalStyles.alignmentStyles}}>
   <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
    <CustomTextField
        label={FinoLabel.firstName}
        placeholder={FinoLabel.firstName}
        isFullwidth={true}
        isRequired={true}
        value={userUpdateOperation?.firstName}
        onChange={(e)=>{setUserUpdateOperation({...userUpdateOperation,firstName:e.target.value})}}
      />
    </Box>
    
    <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
    <CustomTextField
        label={FinoLabel.surname}
        placeholder={FinoLabel.surname}
        isFullwidth={true}
        isRequired={true}
        value={userUpdateOperation?.lastName}
        onChange={(e)=>{setUserUpdateOperation({...userUpdateOperation,lastName:e.target.value})}}
      />
    </Box>
   </Box>

    <Box sx={{ p: 1, mt:0.6, ...GlobalStyles.alignmentStyles }}>
   <CustomDatePicker isFullWidth={true} label={FinoLabel.dateOfBirth}
    isRequired={true}
    value={userUpdateOperation?.dateOfBirth}
    onChange={(value)=>{setUserUpdateOperation({...userUpdateOperation,dateOfBirth:value})}}
   />
   </Box>

    <Box sx={{ p: 1, mt:0.6, ...GlobalStyles.alignmentStyles }}>
    <CustomTextField
        label={FinoLabel.emailID}
        placeholder={FinoLabel.emailID}
        isFullwidth={true}
        isRequired={true}
        value={userUpdateOperation?.emailId}
        onChange={(e)=>{setUserUpdateOperation({...userUpdateOperation,emailId:e.target.value})}}
       
      />
    </Box>
    <Box sx={{p:1,mt:0.6,...GlobalStyles.alignmentStyles_2}}>
    <CustomButton title={"UPDATE"} variant={"outlined"} color={"p1"} endIcon={<GrUpdate/>} />
    </Box>
    </form>

   </Box> 
    </Box>
  }


<Box sx={{mt:9}}>
{
    ASSIGN_ROLE_SLICE_REDUCER?.isLoading?<Loading/>:<Box sx={{border: `1px solid ${GlobalStyles.sideTopNavborderColor}`, m: 1.5, borderRadius: 1.5, p:1}}>
    <Box sx={{ ...GlobalStyles.alignmentStyles, border: `1px solid ${theme?.palette?.p1?.main}`, m: 1, borderRadius: 1.5, p: 0.3, boxShadow: ` -3px -3px 1px ${theme?.palette?.p1?.main}` }}>
        <Typography color={theme?.palette?.p1?.main} variant="v3">
        ASSIGN ROLE 
        </Typography>
    </Box>

 <form onSubmit={onANewRoleAdd}>   
    <Box sx={{width:"100%",...GlobalStyles.alignmentStyles}}>
    <Box sx={{width:"50%", p: 1,...GlobalStyles.alignmentStyles }}>
    <CustomTextField
      
        isFullwidth={true}
       isDisabled={true}
       value={userUpdateOperation?.row?.mobileNumber}
      />
</Box>

    <Box sx={{width:"50%", p: 1,...GlobalStyles.alignmentStyles }}>
  <CustomDropDown isFullwidth={true}
   isRequired={true}
   value={assignNewRole?.role}
   onChange={(e)=>{setAssignNewRole({...assignNewRole,role:e.target.value})}}
  label={FinoLabel.userRole}
  placeholder={FinoLabel.userRole}
  children={FinoLabel.finoUserRoles?.map((item)=>{
   return(<MenuItem sx={menuItemStyle} key={item} value={item} id={item}>{item}</MenuItem>)
  })}
  />
 </Box>
      </Box>

      <Box sx={{p:1,mt:0.6,...GlobalStyles.alignmentStyles_2}}>
    <CustomButton title={"ASSIGN"} variant={"outlined"} color={"p1"} endIcon={<FaForwardFast/>} />
    </Box>    
      </form>    
    
    </Box>
}  
</Box>




          </Box>   
      </CustomDrawer>


      <CustomDialog open={deleteRole?.dialog} onClose={() => setDeleteRole((prev)=>{return{...prev,dialog:false}})}>
       
       {
        DELETE_ROLE_SLICE_REDUCER?.isLoading?<Loading/>:
        <Box sx={{ p: 1 }}>
        <Box sx={{ ...GlobalStyles.alignmentStyles_2 }} ><CustomTooltips title={"CLOSE"}> <IconButton aria-label="close" onClick={() =>setDeleteRole((prev)=>{return{...prev,dialog:false}})} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
          <IoClose /></IconButton> </CustomTooltips></Box>

        <Box sx={{ p: 2, flexWrap: "wrap" }}>
          <Typography color={"info"} variant='v2' >Do you really wish to Remove this  &nbsp;<span><Chip size="small" variant="outlined" color="p1" label={`${deleteRole?.row?.roleName} `} /></span>&nbsp; role......?</Typography>
        </Box>
        <Box sx={{ p: 1, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
          <CustomButton title={"DELETE"} onClick={onRoleDeleteConfirm} variant={"outlined"} color={"p1"} endIcon={<FcDeleteRow/>} />
        </Box>

      </Box>
       }
       
      
      </CustomDialog>

<CustomSnackbar open={registeredUserSnackBar?.open} onClose={()=>{setRegisteredUserSnackBar((prev)=>{return{...prev,open:false,message:"",error:false,refresh:false}})}} message={registeredUserSnackBar?.message} severity={registeredUserSnackBar.error?"error":"success"} />

<CustomSnackbar open={userDeleteOperation?.snackbar} onClose={()=>{setUserDeleteOperation((prev)=>{return{...prev,snackbar:false}})}} message={DISABLE_USER_SLICE_REDUCER?.data?.statusMessage} severity={DISABLE_USER_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />

<CustomSnackbar open={deleteRole?.snack} onClose={()=>{setDeleteRole((prev)=>{return{...prev,snack:false}})}} message={DELETE_ROLE_SLICE_REDUCER?.data?.statusMessage} severity={DELETE_ROLE_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
<CustomSnackbar open={assignNewRole?.snackbar} onClose={()=>{setAssignNewRole((prev)=>{return{...prev,snackbar:false}})}} message={ASSIGN_ROLE_SLICE_REDUCER?.data?.statusMessage} severity={ASSIGN_ROLE_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />
<CustomSnackbar open={userUpdateOperation?.snackbar} onClose={()=>{setUserUpdateOperation((prev)=>{return{...prev,snackbar:false}})}} message={UPDATE_USER_SLICE_REDUCER?.data?.statusMessage} severity={UPDATE_USER_SLICE_REDUCER?.data?.statusCode===200?"success":"info"} />

    </>   
  )
}

export default AddUser
