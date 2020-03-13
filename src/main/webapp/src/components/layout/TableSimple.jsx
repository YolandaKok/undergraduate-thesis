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

const useStyles = makeStyles({
    table: {
        minWidth: 350,
        minHeight: 200
    },
});

function TableSimple(props) {

    const classes = useStyles();
    let rows = props.rows;
    let headers = props.headers;
    let title = props.title;
    return (
        <div>
            <h5>{title}</h5>
            <hr className={styles.marginHr}></hr>
            <main className={styles1.App}>
            </main>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            {
                                headers.map((item) => {
                                    return(<TableCell style={{fontWeight: "bold"}}>{item}</TableCell>);
                                })
                            }
                        </TableRow>
                        {rows.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    {
                                        row.map((item, index) => {
                                            return (<TableCell>{item}</TableCell>);
                                        })
                                    }
                                </TableRow>
                            );
                        })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableSimple;