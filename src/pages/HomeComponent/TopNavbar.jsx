import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material'
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

const TopNavbar = () => {

  const theme = useTheme()
  const navigate = useNavigate();

const[openSideNavBarDrawer,setOpenSideNavBarDrawer]=useState(false)

const handleDrawerOpen=()=>{setOpenSideNavBarDrawer(true)}


  return (
    <Card sx={{ height: "8dvh", display: "flex", borderRadius: 0, width: "100%", borderBottom: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>

      <Box sx={{ width: "100%" }}>
        <Grid container sx={{ height: "100%", width: "100%" }}>
          <Grid item xs={11} >
            <Box sx={{ height: "100%", width: "100%", ml: 2, ...GlobalStyles.alignmentStyles_1, display: { xs: "none", xs: "none", md: "flex", lg: "flex", xl: "flex" } }}>
              <SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
              <Typography color={"secondary"} variant='v1'>FINO</Typography>
            </Box>

            <Box sx={{ width: "100%", height: "100%", display: { xs: "flex", xs: "flex", md: "none", lg: "none", xl: "none" } }}>
              <Grid container sx={{ height: "100%", width: "100%" }}>
                <Grid item xs={5} >
                <Box  sx={{ cursor:"pointer",ml:2,height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1}}>
              <RiArchiveDrawerFill onClick={handleDrawerOpen} fontSize={30} color={theme?.palette?.secondary?.main} />
              
              </Box>
                </Grid>
                <Grid item xs={7} >
                <Box sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1}}>
              <SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
              <Typography color={"secondary"} variant='v1'>FINO</Typography>
            </Box>
                </Grid>
              </Grid>

            </Box>


          </Grid>
          <Grid item xs={1}>
            <Box sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_2 }}>
              <Avatar sx={{ ":hover": { cursor: "pointer", transform: "scale(1.2)" }, mr: 1 }}>F</Avatar>
            </Box>
          </Grid>

        </Grid>

      </Box>



<CustomDrawer open={openSideNavBarDrawer} onClose={()=>{setOpenSideNavBarDrawer(false)}} anchor={"left"}>
<Box >
<Box>
<CustomTooltips title={"Click Me To Close The Drawer"}>
<Box onClick={()=>{setOpenSideNavBarDrawer(false)}} sx={{cursor:"pointer",height: "100%", width: "100%",p:1, ...GlobalStyles.alignmentStyles}}>
<SiContactlesspayment fontSize={30} color={theme?.palette?.primary?.main} />
  <Typography color={"secondary"} variant='v1'>FINO</Typography>
</Box>
</CustomTooltips>   
</Box>
 <Box sx={{mt:2}}>
 <SideNavbar/>
  </Box> 
  </Box>  
</CustomDrawer>




    </Card>
  )
}

export default TopNavbar