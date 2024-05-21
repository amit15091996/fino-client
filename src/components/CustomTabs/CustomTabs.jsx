import React from "react";
import { Box, Card, Tab, Tabs } from "@mui/material";
import Tabpanel, { tabPanelProps } from "./Tabpanel/Tabpanel";

// Scrollbutton="auto"
// variant="scrollable"

const tabPositionStyle=(tabposition)=>tabposition?tabposition:{display:"flex",justifyContent:"center",alignItems:"center"}


 const CustomTabs=({ cardPosition,tabPosition,tabDetails,value,onChange,variant,tabsMinHeight,tabCardWidth,tabIndicatorColor,textColor})=> {
  

    return (
        <>
        <Box sx={cardPosition?cardPosition:{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Card  
         sx={{".MuiTabs-root":{padding:0,margin:0,top:0,bottom:0, left:0,right:0,minHeight:tabsMinHeight?tabsMinHeight:"35px"},borderRadius:1,...tabPositionStyle(tabPosition),".MuiSvgIcon-root":{mb:0.25},width:tabCardWidth}} >
          <Tabs  value={value} onChange={onChange} indicatorColor={tabIndicatorColor} TabIndicatorProps={{style:{borderRadius:2,height:2}}} textColor={textColor}
            variant={variant?variant:"scrollable"} scrollButtons="auto" aria-label="fino customized tabs"
          >
            {tabDetails?.map(({ label,maxWidth,fontSize,minHeight,icon,iconPosition,minWidth,letterSpacing }, i) => (
              <Tab  icon={icon} iconPosition={iconPosition?iconPosition:"start"}
              sx={{
                maxWidth:maxWidth?maxWidth:"20px",
                minWidth:minWidth?minWidth:"20px",
                fontSize:fontSize?fontSize:"11.5px",
                padding:0,left:0,right:0,margin:0,top:0,bottom:0,
                minHeight:minHeight?minHeight:"35px",
                fontWeight:"770",
                letterSpacing:letterSpacing,
                ":hover":{backgroundColor:"rgb(213,218,222)",borderRadius:1}
              }}
              label={label} key={i} {...tabPanelProps(i)} />
            ))}
          </Tabs>
        </Card>
        </Box>

        {tabDetails?.map(({ component }, i) => (
          <Tabpanel value={value} index={i} key={i}>
            {component}
          </Tabpanel>
        ))}
      </>
    );
  }
  
  export default CustomTabs;