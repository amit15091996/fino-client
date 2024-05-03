import { Button, Card, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { MdPayments } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { RxActivityLog } from "react-icons/rx";
import { BiSolidDashboard } from "react-icons/bi";
import { SideNavbarStyles } from '../../styles/SideNavbarStyles';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';


const SideNavbar = ({}) => {
  const theme=useTheme()
const navigate=useNavigate()
const [open, setOpen] = useState(true);
const [selectedIndex, setSelectedIndex] = useState(0);
const handleClick = (e) => {setOpen(!open); };
const handleSelectedIndex=(e,index)=>{
  setSelectedIndex(index)

  if(index===0){
    navigate("/Layout/Dashboard")
  }
  else if(index===1){
    navigate("/Layout/Payments")
  }
}




  return (
    <Card elevation={1} sx={{height:"100%",borderRadius:0,width:"100%",opacity:1}}>

    <List sx={{ width: '100%',  }} aria-labelledby="fino-multiple-list-item" >  
      <ListItemButton sx={{"&.Mui-selected":SideNavbarStyles.listItemButtonSelectedStyle(theme)}}  selected={selectedIndex===0}  onClick={(e) => handleSelectedIndex(e,0)}  >
        <ListItemIcon>
        <BiSolidDashboard style={selectedIndex===0?SideNavbarStyles.ListIconStyleIfSelected(theme):SideNavbarStyles.listItemIconStyle(theme)} color={theme}  />
        </ListItemIcon>
        <ListItemText sx={selectedIndex !==0 && SideNavbarStyles.listItemTextstyle(theme)}  primary="Dashboard" />
      </ListItemButton>
      
      <ListItemButton sx={{"&.Mui-selected":SideNavbarStyles.listItemButtonSelectedStyle(theme)}} selected={selectedIndex===1}  onClick={(e) => handleSelectedIndex(e,1)} >
        <ListItemIcon >
        <MdPayments style={selectedIndex ===1?SideNavbarStyles.ListIconStyleIfSelected(theme):SideNavbarStyles.listItemIconStyle(theme)} />
        </ListItemIcon>
        <ListItemText sx={selectedIndex !==1 &&  SideNavbarStyles.listItemTextstyle(theme)}   primary="Payments" />
      </ListItemButton>

      <ListItemButton sx={{"&.Mui-selected":SideNavbarStyles.listItemButtonSelectedStyle(theme)}} selected={selectedIndex===2}  onClick={(e) => handleSelectedIndex(e,2)} >
        <ListItemIcon>
        <TbReport  style={ selectedIndex ===2?SideNavbarStyles.ListIconStyleIfSelected(theme):SideNavbarStyles.listItemIconStyle(theme)} />
        </ListItemIcon>
        <ListItemText  sx={ selectedIndex !==2 &&  SideNavbarStyles.listItemTextstyle(theme)}  primary="Reports" />
      </ListItemButton>

      <ListItemButton sx={{"&.Mui-selected":SideNavbarStyles.listItemButtonSelectedStyle(theme)}} selected={selectedIndex===3}  onClick={(e) => handleSelectedIndex(e,3)} >
        <ListItemIcon>
        <RxActivityLog  style={selectedIndex ===3?SideNavbarStyles.ListIconStyleIfSelected(theme):SideNavbarStyles.listItemIconStyle(theme)} />
        </ListItemIcon>
        <ListItemText  sx={selectedIndex !==3 && SideNavbarStyles.listItemTextstyle(theme)} primary="Activities" />
      </ListItemButton>
      {/* <ListItemButton   onClick={(e)=>{handleClick(e)}}>
        <ListItemIcon>
          <IoBowlingBallOutline/>
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <MdExpandLess  /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl:4,"&.Mui-selected": {backgroundColor: "#1976d2",color:"#FFF",borderRadius:2,":hover":{backgroundColor:"#1976d2"}}}} selected={selectedIndex===2} onClick={(e)=>{ handleSelectedIndex(e,2)}} >
            <ListItemIcon>
              <MdStarBorder  />
            </ListItemIcon>
            <ListItemText  primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
       

    </Card>
  )
}

export default SideNavbar