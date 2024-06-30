import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import AuthHook from '../../hooks/AuthHook'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import { FaUserAstronaut } from "react-icons/fa6";
import { FaMobileRetro } from "react-icons/fa6";
import CustomTooltips from '../../components/CustomTooltips/CustomTooltips'
import { IoClose } from 'react-icons/io5'

const ProfileCard = ({ onClose }) => {
    const theme = useTheme()
    const { jwtToken, userName, error, userRoles, fullName } = AuthHook()





    return (
        <Box sx={{ p:1.4}}>
            <Box sx={{ height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1 }}>
                <Typography><FaUserAstronaut fontSize={18} color={theme?.palette?.p1?.main} /> &nbsp;{":"} <span>{typeof fullName === "string" ? fullName.toUpperCase() : "F"}</span></Typography>
            </Box>
            <Box sx={{mt:1.3,height: "100%", width: "100%", ...GlobalStyles.alignmentStyles_1 }}>
                <Typography><FaMobileRetro fontSize={18} color={theme?.palette?.p1?.main} /> &nbsp;{":"} <span>{userName}</span></Typography>
            </Box>
        </Box>
    )
}

export default ProfileCard