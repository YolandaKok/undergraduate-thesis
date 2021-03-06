import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from "../../static/signup.module.css";
import styles1 from "../../static/dropzone.module.css";
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    minHeight: 200
  },
});

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function CustomTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const classes = useStyles();
  let rows = props.rows;
  let columns = props.extraColumns;
  let extraColumnValues = props.extraColumnValues;
  let extraRows = props.extraRows;

  for(let i = 0; i < rows.length; i++) {
    rows[i].extraValue = extraColumnValues[i];
  }
  console.log("TotalValue: " + props.totalValue);
  console.log("TotalValue: " + props.totalWeight);
  return (
       <div>
        <h5>Uploaded Values</h5>
         <hr className={styles.marginHr}></hr>
         <main className={styles1.App}>
         </main>
         <TableContainer component={Paper}>
           <Table className={classes.table} size="small" aria-label="a dense table">
             <TableHead>
               <TableRow>
                 <TableCell>Values</TableCell>
                 <TableCell>Weights</TableCell>
                 {columns != undefined ? columns.map((item, index) => ( <TableCell>{item}</TableCell>)) : ''}
               </TableRow>
             </TableHead>
             <TableBody>
               {stableSort(rows)
                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map((row, index) => {
                   return (
                     <TableRow key={index}>
                       <TableCell>{row.x}</TableCell>
                       <TableCell>{row.y}</TableCell>
                       {row.extraValue != undefined ? <TableCell>{row.extraValue}</TableCell> : ''}
                     </TableRow>
                   );
                 })}
                 {  extraRows != undefined ? extraRows.map((item, index) => (
                        <TableRow>
                            {item.x != undefined ? <TableCell style={{fontWeight: 'bold'}}>{item.x}</TableCell> : ''}
                            {item.y != undefined ? <TableCell style={{fontWeight: 'bold'}}>{item.y}</TableCell> : ''}
                            {item.z != undefined ? <TableCell style={{fontWeight: 'bold'}}>{item.z}</TableCell> : ''}
                        </TableRow>
                    )) : ''
                 }
             </TableBody>
           </Table>
         </TableContainer>
         <TablePagination
           rowsPerPageOptions={[5, 10, 25]}
           component="div"
           count={rows.length}
           rowsPerPage={rowsPerPage}
           page={page}
           onChangePage={handleChangePage}
           onChangeRowsPerPage={handleChangeRowsPerPage}
         />
        </div>
  );
}

export default CustomTable;