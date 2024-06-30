import { Avatar, Box, Card, Grid, IconButton, ListItemIcon, Menu, MenuItem, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { SiContactlesspayment } from "react-icons/si";
import { useTheme } from '@emotion/react';
import lock from "../../assets/lock.jpg"
import { useNavigate } from 'react-router-dom';
import { RiArchiveDrawerFill } from "react-icons/ri";
import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';
import SideNavbar from './SideNavbar';
import CustomTooltips from '../../components/CustomTooltips/CustomTooltips';
import { IoClose } from "react-icons/io5";
import AuthHook from '../../hooks/AuthHook';
import { BiLogOut, BiLogOutCircle, BiReset } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useCookies } from 'react-cookie';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import CustomButton from '../../components/CustomButton/CustomButton';
import { PiPasswordBold } from "react-icons/pi";
import UnderLine from '../../components/UnderLine/UnderLine';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import { FinoLabel } from '../../labels/FinoLabel';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { resetPasswordService } from '../../redux/slice/userslice/ResetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedInterceptors from "../../hooks/ProtectedInterceptors"
import Loading from '../../components/Loading/Loading';
import CustomSnackbar from '../../components/Customsnackbar/CustomSnackbar';
import CustomDialogTitle from '../../components/CustomDialog/CustomDialogTitle';
import ProfileCard from './ProfileCard';


const TopNavbar = () => {

  const theme = useTheme()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const protectedInterceptors = ProtectedInterceptors()
  const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSideNavBarDrawer, setOpenSideNavBarDrawer] = useState(false)
  const [logoutDialogopen, setLogoutDialogopen] = useState(false)
  const [resetPasswordFields, setResetPasswordFields] = useState({ mobileNumber: userName, oldPassword: "", newPassword: "", confirmNewPassword: "", Snackbar: false, dialog: false })
  const [cookies, setCookie, removeCookie] = useCookies(['FINO_LOGIN_COOKIE']);
  const RESET_PASSWORD_SLICE_REDUCER = useSelector((state) => state?.RESET_PASSWORD_SLICE_REDUCER)

  const [profileCard, setProfileCard] = useState(false)


  const handleDrawerOpen = () => { setOpenSideNavBarDrawer(true) }
  const open = Boolean(anchorEl);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const onProfileClick = () => { setProfileCard(true) };

  const handleClose = () => { setAnchorEl(null); }

  const onLogOutClick = () => { setAnchorEl(null); setLogoutDialogopen(true) }
  const handleLogout = () => { removeCookie('FINO_LOGIN_COOKIE'); navigate("/"); setLogoutDialogopen(false) }

  const resetPasswordDialog = () => { setResetPasswordFields((prev) => { return { ...prev, dialog: true } }) }
  const onResetPasswordSubmit = async (e) => {
    e.preventDefault()

    const resetPayload = {
      protectedInterceptors: protectedInterceptors, mobileNumber: resetPasswordFields?.mobileNumber,
      oldPassword: resetPasswordFields?.oldPassword, newPassword: resetPasswordFields?.newPassword
    }
    const { payload } = await dispatch(resetPasswordService(resetPayload))
    if (payload?.statusCode === 200) {
      setResetPasswordFields((prev) => { return { ...prev, dialog: false, Snackbar: true, mobileNumber: prev?.mobileNumber, oldPassword: "", confirmNewPassword: "", newPassword: "" } })
      removeCookie('FINO_LOGIN_COOKIE'); navigate("/");
    }
    else {
      setResetPasswordFields((prev) => { return { ...prev, Snackbar: true, mobileNumber: prev?.mobileNumber, oldPassword: prev?.oldPassword, confirmNewPassword: prev?.confirmNewPassword, newPassword: prev?.newPassword } })
    }
  }





  return (
    <Card sx={{ height: "8dvh", display: "flex", borderRadius: 0, width: "100%", borderBottom: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>

      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ height: "100%", width: "100%" }}>
          <Grid item xs={11} >
            <Box sx={{ height: "100%", width: "100%", ml: 2, ...GlobalStyles.alignmentStyles_1, display: { xs: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" } }}>
              <SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
              <Typography color={"secondary"} variant='v1'>FINO</Typography>
            </Box>

            <Box sx={{ width: "100%", height: "100%", display: { xs: "flex", sm: "flex", md: "none", lg: "none", xl: "none" } }}>
              <Grid container sx={{ height: "100%", width: "100%" }}>
                <Grid item xs={5} >
                  <Box sx={{ cursor: "pointer", ml: 2, height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1 }}>
                    <RiArchiveDrawerFill onClick={handleDrawerOpen} fontSize={23} color={theme?.palette?.secondary?.main} />

                  </Box>
                </Grid>
                <Grid item xs={7} >
                  <Box sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1 }}>
                    <SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
                    <Typography color={"secondary"} variant='v1'>FINO</Typography>
                  </Box>
                </Grid>
              </Grid>

            </Box>

          </Grid>
          <Grid item xs={1}>
            <Box sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_2 }}>
              <Avatar onClick={handleClick} sx={{ ":hover": { cursor: "pointer", transform: "scale(1.2)" }, mr: 1, backgroundColor: theme?.palette?.secondary?.main }}>
                {typeof fullName === "string" ? fullName.substring(0, 1).toUpperCase() : "F"}</Avatar>
            </Box>
          </Grid>

        </Grid>

      </Box>



      <CustomDrawer open={openSideNavBarDrawer} onClose={() => { setOpenSideNavBarDrawer(false) }} anchor={"left"}>
        <Box sx={{ minWidth: 220, overflowX: "hidden" }}>
          <Box>
            <CustomTooltips title={"Click Me To Close The Drawer"}>
              <Box onClick={() => { setOpenSideNavBarDrawer(false) }} sx={{ cursor: "pointer", height: "100%", width: "100%", p: 1, ...GlobalStyles.alignmentStyles }}>
                <SiContactlesspayment fontSize={30} style={{ marginRight: "2px" }} color={theme?.palette?.primary?.main} />
                <Typography color={"secondary"} sx={{ marginRight: "30px" }} variant='v1'>FINO</Typography>
              </Box>
            </CustomTooltips>
          </Box>
          <Box sx={{ mt: 2 }}>
            <SideNavbar drawerClose={() => { setOpenSideNavBarDrawer(false) }} />
          </Box>
        </Box>
      </CustomDrawer>

      <Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
              '&::before': {
                content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
                width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={onProfileClick}>
            <ListItemIcon>
              <CgProfile fontSize={20} />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={resetPasswordDialog}>
            <ListItemIcon>
              <PiPasswordBold fontSize={20} />
            </ListItemIcon>
            Reset Password
          </MenuItem>
          <MenuItem onClick={onLogOutClick}>
            <ListItemIcon>
              <BiLogOut fontSize={20} />
            </ListItemIcon>
            Logout
          </MenuItem>

        </Menu>


      </Box>


      <CustomDialog isFullWidth={true} maxWidth={"xs"} open={logoutDialogopen} onClose={() => setLogoutDialogopen(false)}>
        <Box>
          <CustomDialogTitle title={"LOGOUT"} onClose={() => setLogoutDialogopen(false)} />

          <Box sx={{ p: 2, flexWrap: "wrap" }}>
            <Typography color={"info"} variant='v2' >Do you really wish to logout from our system......?</Typography>
          </Box>
          <Box sx={{ p: 2, mt: 2, ...GlobalStyles.alignmentStyles_2 }}>
            <CustomButton title={"logout"} variant={"outlined"} color={"p1"} onClick={handleLogout} endIcon={<BiLogOutCircle />} />
          </Box>

        </Box>
      </CustomDialog>

      <CustomDialog isFullWidth={true} maxWidth={"sm"} open={profileCard} onClose={() => setProfileCard(false)}>
        <CustomDialogTitle title={"PROFILE"} onClose={() => setProfileCard(false)} />
        <ProfileCard />
      </CustomDialog>


      <CustomDialog isFullWidth={true} maxWidth={"sm"} open={resetPasswordFields?.dialog} onClose={() => { setResetPasswordFields((prev) => { return { ...prev, dialog: false } }) }}>

        <CustomDialogTitle title={"RESET PASSWORD"} onClose={() => { setResetPasswordFields((prev) => { return { ...prev, dialog: false } }) }} />

        {
          RESET_PASSWORD_SLICE_REDUCER?.isLoading ? <Loading /> : <Box sx={{ p: 3 }}>


            <form onSubmit={onResetPasswordSubmit}>
              <Box sx={{ p: 1, ...GlobalStyles.alignmentStyles }}>
                <CustomTextField
                  label={FinoLabel.oldPassword}
                  placeholder={FinoLabel.oldPassword}
                  isFullwidth={true}
                  isRequired={true}
                  value={resetPasswordFields?.oldPassword}
                  onChange={(e) => { setResetPasswordFields({ ...resetPasswordFields, oldPassword: e.target.value }) }}
                />
              </Box>

              <Box sx={{ p: 1, mt: 1.4, ...GlobalStyles.alignmentStyles }}>
                <CustomTextField
                  label={FinoLabel.newPassword}
                  placeholder={FinoLabel.newPassword}
                  isFullwidth={true}
                  isRequired={true}
                  value={resetPasswordFields?.newPassword}
                  onChange={(e) => { setResetPasswordFields({ ...resetPasswordFields, newPassword: e.target.value }) }}
                />
              </Box>
              <Box sx={{ p: 1, mt: 1.4, ...GlobalStyles.alignmentStyles }}>
                <CustomTextField
                  label={FinoLabel.confirmPassword}
                  placeholder={FinoLabel.confirmPassword}
                  isFullwidth={true}
                  isRequired={true}
                  type={"password"}
                  value={resetPasswordFields?.confirmNewPassword}
                  onChange={(e) => { setResetPasswordFields({ ...resetPasswordFields, confirmNewPassword: e.target.value }) }}
                  helpertext={resetPasswordFields?.newPassword !== resetPasswordFields?.confirmNewPassword ? <Typography color={"error"} variant="v2" sx={{ fontSize: 11 }}>New Password and confirm password must be same</Typography> : ""}

                />
              </Box>
              <Box sx={{ p: 1, mt: 1.4, ...GlobalStyles.alignmentStyles }}>
                <CustomButton isDisabled={resetPasswordFields?.newPassword !== resetPasswordFields?.confirmNewPassword} color={"p1"} isFullwidth={true} title={"RESET"} endIcon={<BiReset />} />
              </Box>
            </form>
          </Box>
        }

      </CustomDialog>

      <CustomSnackbar open={resetPasswordFields?.Snackbar} onClose={() => { setResetPasswordFields((prev) => { return { ...prev, Snackbar: false } }) }} message={RESET_PASSWORD_SLICE_REDUCER?.data?.statusMessage} severity={RESET_PASSWORD_SLICE_REDUCER?.data?.statusCode === 200 ? "success" : "info"} />


    </Card>
  )
}

export default TopNavbar