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

function CustomTable(props) {

    const classes = useStyles();
    let rows = props.rows;
    let headers = props.headers;
    let title = props.title;
    if(props.result != null)
        console.log("R: " + props.result[0][0]);
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
                            {props.noHeaders ? '' : <TableCell></TableCell>}
                            {
                                headers.map((item) => {
                                    return(<TableCell style={{fontWeight: "bold"}}>{item}</TableCell>);
                                })
                            }
                        </TableRow>
                        {rows.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        { props.noHeaders ? '' : <TableCell style={{fontWeight: "bold"}}>{headers[index]}</TableCell>}
                                        {
                                            row.map((item, index) => {
                                                return (<TableCell>{item}</TableCell>);
                                            })
                                        }
                                    </TableRow>
                                );
                            })
                        }

                        {
                            !props.noHeaders ? '' : <TableRow>
                                                        <TableCell style={{fontWeight: "bold"}}>Solution</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                        }

                        {
                            !props.noHeaders ? '' : <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>Optimal X</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>{props.result != null ? (Math.round(props.result[1][0] * 100) / 100).toFixed(2) : ''}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        }

                        {
                            !props.noHeaders ? '' : <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>Optimal Y</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>{props.result != null ? (Math.round(props.result[1][1] * 100) / 100).toFixed(2) : ''}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        }

                        {
                            !props.noHeaders ? '' : <TableRow>
                                <TableCell style={{fontWeight: "bold"}}>Optimal Objective Value</TableCell>
                                <TableCell style={{fontWeight: "bold"}}>{(Math.round(props.optimalValue * 100) / 100).toFixed(2)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CustomTable;