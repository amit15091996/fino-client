import { Box, Typography } from '@mui/material'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { useTheme } from '@emotion/react'
import { FinoLabel } from '../../labels/FinoLabel'

const FinoSignup = ({}) => {

const theme=useTheme()

  return (
    <Box sx={{width:350}} >
     
     <Box sx={{ ...GlobalStyles.alignmentStyles,mt:2,border:`1px solid ${theme?.palette?.p1?.main}`,m:1.5,borderRadius:1.5,p:0.3,boxShadow:` -5px 7px 1px ${theme?.palette?.p1?.main}`}}>
                <Typography color={theme?.palette?.p1?.main} variant="v3">
                  {FinoLabel.signUp}
                </Typography>
              </Box>





    </Box>
    
  )
}

export default FinoSignup