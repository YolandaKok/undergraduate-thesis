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
            value: null
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
            this.setState({saveMessage: "You have saved the experiment successfully."});
            this.setState({value: "success"});
        },
        (error) => {
            console.log("error");
            this.setState({saveMessage: "Oops, something went wrong."});
            this.setState({value: "danger"});
        });
    }

    render() {
        return (
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,OR Tools,Knapsack" title="Knapsack" />
                        </Grid>
                        <CustomizedSteppers first={<DragAndDrop uploadError={this.state.uploadError}
                                                                message={this.state.message}
                                                                passedFunction={this.passedForDragAndDrop}/>}
                                            second={<CustomGraph data={this.state.results}/>}
                                            third={<CustomTable rows={this.state.results} />}
                                            fourth={<CustomGraph data={this.state.packedItems}/>}
                                            finish={this.saveExperiment}
                                            fifth={<InstructionsPanel/>}
                                            completed={<ResultCompleted message={this.state.saveMessage} value={this.state.value}/>}
                        />
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default Knapsack;