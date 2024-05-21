import { Box, Grid } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideNavbar from '../HomeComponent/SideNavbar'
import { GlobalStyles } from '../../styles/GlobalStyles'
import TopNavbar from '../HomeComponent/TopNavbar'
import { useTheme } from '@emotion/react'
import AuthHook from '../../hooks/AuthHook'

const Layout = ({ }) => {
const theme=useTheme()
const{jwtToken,userName,error,userRoles,fullName}=AuthHook()

    return (
        <>
        {
            (jwtToken !==undefined &&  jwtToken !==null && jwtToken !=="" &&  jwtToken !=="") ? <Box>
            <TopNavbar/>
                <Grid container>
                    <Grid item md={1.8}>
                        <Box sx={{ height: "92dvh", width: "100%", overflow: "auto", display: {xs:"none", sm: "none", md: "flex" }, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                            <SideNavbar />
                        </Box>
                    </Grid>
    
                    <Grid item xs={12} sm={12} md={10.2}>
                        <Box sx={{ p:1, height: "92dvh", width: "99.42%", overflow: "auto"}}>
                            <Outlet />
                        </Box>
                    </Grid>
    
                </Grid>
    
    
            </Box>:<Navigate to={"/"} />
        }
        
        </>
      
    )
}

export default Layout