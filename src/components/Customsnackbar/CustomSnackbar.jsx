import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const CustomSnackbar = ({ open, onClose, severity, variant, message,anchorOrigin }) => {
    return (
        <React.Fragment>
            <Snackbar anchorOrigin={anchorOrigin?anchorOrigin:{horizontal:'right',vertical:'top'}} open={open} autoHideDuration={4000} onClose={onClose}>
                <Alert onClose={onClose} severity={severity} variant={variant?variant:"filled"}>{message}</Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default CustomSnackbar