import { Box, IconButton, Typography } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import CustomTooltips from "../../CustomTooltips/CustomTooltips";
import UnderLine from "../../UnderLine/UnderLine";
import CustomButton from "../../CustomButton/CustomButton";
import { useTheme } from "@emotion/react";



const CustomToolBar = ({ onFilterClick, pdfdownload, Exceldownload, TableName, pdfName }) => {

  const theme = useTheme()

  return (

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

      {TableName && <Typography variant="v2"  >{TableName}<span><UnderLine color={theme?.palette?.p1?.main} /></span></Typography>}

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {
          pdfName && <CustomTooltips title="Pdf Download"><CustomButton color={"p1"} variant={"text"} onClick={pdfdownload} title={"PDF"} /></CustomTooltips>

        }
        <CustomTooltips title="Excel Download"><CustomButton color={"p1"} variant={"text"} onClick={Exceldownload} title={"EXCEL"} /></CustomTooltips>
        <CustomTooltips title="FILTER LIST"> <IconButton onClick={onFilterClick}><FaFilter fontSize="small" style={{ color: theme?.palette?.p1?.main }} /> </IconButton></CustomTooltips>
      </Box>


    </Box>
  );
}

export default CustomToolBar;

// sx={{color:"#1A4198"}}