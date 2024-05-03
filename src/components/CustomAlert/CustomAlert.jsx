import { Alert, AlertTitle, Typography } from '@mui/material'
import React from 'react'

const CustomAlert = ({alertTitle,alertDescription,variant,severity,icon,color}) => {


  return (
    <React.Fragment>
        <Alert color={color && color} icon={icon && icon} variant={variant?variant:"standard"} severity={severity?severity:"success"}>
            <AlertTitle   >{alertTitle}</AlertTitle>
            <Typography variant='v2' color="secondary">{alertDescription}</Typography>
        </Alert>

    </React.Fragment>
  )
}

export default CustomAlert