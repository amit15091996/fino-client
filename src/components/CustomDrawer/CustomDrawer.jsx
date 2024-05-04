import { SwipeableDrawer } from '@mui/material'
import React from 'react'

const CustomDrawer = ({anchor,onClose,open,onOpen,children}) => {
  return (
    <React.Fragment>
       <SwipeableDrawer sx={{}} anchor={anchor} open={open} onClose={onClose} onOpen={onOpen}>
        {children}
          </SwipeableDrawer>
    </React.Fragment>
  )
}

export default CustomDrawer