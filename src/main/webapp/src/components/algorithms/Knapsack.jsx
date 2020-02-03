import React, {Component, Fragment, useCallback} from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import styles from "../../static/signup.module.css";
import CustomizedSteppers from "../layout/CustomizedSteppers";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import CustomGraph from "../graphs/CustomGraph";
import CustomTable from "../layout/CustomTable";
import InstructionsPanel from "../layout/InstructionsPanel";
import ResultCompleted from "../layout/ResultCompleted";
const axios = require('axios');
import { withRouter } from 'react-router-dom';
import {CustomizedAlert} from "../errors/CustomizedAlert";
import TableContainer from "@material-ui/core/TableContainer";

export class Knapsack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            formData: null,
            packedItems: [],
            uploadError: null,
            message: null,
            saveMessage: null,
            value: null,
            path: null,
            componentName: null,
            totalValue: null,
            totalWeight: null,
            capacities: null
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getResult = this.getResult.bind(this);
        this.saveExperiment = this.saveExperiment.bind(this);
    }

    /* Pass Function to Drag And Drop to get Data */
    passedForDragAndDrop(formData) {
        console.log("Passed !");
        this.setState({"formData": formData});
        this.getInitialData();
    }

    getInitialData() {
        axios.post(SERVICE_URL + '/knapsack/data' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({uploadError: 'success'});
            this.setState({message: 'You have uploaded the file successfully !'});
            this.setState({results: response.data.value0});
            this.setState({capacities: response.data.value1});
            this.getResult();
        },
        (error) => {
            console.log("error with data upload");
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
        });

    }

    getResult() {
        axios.post(SERVICE_URL + '/knapsack/result' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({totalValue: response.data.totalValue});
            this.setState({totalWeight: response.data.totalWeight});
            this.setState({});
            this.setState({packedItems: response.data.packedItems});
            let temp = JSON.parse(JSON.stringify(this.state.results));
            response.data.packedItems.map((item) => {
                temp[item].color = 0.3;
            });
            this.setState({packedItems: temp});
        },
        (error) => {
            console.log("error");
        });
    }

    saveExperiment() {
        axios.post(SERVICE_URL + '/experiments' , {username:  localStorage.getItem('username_info'), algorithmName: "Knapsack", date: new Date(), data: JSON.stringify(this.state.results)}, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            let message = "You have saved the experiment successfully. Go to ";
            this.setState({saveMessage: message});
            this.setState({value: "success"});
            this.setState({path: "/"});
            this.setState({componentName: "Homepage"});
        },
        (error) => {
            console.log("error");
            this.setState({saveMessage: "Oops, something went wrong."});
            this.setState({value: "danger"});
            this.setState({path: "/"});
            this.setState({componentName: "Homepage"});
        });
    }

    render() {
        return (
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,OR Tools,Knapsack" title="Knapsack" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                        </Grid>
                        <CustomizedSteppers first={<DragAndDrop passedFunction={this.passedForDragAndDrop}/>}
                                            second={<CustomGraph data={this.state.results} />}
                                            third={<CustomTable rows={this.state.results} checkResult={false} capacities={this.state.capacities} />}
                                            fourth={<CustomGraph data={this.state.packedItems}/>}
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

export default withRouter(Knapsack);