import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@emotion/react';


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };


export default function EnhancedTableHead({isCheckBoxRequird,isActionRequired,headCells,onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
 
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const theme=useTheme()
  
    return (
      <TableHead>
        <TableRow sx={{
          ".MuiTableCell-root":{
            color:theme?.palette?.p1?.main,
            padding:0.1,
            margin:0,
            // background:"#F5F6F9",
            fontWeight:"700!important",
            fontSize:"0.71rem",
            textAlign:"center",
            border:"1px solid rgb(213,218,222)",
            borderBottom:"0px",
            borderRight:"0px",
          },
          ".MuiButtonBase-root":{
            padding:"0px!important",
            margin:0
          },
          ".MuiTableSortLabel-root":{
            padding:0,
          },
          "&:last-child":{borderRight:"1px solid rgb(213,218,222)"},

        }}>

          {
            isCheckBoxRequird? <TableCell  >
            <Checkbox 
            size='small'
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
            />
          </TableCell>:null
          }
         
          
          {headCells?.map((headCell) => (
            <TableCell
              sx={{minWidth:headCell?.minWidth}}
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <Box sx={{ml:headCell?.columnType==="string" || headCell?.columnType==="date" && 1.2,mr:headCell?.columnType==="number" && 0.5,display:"flex",justifyContent:headCell?.columnType==="number" ? "flex-end":headCell?.columnType==="string" || headCell?.columnType==="date"?"flex-start":"center",alignItems:"center"}}>
              <TableSortLabel
                hideSortIcon={true}
                active={orderBy === headCell?.id}
                direction={orderBy === headCell?.id ? order : 'asc'}
                onClick={createSortHandler(headCell?.id)}
                
              >
             
               {headCell.label?.toUpperCase()}
             
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
              </Box>
            </TableCell>
          ))}

{
  isActionRequired?<TableCell size='small' >ACTIONS</TableCell>:null
}


        </TableRow>
      </TableHead>
    );
  }