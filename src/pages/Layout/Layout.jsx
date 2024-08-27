import { Box, Grid, LinearProgress } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideNavbar from '../HomeComponent/SideNavbar'
import { GlobalStyles } from '../../styles/GlobalStyles'
import TopNavbar from '../HomeComponent/TopNavbar'
import { useTheme } from '@emotion/react'
import AuthHook from '../../hooks/AuthHook'

const Layout = ({ }) => {
    const theme = useTheme()
    const { jwtToken, userName, error, userRoles, fullName } = AuthHook()
    const [routeLoading, setRouteLoading] = useState(false)

    const isRouteLoading = (value) => {
        setRouteLoading(value)
    };


    return (
        <>
            {
                (jwtToken !== undefined && jwtToken !== null && jwtToken !== "" && jwtToken !== "") ? <Box>
                    <TopNavbar />
                    <Grid container >
                        <Grid item md={1.8}>
                            <Box sx={{ height: "92dvh", width: "100%", overflow: "auto", display: { xs: "none", sm: "none", md: "flex" }, borderRight: `1px solid ${GlobalStyles.sideTopNavborderColor}` }}>
                                <SideNavbar isRouteLoading={isRouteLoading} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={10.2} sx={{ height: "92dvh", width: "100%", p: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Box sx={{ height: "100%", width: "100%" }}>
                                {routeLoading && <LinearProgress color="secondary" />}
                                <Outlet />
                            </Box>
                        </Grid>

                    </Grid>


                </Box> : <Navigate to={"/"} />
            }

        </>

    )
}

export default Layout