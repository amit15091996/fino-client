import { createTheme } from "@mui/material";


const font = "'Rethink Sans', sans-serif";


export const FinoTheme=(mode)=>{
    
return createTheme({
    shadows:0,
    palette:{
        primary:{
            main:"#1a237e",
        } ,
        secondary:{
            main:'#FFA500'
        },
        white:{
            main:'#FFF'
        },
//    mode:mode
    },
    typography:{
        fontFamily:font,
        fontSize:14,

     h1:{
       fontFamily:font,
       fontWeight:500,
     },
    },

});  
}

