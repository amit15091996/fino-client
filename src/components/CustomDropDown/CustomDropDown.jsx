import { FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'


const ITEM_HEIGHT=50
const ITEM_PADDING_TOP=1
export const menuItemStyle={fontSize:12,fontWeight:"700"}
const MenuProps = {PaperProps: {style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}, }};

 const CustomDropDown=({label,children,value,onChange,isFullwidth,placeholder,isRequired})=>{

  return (
    <FormControl  size='small' fullWidth={isFullwidth}>
    <InputLabel size='small'
   sx={{"&.MuiInputLabel-sizeSmall": {fontWeight:"700",top:"0vh",marginLeft:0,fontSize:11,left:0,padding:0,alignItems:"center"}
  ,"&.MuiInputLabel-shrink":{
     transform:"translate(13px,-7px) scale(0.85)"
  }
  }}
    id={`${label}-1`}>{label}</InputLabel>
    <Select
    placeholder={placeholder}
    variant='outlined'
    required={isRequired}
    fullWidth={isFullwidth}
    sx={{height:33,fontSize:11,fontWeight:"700"}}
    MenuProps={MenuProps}
     id={`${label}-1`}
      value={value}
      onChange={onChange}
      label={label}  
      >
        {children}
   
    </Select>
  </FormControl>
  )
}

export default CustomDropDown;