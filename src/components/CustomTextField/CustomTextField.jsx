import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const CustomTextField = ({ helpertext, placeholder, value, onChange, type, label, isFullwidth, startIcon,endIcon,isdisable, isRequired, variant }) => {

    return (
        <TextField size='small' label={label} placeholder={placeholder} value={value} type={type ? type : "text"} onChange={onChange}
            fullWidth={isFullwidth} disabled={isdisable} required={isRequired} helperText={helpertext}
            InputProps={{ style: { letterSpacing:1.5,fontSize: '13px', height: 33, alignItems: "center", fontWeight: "900" }, startAdornment:startIcon && (<InputAdornment position="start" >{startIcon}</InputAdornment>), endAdornment: endIcon && (<InputAdornment position="end" >{endIcon}</InputAdornment>)}}
            InputLabelProps={{ sx: { fontSize: "12px", fontWeight: "600", padding: 0, "&.MuiInputLabel-shrink": { top: 0, transform: "translate(12px,-8px) scale(1.08)"}}}}
            variant={variant}
        />
    )
}

export default CustomTextField;