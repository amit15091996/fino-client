import styled from '@emotion/styled';
import { Tooltip, tooltipClasses } from '@mui/material'
import React from 'react'


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme?.palette?.common?.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme?.palette?.common?.black,
    fontSize:12.7
  },
  
}));



const CustomTooltips = ({children,title}) => {
  return (
    <BootstrapTooltip title={title} sx={{cursor:"pointer"}} >
            {children}
        </BootstrapTooltip>
  )
}

export default CustomTooltips