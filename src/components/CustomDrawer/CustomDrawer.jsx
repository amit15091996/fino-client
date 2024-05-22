import { Box, IconButton, SwipeableDrawer } from '@mui/material'
import React from 'react'
import CustomTooltips from '../CustomTooltips/CustomTooltips'
import { IoClose } from "react-icons/io5";



const CustomDrawer = ({anchor,onClose,open,onOpen,children,isCloseButtonRequired}) => {
  return (
    <React.Fragment>
       <SwipeableDrawer sx={{}} anchor={anchor} open={open} onClose={onClose} onOpen={onOpen}>
       {isCloseButtonRequired && (<Box sx={{p:1,display:{xs:"flex",sm:"flex",md:"none",xl:"none",lg:"none"},alignItems:"center",justifyContent:"flex-end"}} ><CustomTooltips title={"CLOSE"}> <IconButton  aria-label="close" onClick={onClose} sx={{color: (theme) => theme?.palette?.grey[500]}} >
          <IoClose /></IconButton> </CustomTooltips></Box>)}
       
        {children}
          </SwipeableDrawer>
    </React.Fragment>
  )
}

export default CustomDrawer