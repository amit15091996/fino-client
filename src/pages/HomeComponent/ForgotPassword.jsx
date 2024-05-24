import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { FinoLabel } from '../../labels/FinoLabel'
import CustomTextField from '../../components/CustomTextField/CustomTextField'
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker'

const ForgotPassword = ({onForgotPasswordSubmit,forgotFields}) => {
  const {forgotPasswordFields,setForgotPasswordFields}=forgotFields
const theme=useTheme()

  return (
    <Box sx={{ maxWidth: 370,height:"100%",display:"flex",alignItems:"center",p:1.5}} >

           
    <Box sx={{width:"100%",border: `1px solid ${GlobalStyles.sideTopNavborderColor}`, m: 1.5, borderRadius: 1.5, p:1}}>
    <Box sx={{ ...GlobalStyles.alignmentStyles, mt: 1, border: `1px solid ${theme?.palette?.p1?.main}`, m: 1, borderRadius: 1.5, p: 0.3, boxShadow: ` -3px -3px 1px ${theme?.palette?.p1?.main}` }}>
        <Typography color={theme?.palette?.p1?.main} variant="v3">
            {FinoLabel.forgotPasswordLabel}
        </Typography>
    </Box>
    <Box sx={{ width:"100%",...GlobalStyles.alignmentStyles, m: 1, borderRadius: 1.5, p: 0.3,flexWrap:"wrap"}}>
                <Typography color={theme?.palette?.p1?.main}   variant="v2">
                  {FinoLabel.forgotPasswordDesc}
                </Typography></Box>

<form onSubmit={onForgotPasswordSubmit}>
<Box sx={{ p: 1, mt:4, ...GlobalStyles.alignmentStyles }}>
<CustomTextField
        label={FinoLabel.userName}
        placeholder={FinoLabel.userName}
        isFullwidth={true}
        isRequired={true}
        value={forgotPasswordFields?.mobileNumber}
        onChange={(e)=>{setForgotPasswordFields({...forgotPasswordFields,mobileNumber:e.target.value})}}
      />
</Box>

<Box sx={{ p: 1, mt:2, ...GlobalStyles.alignmentStyles }}>
<CustomDatePicker
            isFullWidth={true}
            isRequired={true}
            label={FinoLabel.dateOfBirth}
            value={forgotPasswordFields?.dateOfBirth}
        onChange={(e)=>{setForgotPasswordFields({...forgotPasswordFields,dateOfBirth:e})}}
          />
</Box>



<Box sx={{p:1,mt:1,...GlobalStyles.alignmentStyles}}>
<CustomButton color={"p1"} isFullwidth={true} title={FinoLabel.submit}/>
</Box>

</form>
    </Box>

   


</Box>
  )
}

export default ForgotPassword