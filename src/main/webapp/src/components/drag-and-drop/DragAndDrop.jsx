import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import Dropzone from "./Dropzone";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {forEach} from "react-bootstrap/cjs/ElementChildren";

export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: null,
            uploadError: null,
            message: null,
            age: '',
            setAge: '',
            open: false,
            setOpen: false,
            values: [],
            sample: null
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handle = this.handle.bind(this);
    }

    handleClose() {
        this.setState({"open": false});
    }

    handleOpen() {
        this.setState({"open": true});
    }

    handle(event) {
        this.setState({"sample": event.target.value});
    }

    printFile(acceptedFiles) {
        console.log(acceptedFiles);
        acceptedFiles.map(file => {
            let formData = new FormData();
            formData.append("file", file);
            this.setState({"formData": formData});
            let reader = new FileReader();

            console.log(file);

            reader.onload = function(e) {
                let content = reader.result;
                alert(content);
            }
        });
        this.props.passedFunction(this.state.formData);
    }

    render() {
        let data = this.props.data;
        let array = [];

        return(
            <Fragment>
                <h5>Upload Document</h5>
                <hr className={styles.marginHr}></hr>
                <Dropzone onDrop={acceptedFiles => this.printFile(acceptedFiles)} accept={".csv"} />
                <FormControl style={{paddingTop: 50}} fullWidth>
                    <p style={{fontSize: 24, alignSelf: 'center'}}>Select Data Sample</p>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={this.state.open}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.sample}
                        onChange={this.props.handleChange}
                    >
                        <MenuItem value="Select Sample">
                            <em>Select Sample</em>
                        </MenuItem>
                        {
                            data.map((value, index) => (
                                <MenuItem value={value.id}>{'Sample ' + value.id}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Fragment>
        )
    }

}