import { Box, Card, Grid, MenuItem } from '@mui/material'
import React from 'react'
import CustomDropDown, { menuItemStyle } from '../../../components/CustomDropDown/CustomDropDown'
import { FinoLabel } from '../../../labels/FinoLabel'
import CustomDatePicker from '../../../components/CustomDatePicker/CustomDatePicker'
import CustomButton from '../../../components/CustomButton/CustomButton'
import CustomTextField from '../../../components/CustomTextField/CustomTextField'
import CustomAutoComplete from '../../../components/CustomAutoComplete/CustomAutoComplete'

const ReportsSerching = ({handleDateSearch,isAdmin,autoCompleteOptions}) => {



  return (
   <Box>
    
  
      <Grid container>
       <Grid xs={12} md={2.7}>

       <Card variant="outlined" sx={{m:0.6}}>
       <Box sx={{p:1}}>
        
        <CustomTextField
        // value={category}
        isFullwidth={true}
        // onChange={handleCategoryChange}
        label={"Year"}
        // options={categoryData?.data?["ALL"].concat(categoryData?.data?.response?.map((item)=>item?.categoryName)):[]}
        />
          </Box>
          </Card>
       </Grid>
   
    <Grid xs={12} md={2.7}>
    <Card variant="outlined" sx={{m:0.6}} >
    <Box sx={{ p: 1 }}>
      <CustomDropDown
    //   value={month}
    //   onChange={handleMonthChange}
      label={FinoLabel.month}
      placeholder={FinoLabel.month}
      isFullwidth={true}
      children={FinoLabel.MonthList.map((item)=>{return(<MenuItem style={menuItemStyle} id={item.id} value={item.value} key={item.value}>{item.month}</MenuItem>)})}
      />
    </Box>
    </Card>
     </Grid>

  <Grid xs={12} md={6.6}>


<form onSubmit={handleDateSearch}>

<Card variant="outlined" sx={{display:"flex",m:0.6}}>
<Box sx={{ p: 1 ,width:"33.33%"}}>
      <CustomDatePicker
      isRequired={true}
    //    value={dates?.fromDate}
    //    onChange={(e)=>{setDates({...dates,fromDate:e})}}
        isFullWidth={true}
        label={FinoLabel.fromDate}
      />
    </Box>

    <Box sx={{ p: 1,width:"33.33%" }}>
      <CustomDatePicker
      isRequired={true}
    //    value={dates?.toDate}
    //    onChange={(e)=>{setDates({...dates,toDate:e})}}
        isFullWidth={true}
        label={FinoLabel.toDate}
      />
    </Box>

    <Box sx={{ p: 1,display:"flex" ,width:"33.33%",justifyContent:"center"}}>
      <Box>
      <CustomButton color={"secondary"} width={"75px"} title={"Search"} />
      </Box>
      <Box sx={{ml:2}}>
      <CustomButton color={"error"} type={"button"}   width={"75px"} title={"Clear"} />
      {/* onClick={()=>{setDates({fromDate:null,toDate:null})}} */}
      </Box>
    </Box>

</Card>
</form>
 

    </Grid>


      </Grid>
     
{
  isAdmin &&  <Grid container>
  <Grid xs={12} md={2.7}>

  <Card variant="outlined" sx={{m:0.6}}>
  <Box sx={{p:1}}>
  <CustomAutoComplete options={autoCompleteOptions && autoCompleteOptions} label={"Collected By"} isFullWidth={true}/>

   </Box>
   </Card>
   </Grid>
   </Grid>
}

     




      </Box>

    
  
  )
}

export default ReportsSerching