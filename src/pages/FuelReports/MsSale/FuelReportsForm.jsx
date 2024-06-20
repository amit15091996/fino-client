import { useTheme } from '@emotion/react';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import UnderLine from '../../../components/UnderLine/UnderLine';
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker';
import CustomTextField from '../../../components/CustomTextField/CustomTextField';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { FinoLabel } from '../../../labels/FinoLabel';


const FuelReportsForm = ({onSubmit,isUpdate,title}) => {
    const theme = useTheme();



  return (
     <Card sx={{p:2}} >

        <Box sx={{ml:1,mb:1}}>
          <Typography variant="v5">
        {title}
          </Typography>
          <UnderLine color={theme?.palette?.p1?.main} width={21}/>
          </Box>    

      <form onSubmit={onSubmit}>
    
    <Grid container >
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1}}>
          <CustomDatePicker
            isFullWidth={true}
            isRequired={true}
            label={FinoLabel.date}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.openingStock}
            placeholder={FinoLabel.openingStock}
            
          
           
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.inwards}
            placeholder={FinoLabel.inwards}
          />
        </Box>
      </Grid>
     
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1}}>
      <CustomTextField
            isFullwidth={true}
            label={FinoLabel.dipStockInCms}
            placeholder={FinoLabel.dipStockInCms}
            
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.dipStockLtrs}
            placeholder={FinoLabel.dipStockLtrs}
            
          
           
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.testing}
            placeholder={FinoLabel.testing}
          />
        </Box>
      </Grid>
    </Grid>
    
    <Grid container >
    

      <Grid item xs={12} md={2}>

      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.density}
            placeholder={FinoLabel.density}
          />
        </Box>

      </Grid>
      <Grid item xs={12} md={2}>
      <Box sx={{ p: 1}}>
      <CustomTextField
            isFullwidth={true}
            label={FinoLabel.waterDip}
            placeholder={FinoLabel.waterDip}
            
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
      <Box sx={{ p: 1 }}>
          <CustomTextField
            isFullwidth={true}
            label={FinoLabel.remarks}
            placeholder={FinoLabel.remarks}
           
          />
        </Box>
      </Grid>
    </Grid>
      
    
     
   <Grid container sx={{mt:2,ml:1,width:"100%"}}>

    <Grid item xs={11.75} md={5.85}>
    <Card variant='outlined' sx={{width:"100%"}} >
      <Box sx={{width:"100%",p:1,borderBottom:GlobalStyles?.borderStyle,...GlobalStyles.alignmentStyles}}>
        <Typography variant='v5' color={theme?.palette?.p1?.main}>MPD-02</Typography>
      </Box>

      <Box sx={{width:"100%",display:"flex",borderBottom:GlobalStyles?.borderStyle}}>
        <Box sx={{p:0.7,width:"50%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>A1</Typography>
        </Box>
        <Box sx={{p:0.7,width:"50%",...GlobalStyles.alignmentStyles}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>A2</Typography>
        </Box>
      </Box>

      <Box sx={{width:"100%",display:"flex",borderBottom:GlobalStyles?.borderStyle}}>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.closingMeter}</Typography>
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.openingMeter}</Typography>
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles}}>
        <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.closingMeter}</Typography>
        </Box>
      </Box>

      <Box sx={{width:"100%",display:"flex",borderBottom:GlobalStyles?.borderStyle}}>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <CustomTextField
            isFullwidth={true}
            placeholder={FinoLabel.openingMeter}
            
          />
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        
        <CustomTextField
            isFullwidth={true}
            placeholder={FinoLabel.closingMeter}
          />
        
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles,borderRight:GlobalStyles?.borderStyle}}>
        <CustomTextField
            isFullwidth={true}
            placeholder={FinoLabel.openingMeter}
            
          />
        </Box>
        <Box sx={{p:0.7,width:"25%",...GlobalStyles.alignmentStyles}}>
        <CustomTextField
            isFullwidth={true}
            placeholder={FinoLabel.closingMeter}
          />
        </Box>
      </Box>
       
       <Box sx={{width:"96%",...GlobalStyles.alignmentStyles_2,p:1}}>
       <Typography variant='v2' color={theme?.palette?.p1?.main}>{FinoLabel.totalMeterSales}
       <span style={{fontSize:15}}>=&nbsp;1000</span>
       </Typography>

       </Box>

    </Card>

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