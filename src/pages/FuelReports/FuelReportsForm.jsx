import { useTheme } from '@emotion/react';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import UnderLine from '../../components/UnderLine/UnderLine';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import CustomButton from '../../components/CustomButton/CustomButton';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { FinoLabel } from '../../labels/FinoLabel';



const FuelReportsForm = ({onSubmit,isUpdate,title}) => {
    const theme = useTheme();



  return (
     <Card sx={{p:2,mr:1}} >

        <Box sx={{ml:1,mb:1}}>
          <Typography variant="v5">
        {title}
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>    

      <form onSubmit={onSubmit}>
    
    <Grid container sx={{mt:2}}>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1}}>
          <CustomDatePicker
            isFullWidth={true}
            isRequired={true}
            label={FinoLabel.date}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.openingStock}
            placeholder={FinoLabel.openingStock}
            
          
           
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.inwards}
            placeholder={FinoLabel.inwards}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>

      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.totalStock}
            placeholder={FinoLabel.totalStock}
          />
        </Box>

      </Grid>

    </Grid>
      
       
      
     
        <Box sx={{ p: 1,...GlobalStyles.alignmentStyles_2}}>
          <CustomButton
          color={"p1"}
           width={100}
            title={isUpdate ? "UPDATE" : "ADD"}
          />
        </Box>
      </form>
    </Card>
  )
}

export default FuelReportsForm