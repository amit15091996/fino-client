import { Snackbar } from '@mui/material'
import React from 'react'

const CustomSnackbar = ({ open, onClose, severity, variant, message }) => {
    return (
        <React.Fragment>
            <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
                <Alert onClose={onClose} severity={severity} variant={variant}>{message}</Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default CustomSnackbar