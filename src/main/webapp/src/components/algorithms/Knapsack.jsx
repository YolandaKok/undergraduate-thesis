import React, {Component, Fragment, useCallback} from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import styles from "../../static/signup.module.css";
import CustomizedSteppers from "../layout/CustomizedSteppers";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import CustomGraph from "../graphs/CustomGraph";
const axios = require('axios');

export class Knapsack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            formData: null
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    /* Pass Function to Drag And Drop to get Data */
    passedForDragAndDrop(formData) {
        console.log("Passed !");
        this.setState({"formData": formData});
        this.getResult();
    }

    getResult() {
        axios.post(SERVICE_URL + '/test/knapsack' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
            .then((response) => {
                    console.log(response);
                },
                (error) => {
                    console.log("error");
                });

    }

    render() {
        return (
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding} justify="center">
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,OR Tools,Knapsack" title="Knapsack" />
                        </Grid>
                        <Grid item xs={12} md={12} lg={9} xl={9}>
                            <CustomizedSteppers first={<DragAndDrop passedFunction={this.passedForDragAndDrop}/>} second={<CustomGraph/>}/>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default Knapsack;