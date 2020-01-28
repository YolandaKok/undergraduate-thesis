import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import styles1 from "../../static/dropzone.module.css";
import Dropzone from "./Dropzone";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: null,
            uploadError: null,
            message: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ uploadError: nextProps.uploadError });
        this.setState({ message: nextProps.message });
    }

    printFile(acceptedFiles) {
        console.log(acceptedFiles);
        acceptedFiles.map(file => {
            let formData = new FormData();
            formData.append("file", file);
            this.setState({"formData": formData});
            let reader = new FileReader();

            reader.onload = function(e) {
                let content = reader.result;

                alert(content);
            }
        });
        this.props.passedFunction(this.state.formData);
    }

    render() {
        return(
            <Fragment>
                <h5>Upload Document</h5>
                <hr className={styles.marginHr}></hr>
                <h6>Attach Document</h6>
                <TableContainer component={Paper}>
                <main className={styles1.App}>
                    <Dropzone onDrop={acceptedFiles => this.printFile(acceptedFiles)} accept={".csv"} />
                    <h6>Accepted file types: .csv</h6>
                </main>
                <CustomizedAlert value={this.state.uploadError}
                                 message={this.state.message}></CustomizedAlert>
                </TableContainer>
            </Fragment>
        )
    }

}