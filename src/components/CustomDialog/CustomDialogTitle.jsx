import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import CustomTooltips from '../CustomTooltips/CustomTooltips'
import { IoClose } from "react-icons/io5";
import UnderLine from '../UnderLine/UnderLine';
import { GlobalStyles } from '../../styles/GlobalStyles';

const CustomDialogTitle = ({onClose, title}) => {

    return (
        <Box sx={{p:0.5,display: "flex", alignItems: "center", justifyContent: "space-between",borderBottom:GlobalStyles.borderStyle}}>

            <Box sx={{p:0.3,ml:0.5}}>
                <Typography variant='v5'>
                    {title}
                    <UnderLine />
                </Typography>
            </Box>

            <Box>
                <CustomTooltips title={"CLOSE"}>
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme?.palette?.p1?.main }} >
                        <IoClose />
                    </IconButton> </CustomTooltips>
            </Box>
        </Box>
    )
}

export default CustomDialogTitle