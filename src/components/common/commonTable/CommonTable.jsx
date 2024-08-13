import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  FormControl,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import TablePaginationCutom from "../customPagination/TablePaginationCustom";

export default function CommonTable({
  rows,
  headCells,
  onclickHandler,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onChangePagePagination,
  pagination,
  isCheckbox = false,
  selected = [],
  handleSelectAllClick,
  handleClickOnCheckbox
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  console.log(selected, "selected");
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      rows
    } = props;


    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead
        sx={{
          backgroundColor: "#FFF5D6",
          // border: "1px solid #E8E8E8",
          "& .MuiTableCell-root": { borderBottom: "none" },
        }}
      >
        <TableRow>
          {isCheckbox && rows.length > 0 && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={numSelected === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ fontSize: "14px", p: "12px 16px" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{}}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            rows={rows}
          />
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(e) =>
                      onclickHandler && onclickHandler(row, row.id)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    {isCheckbox && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event) => handleClickOnCheckbox(event, row.id)}
                          inputProps={
                            {
                              // "aria-labelledby": labelId,
                            }
                          }
                        />
                      </TableCell>
                    )}
                    {headCells.map((headCell) => {
                      return (
                        <>
                          <TableCell
                            key={headCell.id}
                            // align={headCell.numeric ? "right" : "left"}
                            // padding={headCell.disablePadding ? "none" : "normal"}
                            sx={{
                              color: "secondary.main",
                              opacity: headCell?.renderCell ? 1 : "0.7",
                              fontSize: "14px",
                            }}
                          >
                            {headCell?.renderCell
                              ? headCell.renderCell(row, index)
                              : row[headCell.id]}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headCells.length}
                  sx={{ textAlign: "center", p: 2 }}
                >
                  <Typography variant="subtitle2">No data found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination?.totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      /> */}

      {pagination && rows.length > 0 && (
        <TablePaginationCutom
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          pagination={pagination}
          onChangePagePagination={onChangePagePagination}
        />
      )}
    </Box>
  );
}
