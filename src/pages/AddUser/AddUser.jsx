import { Box, Card, Grid, MenuItem, Typography } from "@mui/material"
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
import { useEffect, useMemo } from "react"
import ProtectedInterceptors from "../../hooks/ProtectedInterceptors"

const AddUser = ({}) => {
 const theme = useTheme();
const dispatch=useDispatch()
const protectedInterceptors=ProtectedInterceptors()
const getAllUsers=()=>{dispatch(getAllUsersService(protectedInterceptors))}
const GET_ALL_USERS_SLICE_REDUCER=useSelector((state)=>state.GET_ALL_USERS_SLICE_REDUCER)
useEffect(()=>{getAllUsers()},[])
const usersDetails=useMemo(()=>{
return Array.isArray(GET_ALL_USERS_SLICE_REDUCER?.data?.response)? GET_ALL_USERS_SLICE_REDUCER?.data?.response:[]
},[GET_ALL_USERS_SLICE_REDUCER])


  return (
  <>

    <Card sx={{p:2,mr:1}}>
      
         <Box sx={{ml:1,mb:1.5}}>
          <Typography variant="v5">
            {FinoLabel.registerAUser}
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>    
       <Grid container >
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
            <CustomTextField
              label={FinoLabel.firstName}
              placeholder={FinoLabel.firstName}
              isFullwidth={true}
            />
          </Box>

        </Grid>
        <Grid item xs={12} md={3}>
        <Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
            <CustomTextField
              label={FinoLabel.surname}
              placeholder={FinoLabel.surname}
              isFullwidth={true}
            />
          </Box>
          </Grid>

          <Grid item xs={12} md={3}>
          <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomDatePicker isFullWidth={true} label={FinoLabel.dateOfBirth} />
        </Box>
          </Grid>
<Grid item xs={12} md={3}>
<Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
          <CustomTextField
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
            label={FinoLabel.emailID}
            placeholder={FinoLabel.emailID}
            isFullwidth={true}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1,...GlobalStyles.alignmentStyles }}>
         <CustomDropDown isFullwidth={true}
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
             isFullwidth={true}
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
    </Card>

    <Card sx={{ mt: 2, mr: 1, mb:5,p:1.5}}>
        <CustomTable
          TableName={"USER DETAILS"}
          headCells={FinoLabel.userDetailsTableHead}
          rows={usersDetails}
        />
      </Card>
    </>   
  )
}

export default AddUser
