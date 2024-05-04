import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { downloadExcel } from 'react-export-table-to-excel';
import EnhancedTableHead from './TableHelpers/TableHead';
import { filteredArray, getComparator, stableSort } from './TableHelpers/HelperFunctions';
import CustomPopover from '../CustomPopover/CustomPopover';
import FilteredItem from './TableHelpers/FilteredItem';
import { IconButton } from '@mui/material';;
import { useTheme } from '@emotion/react';
import CustomTooltips from '../CustomTooltips/CustomTooltips';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import CustomToolBar from './TableHelpers/CustomToolBar';
import { GlobalStyles } from '../../styles/GlobalStyles';

const CustomTable=({sortBy,onEditClick,onDeleteClick,isActionRequired,isSelected,handleClick,handleSelectAllClick,selected,onRowClick,headCells,rows,isCheckBoxRequird,isSelectItemRequired,TableName})=>{
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(sortBy?sortBy:"");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const[filterItem,setFilterItem]=React.useState({columns:"", operators:"",filterValue:""})
const theme=useTheme()
  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
    const visibleRows = React.useMemo(() =>filteredArray(stableSort(rows, getComparator(order, orderBy)),filterItem.columns,filterItem.operators,filterItem.filterValue)?.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage)
      ,[order, orderBy, page, rowsPerPage,filterItem.columns,filterItem.filterValue,rows,filterItem.operators],
    );
    


const [popoverOpen,setPopOverOpen]=React.useState(false)
const [popoveranchorEl,setpopoveranchorEl]=React.useState(null)
const handleFilterClick=(e)=>{setPopOverOpen(!popoverOpen)
  setpopoveranchorEl(e.currentTarget)

}

const emptyFunc=()=>{}

const doc = new jsPDF()
const pdfDownload=()=>{
  autoTable(doc, {
    theme:"grid",
   headStyles:{fillColor:`${theme?.palette?.primary?.main}`,fontSize:8},
   margin:{bottom:5,horizontal:5,left:5,right:5,top:5,vertical:5},
    head: [ headCells?.map((item)=>item?.label?.toUpperCase())],
    body: 
    rows?.map((row)=>{
      let arr=[]
      headCells?.map((myrow)=>arr?.push(row[myrow?.id]))
     return arr

     })
    ,
  })
  
  doc.save(`${TableName}.pdf`)
}


const Exceldownload=()=>{

  downloadExcel({
    fileName: `${TableName}`,
    sheet: "react-export-table-to-excel",
    tablePayload: {
      header: headCells?.map((item)=>item?.label?.toUpperCase()),
      body: rows?.map((row)=>{
        let arr=[]
          headCells?.map((myrow)=>arr?.push(row[myrow?.id]))
       return arr
  
       }),


    }
  });
}





  return (
    <Box sx={{ width: '100%',".MuiTablePagination-root":{height:35,overflow:"hidden",display:"flex",justifyContent:"flex-end",alignItems:"center",alignContent:"center"}}}>
     
     <CustomToolBar TableName={TableName} numSelected={selected?selected?.length:0} onFilterClick={handleFilterClick} pdfdownload={pdfDownload} Exceldownload={Exceldownload} />

      <Paper elevation={0} sx={{ width: '100%'}}>
        <TableContainer sx={{overflow:"auto"}}>
          <Table stickyHeader aria-labelledby="tableTitle" sx={{  "&:last-child":{borderRight:"1px solid rgb(213,218,222)",borderBottom:"1px solid rgb(213,218,222)"}}}>
            <EnhancedTableHead
              headCells={headCells}
              isCheckBoxRequird={isCheckBoxRequird}
              numSelected={selected?selected?.length:0}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e)=>{handleSelectAllClick?handleSelectAllClick(e,rows):emptyFunc()}}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              isActionRequired={isActionRequired}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected =isSelected? isSelected(row):emptyFunc();
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => {{handleClick?handleClick(event, row):emptyFunc()};{onRowClick?onRowClick(row):emptyFunc()}}}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                   
                    sx={{
                      ".MuiTableCell-root":{
                        padding:"0.15rem",
                        margin:0,
                        fontSize:"0.81rem",
                        fontWeight:"700",
                        textAlign:"center",
                        border:"1px solid rgb(213,218,222)",
                        borderBottom:"0px",
                        borderRight:"0px",
                      },
                      cursor: 'pointer'
                    }}
                  >


{
  isCheckBoxRequird? <TableCell  >
  <Checkbox
    color="primary"
    checked={isItemSelected}
    inputProps={{
      'aria-labelledby': labelId,
    }}
  />
</TableCell>:null
}      
                  {
                    headCells?.map((itemCol,index)=>{
                    
                     

                      return(
                      <TableCell  size='small' id={labelId}>
                        <Box sx={{ml:itemCol?.columnType==="string" || itemCol?.columnType==="date" && 1,mr:itemCol?.columnType==="number" && 0.5,display:"flex",justifyContent:itemCol?.columnType==="number" ? "flex-end": itemCol?.columnType==="string" || itemCol?.columnType==="date"?"flex-start":"center",alignItems:"center"}}>
                        {row[itemCol?.id]}
                        </Box>
                     
                    </TableCell>
                      )
                    })
                  }

{
  isActionRequired?<TableCell sx={{textAlign:"center"}} size='small'>

<CustomTooltips title="EDIT">
<IconButton sx={{p:0}} color="primary" onClick={(e)=>onEditClick?onEditClick(row):emptyFunc()}>
                        <CiEdit fontSize={18}  />
                      </IconButton>
  </CustomTooltips>     
  <CustomTooltips title="DELETE">
  <IconButton sx={{p:0,ml:0.5}} color="error"  onClick={(e)=>onDeleteClick?onDeleteClick(row):emptyFunc()}>
                        <MdDeleteForever  fontSize={18} />
                      </IconButton>
    </CustomTooltips>   

                     

  </TableCell>:null
}

                  </TableRow>
                );
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination

         sx={{display:"flex",justifyContent:"flex-end",alignItems:"center", borderLeft:"1px solid rgb(213,218,222)", borderRight:"1px solid rgb(213,218,222)", borderBottom:"1px solid rgb(213,218,222)",
        ".MuiTablePagination-selectLabel":{fontSize:14,fontWeight:"900!important",color:theme?.palette?.p2?.main},
        ".MuiInputBase-root":{mt:0.5,fontSize:14,fontWeight:"900!important",color:theme?.palette?.p2?.main},
        ".MuiTablePagination-displayedRows":{fontSize:14,fontWeight:"900!important",color:theme?.palette?.p2?.main},
        ".MuiTablePagination-select":{fontSize:14,fontWeight:"900!important",color:theme?.palette?.p2?.main},
        ".MuiTablePagination-selectIcon":{height:11},
        ".MuiSvgIcon-root":{fontSize:14,fontWeight:"900!important",color:theme?.palette?.p2?.main},
     
      }}

          rowsPerPageOptions={[10, 50,100,250, 500]}
          component="div"
          labelRowsPerPage={"selected rows"}
          showFirstButton={true}
          showLastButton={true}
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

<CustomPopover open={popoverOpen} anchorEl={popoveranchorEl} onClose={()=>{setPopOverOpen(!popoverOpen)}} id={"filterPopover"} key={"filterPopover"} >
<FilteredItem headCells={headCells} key={"filteredItem"} customFilter={{filterItem,setFilterItem}} />

</CustomPopover>
    </Box>
  );
}



export default CustomTable;