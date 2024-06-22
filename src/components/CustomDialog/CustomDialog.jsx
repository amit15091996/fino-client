import { Box, Dialog, IconButton, Slide } from '@mui/material';
import React from 'react'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CustomDialog = ({onClose,open,children,isFullScreen,isFullWidth,maxWidth,titleComponent}) => {
  return (
    <React.Fragment>
         <Dialog  maxWidth={maxWidth && maxWidth} fullScreen={isFullScreen} fullWidth={isFullWidth && isFullWidth} open={open} onClose={onClose} TransitionComponent={Transition}>
          {titleComponent && titleComponent}
      
        {children}
      </Dialog>

    </React.Fragment>
    
  )
}

export default CustomDialog