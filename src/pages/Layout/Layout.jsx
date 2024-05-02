import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNavbar from '../HomeComponent/SideNavbar'
import { GlobalStyles } from '../../styles/GlobalStyles'

const Layout = ({ }) => {


    return (
        <Box>
            <Grid container>
                <Grid item md={1.8}>
                    <Box sx={{ height: "92dvh", width: "100%", overflow: "auto", display: { sm: "none", md: "flex" }, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                        <SideNavbar />
                    </Box>
                </Grid>

                <Grid item md={10.2}>
                    <Box sx={{ p: 1, height: "92dvh", width: "100%", overflow: "auto" }}>
                        <Outlet />
                    </Box>
                </Grid>

            </Grid>


        </Box>
    )
}

export default Layout