import React, {Component, Fragment} from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import CustomizedSteppers from "../layout/CustomizedSteppers";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import InstructionsPanel from "../layout/InstructionsPanel";
import ResultCompleted from "../layout/ResultCompleted";
import SimpleTable from "../layout/SimpleTable";
import RouteGraph from "../graphs/RouteGraph";
import {withRouter} from "react-router-dom";
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
            componentName: null,
            routes: [],
            routeDistance: null,
            algorithmId: '',
            data: [],
            headers: ['Cities'],
            instructionsData: [['Athens'], ['Turin'], ['Berlin'], ['Frankfurt'], ['Rome'], ['Cairo']]
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.saveExperiment = this.saveExperiment.bind(this);
        this.createData = this.createData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({"algorithmId": this.props.match.params.id});
        this.getDataSamples(this.props.match.params.id);
    }

    getDataSamples(id) {
        axios.get(SERVICE_URL + '/samples/' + id , {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({"samples": response.data});
        },
        (error) => {

        });
    }

    handleChange(event) {
        this.setState({"sampleId": event.target.value});
        console.log("Id: " + event.target.value);
        console.log(this.state.samples.length);
        for(let i = 0; i < this.state.samples.length; i++) {
            if(this.state.samples[i].id == event.target.value) {
                console.log(this.state.samples);
                let finalData = JSON.parse(this.state.samples[i].dataResult);
                console.log(finalData.cities);
                this.setState({"cities": finalData.cities});
                this.setState({"distanceMatrix": finalData.distanceMatrix});
                this.setState({"data": finalData.data});
            }
        }
    }

    passedForDragAndDrop(formData) {
        this.setState({"formData": formData});
        this.getInitialData();
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
            this.setState({"routes": response.data.routes});
            this.setState({"routeDistance": response.data.totalDistance});
            this.createData(this.state.cities, this.state.routes, this.state.distanceMatrix)
        },
        (error) => {
            console.log("error");
        });
    }

    saveExperiment() {
        // Create JSON Object for initial data
        let initialData = {}
        // Json object for result data
        let resultData = {
            "cities": this.state.cities,
            "distanceMatrix": this.state.distanceMatrix,
            "data": this.state.data
        }
        axios.post(SERVICE_URL + '/experiments' , {username:  localStorage.getItem('username_info'), algorithmId: this.state.algorithmId,
            date: new Date(), data: JSON.stringify(initialData), result: JSON.stringify(resultData)}, {
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

    createData(nodes, routes, distanceMatrix) {
        let data = [];
        let i;
        let currentDistance = 0;
        for(i = 0; i < nodes.length-1; i++) {
            let obj = {
                x: currentDistance,
                y: nodes[routes[i]]
            };
            data.push(obj);
            currentDistance += distanceMatrix[routes[i]][routes[i+1]];
        }
        let obj = {
            x: currentDistance,
            y: nodes[routes[i]]
        }
        console.log('Current Distance' + currentDistance);
        data.push(obj);
        console.log(data);
        this.setState({"data": data});
        return data;
    }

    render() {
        return (
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "OR Tools", "url": "/select/algorithm"}, {"title": "Travelling Salesman", "url": ""}]} title="Travelling Salesman" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                            <CustomizedSteppers
                                steps={["Upload Document", "Show Result"]}
                                first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                third={<SimpleTable title={'Distance Matrix'} rows={this.state.distanceMatrix} headers={this.state.cities} noHeaders={false}/>}
                                second={<RouteGraph data={this.state.data}/>}
                                fifth={<InstructionsPanel headers={this.state.headers} data={this.state.instructionsData}/>}
                                completed={<ResultCompleted message={this.state.saveMessage}
                                                            value={this.state.value}
                                                            path={this.state.path}
                                                            componentName={this.state.componentName}
                                                            uploadMessage={this.state.message}/>}
                                finish={this.saveExperiment}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(TSP);

