import { Box, Card, Grid, MenuItem, Typography } from '@mui/material';
import React from 'react'
import CustomTooltips from '../../CustomTooltips/CustomTooltips';
import { BiReset } from "react-icons/bi";
import CustomDropDown, { menuItemStyle } from '../../CustomDropDown/CustomDropDown';
import CustomTextField from '../../CustomTextField/CustomTextField';
import UnderLine from '../../UnderLine/UnderLine';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import { useTheme } from '@emotion/react';

export const Operators=[
    {id:1,value:"contains",input:"contains"},
    {id:2,value:"equals",input:"equals"},
    {id:3,value:"starts with",input:"startswith"},
    {id:4,value:"ends with",input:"endswith"},
    {id:5,value:"is any of",input:"isanyof"},
  ]
  
  
export default function FilteredItem({headCells,customFilter}) {

const theme=useTheme()

const{filterItem,setFilterItem}=customFilter


  return (
    <Card elevation={0} sx={{maxWidth:400,borderRadius:0,margin:"5px"}}>
    <Box sx={{justifyContent:"space-between",display:"flex",alignItems:"center"}}>
      <Typography variant='v2'>Filter Panel <span><UnderLine width={"25px"}/></span></Typography>
      <CustomTooltips  title="Reset Filters">
      <BiReset style={{cursor:"pointer",color:theme?.palette?.p2?.main}} onClick={()=>{ setFilterItem({columns:"", operators:"",filterValue:""})}} fontSize={20}/>
      </CustomTooltips>
     </Box>
     
        <Grid container >
          <Grid item xs={12} md={4}>
            <Box sx={{p:1}}>
          <CustomDropDown   isFullwidth={true} label={"Columns"} value={filterItem?.columns} onChange={(e)=>{setFilterItem({...filterItem,columns:e.target.value})}}
          children={headCells?.map((item,index)=>{ return(<MenuItem sx={menuItemStyle} value={item?.id} id={item?.id} >{item?.label}</MenuItem>)})}/> </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{p:1}}>
            <CustomDropDown  isFullwidth={true} label={"Operators"} value={filterItem?.operators} onChange={(e)=>{setFilterItem({...filterItem,operators:e.target.value})}}
            children={Operators?.map((item,index)=>{ return(<MenuItem  sx={menuItemStyle} value={item?.input} id={item?.id} >{item?.value}</MenuItem>)})}/>
            </Box>
          </Grid>
    
          <Grid item xs={12} md={4}>
            <Box sx={{p:1}}>
            <CustomTextField isFullwidth={true}  label={"Filter value"} placeholder={"Filter value"} 
            value={filterItem?.filterValue} onChange={(e)=>{setFilterItem({...filterItem,filterValue:e.target.value})}}
            />
            </Box>
          </Grid>
    
       
        </Grid>
      
        </Card>
    
  )
}
