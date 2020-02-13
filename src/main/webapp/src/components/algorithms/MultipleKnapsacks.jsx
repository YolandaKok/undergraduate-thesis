import React, {Component, Fragment} from 'react';
import '../../../node_modules/react-vis/dist/style.css';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import CustomizedSteppers from "../layout/CustomizedSteppers";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import CustomGraph from "../graphs/CustomGraph";
import CustomTable from "../layout/CustomTable";
import InstructionsPanel from "../layout/InstructionsPanel";
import ResultCompleted from "../layout/ResultCompleted";
const axios = require('axios');

export class MultipleKnapsacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            formData: null,
            uploadError: null,
            message: null,
            saveMessage: null,
            value: null,
            path: null,
            componentName: null,
            samples: [],
            packedItems: []
        };

        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);

    }

    passedForDragAndDrop(formData) {
        this.setState({"formData": formData});
        this.getInitialData();
    }

    getInitialData() {
        axios.post(SERVICE_URL + '/multiple/knapsacks/data' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({uploadError: 'success'});
            this.setState({message: 'You have uploaded the file successfully !'});
            this.setState({results: response.data.initialData});
            this.getResult();
        },
        (error) => {
            console.log("error with data upload");
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
        });
    }

    getResult() {
        axios.post(SERVICE_URL + '/multiple/knapsacks/result' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            console.log(response.data.bins);
            let items = [];
            for(let i = 0; i < response.data.bins.length; i++) {
                for(let j = 0; j < response.data.bins[i].points.length; j++) {
                    items.push(response.data.bins[i].points[j]);
                }
            }
            console.log(items);
            this.setState({"packedItems": items});
        },
        (error) => {
            console.log("error");
        });
    }

    render() {
        return (
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,OR Tools,Multiple Knapsacks" title="Multiple Knapsacks" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                        </Grid>
                        <CustomizedSteppers first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                            second={<CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'} />}
                                            third={<CustomTable rows={this.state.results} checkResult={false} />}
                                            fourth={<CustomGraph data={this.state.packedItems} titleX={'Values'} titleY={'Weights'}/>}
                                            finish={this.saveExperiment}
                                            fifth={<InstructionsPanel/>}
                                            sixth={<CustomTable rows={this.state.packedItems} checkResult={true}
                                                                totalValue={this.state.totalValue}
                                                                totalWeight={this.state.totalWeight}/>}
                                            completed={<ResultCompleted message={this.state.saveMessage}
                                                                        value={this.state.value}
                                                                        path={this.state.path}
                                                                        componentName={this.state.componentName}
                                                                        uploadMessage={this.state.message}/>}
                        />
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default MultipleKnapsacks;