import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from "../../static/signup.module.css";
import styles1 from "../../static/dropzone.module.css";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";

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

function TableSimple(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 8));
        setPage(0);
    };

    const classes = useStyles();
    let rows = props.rows;
    let headers = props.headers;
    let title = props.title;
    let count = props.count;
    return (
        <div>
            <h5>{title}</h5>
            <hr className={styles.marginHr}></hr>
            <main className={styles1.App}>
            </main>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Routes</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(rows)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{row[0]}</TableCell>
                                    {
                                        row[0] == 'Routes' ? <TableCell>{
                                            row[1].map((item, index) => {
                                            return(<TableRow>{index + 1}. {item}</TableRow>)
                                        })}
                                        </TableCell> : <TableCell>{row[1]}</TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 8, 12]}
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

export default TableSimple;