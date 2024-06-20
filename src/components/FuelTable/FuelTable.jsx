import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import EnhancedTableHead from "./TableHelpers/TableHead";
import { IsArrayTable, filteredArray, getComparator, stableSort, } from "./TableHelpers/HelperFunctions";
import CustomPopover from "../CustomPopover/CustomPopover";
import FilteredItem from "./TableHelpers/FilteredItem";
import { IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomTooltips from "../CustomTooltips/CustomTooltips";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import CustomToolBar from "./TableHelpers/CustomToolBar";
import * as XLSX from "xlsx";

const FuelTable = ({
  sortBy, onEditClick, onDeleteClick, isActionRequired, isCheckBoxSelected, onIndividualCheckBoxClick,
  onSelectAllCheckbox, selectedCheckbox, onRowClick, headCells, rows, isCheckBoxRequird, TableName, isEditNotRequired,FilterdRow,isPdfNotRequired}) => {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(sortBy ? sortBy : "");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterItem, setFilterItem] = React.useState({ columns: "", operators: "", filterValue: "", });
  const theme = useTheme();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() =>
    filteredArray(stableSort(IsArrayTable(rows) ? rows : [], getComparator(order, orderBy)), filterItem.columns, filterItem.operators, filterItem.filterValue)?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filterItem.columns, filterItem.filterValue, rows, filterItem.operators,]);

  const [popoverOpen, setPopOverOpen] = React.useState(false);
  const [popoveranchorEl, setpopoveranchorEl] = React.useState(null);
  const handleFilterClick = (e) => { setPopOverOpen(!popoverOpen); setpopoveranchorEl(e.currentTarget); };
  const doc = new jsPDF();
  const pdfDownload = () => {
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        fillColor: `${theme?.palette?.p1?.main}`,
        fontSize: 8,
      },
      margin: {
        bottom: 5,
        horizontal: 5,
        left: 5,
        right: 5,
        top: 5,
        vertical: 5,
      },
      head: [headCells?.map((item) => item?.label)],
      body: rows?.map((row) => {
        let arr = [];
        headCells?.map((myrow) => arr?.push(row[myrow?.id]));
        return arr;
      }),
    });

    doc.save(TableName?`${TableName}.pdf`:"Fino.pdf");
  };

  const Exceldownload = () => {
    const header = IsArrayTable(headCells) ? headCells?.map((item) => item?.label) : [];
    const body = IsArrayTable(rows) ? rows?.map((row) => { const alteredRows = {}; IsArrayTable(headCells) && headCells?.map((head, index) => (alteredRows[head?.id] = row[head?.id])); return alteredRows; }) : []
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(workSheet, [header]);
    XLSX.utils.sheet_add_json(workSheet, body, { skipHeader: true, origin: "A2" });
    XLSX.utils.book_append_sheet(workBook, workSheet, TableName ? TableName : "Fino")
    XLSX.writeFile(workBook, TableName ? `${TableName}.xlsx` : "Fino.xlsx")
  };

  return (
    <Box
      sx={{
        width: "100%", ".MuiTablePagination-root": {
          height: 35, overflow: "hidden", display: "flex",
          justifyContent: "flex-end", alignItems: "center", alignContent: "center",
        },
      }}>
      <CustomToolBar
        TableName={TableName}
        numSelected={selectedCheckbox ? selectedCheckbox?.length : 0}
        onFilterClick={handleFilterClick}
        pdfdownload={pdfDownload}
        Exceldownload={Exceldownload}
        isPdfNotRequired={isPdfNotRequired}
      />

      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ overflow: "auto" }}>
          <Table stickyHeader aria-labelledby="tableTitle"
            sx={{ "&:last-child": { borderRight: "1px solid rgb(213,218,222)", borderBottom: "1px solid rgb(213,218,222)", }, }}>
            <EnhancedTableHead
              headCells={headCells}
              isCheckBoxRequird={isCheckBoxRequird}
              numSelected={selectedCheckbox ? selectedCheckbox?.length : 0}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows && rows?.length}
              isActionRequired={isActionRequired}
              onSelectAllCheckbox={(e) => { onSelectAllCheckbox && onSelectAllCheckbox(e, rows) }}
            />
            <TableBody>
              {IsArrayTable(visibleRows) && visibleRows?.map((row, index) => {
                const isItemSelected = isCheckBoxSelected && isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => {
                      onIndividualCheckBoxClick && onIndividualCheckBoxClick(event, row);
                      onRowClick && onRowClick(row);
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{
                      ".MuiTableCell-root": {
                        padding: "0.15rem",
                        margin: 0,
                        fontSize: "0.81rem",
                        fontWeight: "700",
                        textAlign: "center",
                        border: "1px solid rgb(213,218,222)",
                        borderBottom: "0px",
                        borderRight: "0px",
                      },
                      cursor: "pointer",
                    }}
                  >
                    {isCheckBoxRequird ? (
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {IsArrayTable(headCells) && headCells?.map((itemCol, index) => {
                      return (
                        <TableCell size="small" id={labelId}>
                          <Box
                            sx={{
                              ml:
                                itemCol?.columnType === "string" ||
                                (itemCol?.columnType === "date" && 1),
                              mr: itemCol?.columnType === "number" && 0.5,
                              display: "flex",
                              justifyContent:
                                itemCol?.columnType === "number"
                                  ? "flex-end"
                                  : itemCol?.columnType === "string" ||
                                    itemCol?.columnType === "date"
                                    ? "flex-start"
                                    : "center",
                              alignItems: "center",
                            }}
                          >
                            {row[itemCol?.id]}
                          </Box>
                        </TableCell>
                      );
                    })}

                    {isActionRequired ? (
                      <TableCell sx={{ textAlign: "center" }} size="small">
                        {
                          isEditNotRequired ? null : <CustomTooltips title="EDIT">
                            <IconButton
                              sx={{ p: 0 }}
                              color="primary"
                              onClick={(e) => { onEditClick && onEditClick(row); }}
                            >
                              <CiEdit fontSize={18} />
                            </IconButton>
                          </CustomTooltips>
                        }
                        <CustomTooltips title="DELETE">
                          <IconButton
                            sx={{ p: 0, ml: 0.5 }}
                            color="error"
                            onClick={(e) => { onDeleteClick && onDeleteClick(row); }}
                          >
                            <MdDeleteForever fontSize={18} />
                          </IconButton>
                        </CustomTooltips>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderLeft: "1px solid rgb(213,218,222)",
            borderRight: "1px solid rgb(213,218,222)",
            borderBottom: "1px solid rgb(213,218,222)",
            ".MuiTablePagination-selectLabel": {
              fontSize: 14,
              fontWeight: "900!important",
              color: theme?.palette?.p1?.main,
            },
            ".MuiInputBase-root": {
              mt: 0.5,
              fontSize: 14,
              fontWeight: "900!important",
              color: theme?.palette?.p1?.main,
            },
            ".MuiTablePagination-displayedRows": {
              fontSize: 14,
              fontWeight: "900!important",
              color: theme?.palette?.p1?.main,
            },
            ".MuiTablePagination-select": {
              fontSize: 14,
              fontWeight: "900!important",
              color: theme?.palette?.p1?.main,
            },
            ".MuiTablePagination-selectIcon": { height: 11 },
            ".MuiSvgIcon-root": {
              fontSize: 14,
              fontWeight: "900!important",
              color: theme?.palette?.p1?.main,
            },
          }}
          rowsPerPageOptions={[10, 50, 100, 250, 500]}
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

      <CustomPopover
        open={popoverOpen}
        anchorEl={popoveranchorEl}
        onClose={() => {
          setPopOverOpen(!popoverOpen);
        }}
        id={"filterPopover"}
        key={"filterPopover"}
      >
        <FilteredItem
          headCells={FilterdRow?FilterdRow:headCells}
          key={"filteredItem"}
          customFilter={{ filterItem, setFilterItem }}
        />
      </CustomPopover>
    </Box>
  );
};

export default FuelTable;
