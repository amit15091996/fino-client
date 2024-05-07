import { Box, Dialog, IconButton, Slide } from '@mui/material';
import React from 'react'
import { IoClose } from "react-icons/io5";
import CustomTooltips from '../CustomTooltips/CustomTooltips';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CustomDialog = ({onClose,open,children,isFullScreen}) => {
  return (
    <React.Fragment>
         <Dialog fullScreen={isFullScreen}  open={open} onClose={onClose} TransitionComponent={Transition}>
            {isFullScreen && (<Box sx={{p:1,display:"flex",alignItems:"center",justifyContent:"flex-end"}} ><CustomTooltips title={"CLOSE"}> <IconButton  aria-label="close" onClick={onClose} sx={{color: (theme) => theme?.palette?.grey[500]}} >
          <IoClose /></IconButton> </CustomTooltips></Box>)}
        {children}
      </Dialog>

    </React.Fragment>
    
  )
}

export default CustomDialog