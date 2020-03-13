import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import styles from '../../static/textarea.module.css';
import styles1 from '../../static/signup.module.css';
import styles2 from '../../static/dropzone.module.css';
import Dropzone from "../drag-and-drop/Dropzone";
import TableContainer from "@material-ui/core/TableContainer";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
});

export default function CustomTable(props) {

    const classes = useStyles();
    let headers = props.headers;
    let instructionsData = props.data;
    return(
        <Fragment>
            <h5>Document Layout</h5>
            <hr className={styles1.marginHr}></hr>
            <TableContainer>
                <p style={{padding: 16, fontWeight: "bold"}}>Document should have the following layout: <br></br>
                The fields are semicolon separated.
                </p>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {
                                headers.map((item, index) => {
                                    return(
                                        <TableCell>{item}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            instructionsData.map((item, index) => {
                                return(
                                    <TableRow>
                                        {
                                            item.map((cellItem, index) => {
                                                return(<TableCell>{cellItem}</TableCell>)
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    {
                        props.moreInfo ? <p style={{padding: 16, fontWeight: "bold", fontSize: 10}}>The parameters are:
                            1. Number of vehicles
                            2. Max arc distance in meters
                            3. Starting Point Index</p> : ''
                    }

                </Table>
            </TableContainer>
        </Fragment>
    );
}