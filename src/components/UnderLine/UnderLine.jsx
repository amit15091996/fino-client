import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'

const UnderLine = ({width,height,color}) => {

  const theme=useTheme()
  
  return (
    <Box sx={{width:width?width:"27px",height:height?height:"4px",backgroundColor:color?color:theme?.palette?.p1?.main,borderRadius:1}}>

    </Box>
  )
}

export default UnderLine