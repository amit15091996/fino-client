import { Button } from '@mui/material'
import React from 'react'


 const CustomButton=({title,color,isFullwidth,onClick,startIcon,endIcon,width,isDisabled,type,size,variant})=> {
  return (
    <Button endIcon={endIcon} type={type?type:"submit"}  startIcon={startIcon} onClick={onClick} size={size?size:'small'} disabled={isDisabled}
     variant={variant?variant:'contained'} color={color}
     fullWidth={isFullwidth} sx={{width:width,fontWeight:"700",letterSpacing:1.5}}>{title}</Button>
  )
}
export default CustomButton;