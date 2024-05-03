import { Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { MdDeleteForever } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import CustomTooltips from "../../CustomTooltips/CustomTooltips";



export default function EnhancedTableToolbar({numSelected,onFilterClick,pdfdownload,Exceldownload,TableName,selectedItemRequired}) {

    return (
    
      <Box
        sx={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}
      >
        { selectedItemRequired?numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) :null: (
          <Typography
            sx={{ flex: '1 1 100%',ml:0.2 }}
            variant="v2"
            id="tableTitle"
            component="div"
            color={"primary"}
          >
            {TableName}{TableName?<span><Box sx={{width:"30px",height:"4px",backgroundColor:"#ff6700",borderRadius:1}}></Box></span>:null}
          </Typography>
        )}
  
        {selectedItemRequired?numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <MdDeleteForever />
            </IconButton>
          </Tooltip>
        ):null : (
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <CustomTooltips title="Pdf Download">
          <Button sx={{fontSize:12,color:"#ff6700"}}  onClick={pdfdownload}>PDF</Button>
            </CustomTooltips> 
            

            <CustomTooltips title="Excel Download">
            <Button sx={{fontSize:12,color:"#ff6700"}} onClick={Exceldownload}>EXCEL</Button>
            </CustomTooltips>

            
        <CustomTooltips title="FILTER LIST">
            <IconButton onClick={onFilterClick}>
              <FaFilter fontSize="small"  style={{color:"#ff6700"}} />
            </IconButton>
          </CustomTooltips>
          </Box>
         
        )}
      </Box>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  // sx={{color:"#1A4198"}}