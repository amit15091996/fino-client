export const SideNavbarStyles={
  listItemButtonSelectedStyle:(theme)=>{ return {backgroundColor:theme?.palette?.p1?.main,color:"#FFF",borderRadius:0,":hover":{backgroundColor:"#1976d2"}}},
  listItemIconStyle:(theme)=>{return{fontsize:22,color:theme?.palette?.secondary?.main}},
  ListIconStyleIfSelected:(theme)=>{return{fontsize:22,color:theme?.palette?.white?.main}},
  listItemTextstyle:(theme)=>{return{fontWeight:800,letterSpacing:1,color:theme?.palette?.secondary?.main}}
}