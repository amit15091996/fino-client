import { Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { MdDeleteForever } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import CustomTooltips from "../../CustomTooltips/CustomTooltips";
import UnderLine from "../../UnderLine/UnderLine";
import CustomButton from "../../CustomButton/CustomButton";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { useTheme } from "@emotion/react";



const CustomToolBar = ({onFilterClick, pdfdownload, Exceldownload, TableName }) => {

  const theme=useTheme()

  return (

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

      {TableName && <Typography variant="v2"  >{TableName}<span><UnderLine /></span></Typography>}

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CustomTooltips title="Pdf Download"><CustomButton color={theme?.palette?.p2?.main} variant={"standard"} onClick={pdfdownload} title={"PDF"}></CustomButton></CustomTooltips>
        <CustomTooltips title="Excel Download"><CustomButton color={theme?.palette?.p2?.main} variant={"standard"} onClick={Exceldownload} title={"EXCEL"}></CustomButton></CustomTooltips>
        <CustomTooltips title="FILTER LIST"> <IconButton onClick={onFilterClick}><FaFilter fontSize="small" style={{ color:theme?.palette?.p2?.main}} /> </IconButton></CustomTooltips>
      </Box>
    </Box>
  );
}

export default CustomToolBar;

// sx={{color:"#1A4198"}}