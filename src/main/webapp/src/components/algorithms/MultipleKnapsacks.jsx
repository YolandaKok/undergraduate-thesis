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
import { withRouter } from 'react-router-dom';
const axios = require('axios');

export class MultipleKnapsacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            initial: [],
            final: [],
            formData: null,
            uploadError: null,
            message: null,
            saveMessage: null,
            value: null,
            path: null,
            componentName: null,
            samples: [],
            packedItems: [],
            algorithmId: '',
            extraColumns: ['Bin'],
            extraColumnValues: [],
            extraRowsInitial: undefined,
            extraRowsFinal: undefined,
        };
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.saveExperiment = this.saveExperiment.bind(this);
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
        for(let i = 0; i < this.state.samples.length; i++) {
            if(this.state.samples[i].id == event.target.value) {
                console.log(this.state.samples);
                let initialData = JSON.parse(this.state.samples[i].sample);
                let finalData = JSON.parse(this.state.samples[i].dataResult);

                this.setState({results: initialData.initial.initialData});
                this.setInitialExtraRows(initialData.initial.binCapacities);

                this.setState({"final": finalData.result});
                // For extra columns for bins
                let extra = [];
                let items = [];
                for(let i = 0; i < finalData.result.bins.length; i++) {
                    for(let j = 0; j < finalData.result.bins[i].points.length; j++) {
                        items.push(finalData.result.bins[i].points[j]);
                        extra.push(finalData.result.bins[i].points[j].bin);
                    }
                }
                console.log(items);
                this.setState({"packedItems": items});
                this.setState({"extraColumnValues": extra});
                this.setResultExtraRows(finalData.result);
            }
        }
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
            this.setState({initial: response.data});
            this.setState({results: response.data.initialData});
            this.setInitialExtraRows(response.data.binCapacities);
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
            this.setState({"final": response.data});
            // For extra columns for bins
            let extra = [];
            let items = [];
            for(let i = 0; i < response.data.bins.length; i++) {
                for(let j = 0; j < response.data.bins[i].points.length; j++) {
                    items.push(response.data.bins[i].points[j]);
                    extra.push(response.data.bins[i].points[j].bin);
                }
            }
            console.log(items);
            this.setState({"packedItems": items});
            this.setState({"extraColumnValues": extra});
            this.setResultExtraRows(response.data);
            },
        (error) => {
            console.log("error");
        });
    }

    setInitialExtraRows(data) {
        let extraRows = [];
        data.forEach((item, index) => {
            let obj = {};
            obj.x = 'Bin' + index;
            obj.y = item;
            extraRows.push(obj);
        });
        this.setState({"extraRowsInitial": extraRows});
    }

    setResultExtraRows(data) {
        let extraRows = [];
        let header = {}, first = {};
        header.x = ''; header.y = 'Total Value'; header.z = 'Total Weight';
        extraRows.push(header);
        first.x = 'All'; first.y = data.totalPackedValue; first.z = data.totalPackedWeight;
        extraRows.push(first);
        data.bins.forEach((item, index) => {
            let obj = {};
            obj.x = 'Bin' + index;
            obj.y = item.packedValue;
            obj.z = item.packedWeight;
            extraRows.push(obj);
        });
        this.setState({"extraRowsFinal": extraRows});
    }

    componentDidMount() {
        this.setState({"algorithmId": this.props.match.params.id});
    }

    saveExperiment() {
        // Create JSON Object for initial data
        let initialData = {
            "initial": this.state.initial
        }
        // Json object for result data
        let resultData = {
            "result": this.state.final,
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
                        <CustomizedSteppers steps={["Upload File", "Show Initial Data", "Show Results"]}
                                            first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                            second={<CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'} />}
                                            third={<CustomTable rows={this.state.results} checkResult={false} extraColumns={[]} extraColumnValues={[]} extraRows={this.state.extraRowsInitial} />}
                                            fourth={<CustomGraph data={this.state.packedItems} titleX={'Values'} titleY={'Weights'}/>}
                                            finish={this.saveExperiment}
                                            fifth={<InstructionsPanel/>}
                                            sixth={<CustomTable rows={this.state.packedItems} checkResult={true}
                                                                totalValue={this.state.totalValue}
                                                                totalWeight={this.state.totalWeight}
                                                                extraColumns={this.state.extraColumns}
                                                                extraColumnValues={this.state.extraColumnValues}
                                                                extraRows={this.state.extraRowsFinal}
                                            />}
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

export default withRouter(MultipleKnapsacks);