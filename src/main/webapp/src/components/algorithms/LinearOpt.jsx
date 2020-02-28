import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import CustomizedSteppers from "../layout/CustomizedSteppers";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import SimpleTable from "../layout/SimpleTable";
import RouteGraph from "../graphs/RouteGraph";
import InstructionsPanel from "../layout/InstructionsPanel";
import ResultCompleted from "../layout/ResultCompleted";
import CustomGraph from "../graphs/CustomGraph";
import CustomTable from "../layout/CustomTable";
import LinearGraph from "../graphs/LinearGraph";

const axios = require('axios');


export class LinearOpt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadError: null,
            message: null,
            data: [],
            samples: [],
            headers: ["type", "x", "y", "operator", "constant"],
            rows: [],
            dataFromFile: null,
            result: null,
            optimalValue: null,
            algorithmId: ''
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
        this.getResult = this.getResult.bind(this);
        this.saveExperiment = this.saveExperiment.bind(this);
    }

    componentWillMount() {
        this.setState({"algorithmId": this.props.match.params.id});
    }

    /* Pass Function to Drag And Drop to get Data */
    passedForDragAndDrop(formData) {
        this.setState({"formData": formData});
        this.getInitialData();
    }

    getInitialData() {
        axios.post(SERVICE_URL + '/linear/data' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({uploadError: 'success'});
            this.setState({message: 'You have uploaded the file successfully !'});
            this.setState({results: response.data.value0});
            this.setState({dataFromFile: response.data.value1});
            // Create Rows for initial table
            let rows = [];
            let row=['objective', response.data.value1.objective.x, response.data.value1.objective.y, '', ''];
            rows.push(row);
            for(let i = 0; i < response.data.value1.constrains.length; i++) {
                let constrain = response.data.value1.constrains[i];
                let row = ["constrain" + i, constrain.x, constrain.y, constrain.operator, constrain.constant];
                rows.push(row);
            }
            this.setState({"rows": rows});
            this.getResult();
        },
        (error) => {
            console.log("error with data upload");
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
        });
    }

    getResult() {
        console.log(this.state.dataFromFile.objective);
        console.log(this.state.dataFromFile.constrains);
        let con = [];
        for(let i = 0; i < this.state.dataFromFile.constrains.length; i++) {
            con.push(this.state.dataFromFile.constrains[i]);
        }
        let obj = {"objective": this.state.dataFromFile.objective, "constrains": con};
        axios.post(SERVICE_URL + '/linear/result' , obj, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            this.setState({"result": response.data.value0});
            this.setState({"optimalValue": response.data.value1});
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
            "results": this.state.results,
            "resultLine": this.state.result,
            "optimalValue": this.state.optimalValue,
            "headers": this.state.headers,
            "rows": this.state.rows
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

    handleChange() {

    }

    render() {
        return(
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "OR Tools", "url": "/select/algorithm"}, {"title": "Linear Optimization", "url": ""}]} title="Linear Optimization" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                            <CustomizedSteppers steps={["Upload File", "Show Results"]}
                                                first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                                second={<LinearGraph data={this.state.results} resultLine={this.state.result} />}
                                                third={<SimpleTable headers={this.state.headers} rows={this.state.rows} noHeaders={true} result={this.state.result} optimalValue={this.state.optimalValue} />}
                                                finish={this.saveExperiment}
                                                fifth={<InstructionsPanel/>}
                                                completed={<ResultCompleted message={this.state.saveMessage}
                                                                            value={this.state.value}
                                                                            path={this.state.path}
                                                                            componentName={this.state.componentName}
                                                                            uploadMessage={this.state.message}/>}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }

}

export default withRouter(LinearOpt);