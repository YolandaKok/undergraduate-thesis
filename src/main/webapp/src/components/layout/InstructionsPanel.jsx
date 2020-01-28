import React, {Fragment} from 'react';
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import styles from '../../static/textarea.module.css';
import styles1 from '../../static/signup.module.css';
import styles2 from '../../static/dropzone.module.css';
import Dropzone from "../drag-and-drop/Dropzone";
import TableContainer from "@material-ui/core/TableContainer";
import {CustomizedAlert} from "../errors/CustomizedAlert";


export default function CustomTable(props) {
    return(
        <Fragment>
            <h5>Document Layout</h5>
            <hr className={styles1.marginHr}></hr>
            <h6>Example Data</h6>
            <TableContainer component={Paper}>
                <main className={styles2.App}>
                    <div className={styles2.dropzone}>
                        <div>
                            <p>
                                File Format: values, weights
                            </p>
                        </div>
                    </div>
                    <h6>Accepted file types: .csv</h6>
                </main>
            </TableContainer>
        </Fragment>
    );
}