import React, {Component, Fragment} from 'react';
import {ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink} from 'react-vis-force';
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
import SimpleTable from "../layout/SimpleTable";
import RouteGraph from "../graphs/RouteGraph";
const axios = require('axios');

export class TSP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadError: null,
            message: null,
            samples: [],
            distanceMatrix: [[]],
            cities: [],
            saveMessage: null,
            value: null,
            path: null,
            componentName: null
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
    }

    componentDidMount() {
        document.body.style.background = "white";
        console.log(SERVICE_URL);
    }

    componentWillMount() {

    }

    passedForDragAndDrop(formData) {
        this.setState({"formData": formData});
        this.getInitialData();
    }

    handleChange(event) {
        this.setState({"sampleId": event.target.value});
        console.log("Id: " + event.target.value);

    }

    getInitialData() {
        axios.post(SERVICE_URL + '/tsp/data' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({uploadError: 'success'});
            this.setState({message: 'You have uploaded the file successfully !'});
            this.setState({distanceMatrix: response.data.value0});
            this.setState({cities: response.data.value1});

            let message = "You have saved the experiment successfully. Go to ";
            this.setState({saveMessage: message});
            this.setState({value: "success"});
            this.setState({path: "/"});
            this.setState({componentName: "Homepage"});

            this.getResult();
        },
        (error) => {
            console.log("error with data upload");
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
        });
    }

    getResult() {
        let obj = {"distances": this.state.distanceMatrix}
        axios.post(SERVICE_URL + '/tsp/result' , obj, {
            headers: {"Authorization": localStorage.getItem('authorization')}
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
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,OR Tools,Travelling Salesman" title="Travelling Salesman" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                            <CustomizedSteppers
                                steps={["Upload Document", "Show Result"]}
                                first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                third={<SimpleTable rows={this.state.distanceMatrix} headers={this.state.cities}/>}
                                second={<RouteGraph/>}
                                fifth={<InstructionsPanel/>}
                                completed={<ResultCompleted message={this.state.saveMessage}
                                                            value={this.state.value}
                                                            path={this.state.path}
                                                            componentName={this.state.componentName}
                                                            uploadMessage={this.state.message}/>}
                            />
                        </Grid>

                        {/*<CustomizedSteppers first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}*/}
                        {/*                    second={<CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'} />}*/}
                        {/*                    third={<CustomTable rows={this.state.results} checkResult={false} capacities={this.state.capacities} extraColumns={[]} extraColumnValues={[]} extraRows={this.state.extraRowsInitial}/>}*/}
                        {/*                    fourth={<CustomGraph data={this.state.packedItems} titleX={'Values'} titleY={'Weights'}/>}*/}
                        {/*                    finish={this.saveExperiment}*/}
                        {/*                    fifth={<InstructionsPanel/>}*/}
                        {/*                    sixth={<CustomTable rows={this.state.packedItems} checkResult={true}*/}
                        {/*                                        extraColumns={['Result']}*/}
                        {/*                                        totalValue={this.state.totalValue}*/}
                        {/*                                        totalWeight={this.state.totalWeight}*/}
                        {/*                                        extraColumnValues={this.state.extraColumnValues}*/}
                        {/*                                        extraRows={this.state.extraRowsFinal}*/}
                        {/*                    />}*/}
                        {/*                    completed={<ResultCompleted message={this.state.saveMessage}*/}
                        {/*                                                value={this.state.value}*/}
                        {/*                                                path={this.state.path}*/}
                        {/*                                                componentName={this.state.componentName}*/}
                        {/*                                                uploadMessage={this.state.message}/>}*/}
                        {/*/>*/}
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default TSP;

