import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, InputAdornment } from '@mui/material';

const CustomAutoComplete = ({label,options,isFullWidth,value,onChange,isRequired,id}) => {

  return (
    <Box sx={{".MuiInputBase-input":{height:1.3}}}>
    <Autocomplete
      disablePortal
      value={value}
      onChange={onChange}
      fullWidth={isFullWidth}
      id={id?id:`${label}-1`}
      options={options?options:[]}
      renderInput={(params) => <TextField
      required={isRequired}
        size='small'
        {...params}
        
         label={label} 
        //  InputProps={{style: { fontSize: '13px',height:33,alignItems:"center", fontWeight:"900"}}}
          InputLabelProps={{ sx: {fontSize: "12px", 
          fontWeight:"900",top: "-1.2vh",padding:0,
           "&.MuiInputLabel-shrink": { top: 0 ,transform:"translate(12px,-8px) scale(1.0)"} } }}
         
        />}
    />
    </Box>
  )
}

export default CustomAutoComplete


// options=top100Films.map((item)=>item.year)