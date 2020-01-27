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


const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

export default function CustomTable(props) {
  const classes = useStyles();
    let rows = props.rows;
  return (
       <div>
        <h5>Upload Document</h5>
         <hr className={styles.marginHr}></hr>
         <main className={styles1.App}>
             <h6>Attach Document</h6>
         </main>
         <TableContainer component={Paper}>
           <Table className={classes.table} size="small" aria-label="a dense table">
             <TableHead>
               <TableRow>
                 <TableCell>Values</TableCell>
                 <TableCell>Weights</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {rows.map(row => (
                 <TableRow key={row.x}>
                   <TableCell>{row.x}</TableCell>
                   <TableCell>{row.y}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
        </div>
  );
}