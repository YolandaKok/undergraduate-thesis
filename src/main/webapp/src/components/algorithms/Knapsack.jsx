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
import { CustomizedAlert } from "../errors/CustomizedAlert";

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
            capacities: null,
            samples: [],
            sampleId: null,
            algorithmId: '',
            extraColumns: [],
            extraColumnValues: [],
            extraRowsInitial: undefined,
            extraRowsFinal: undefined
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getResult = this.getResult.bind(this);
        this.saveExperiment = this.saveExperiment.bind(this);
        this.getDataSamples = this.getDataSamples.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({"sampleId": event.target.value});
        console.log("Id: " + event.target.value);
        for(let i = 0; i < this.state.samples.length; i++) {
            if(this.state.samples[i].id == event.target.value) {
                console.log(this.state.samples);
                let result = this.state.samples[i].sample;
                let data = this.state.samples[i].dataResult;
                let data2 = JSON.parse(data);
                let result2 = JSON.parse(result);
                this.setState({results: result2.points});
                this.setState({capacities: result2.capacities});
                this.setState({packedItems: data2.points});
                this.setState({totalValue: data2.totalValue});
                this.setState({totalWeight: data2.totalWeight});
                let extra = [];
                let obj = {
                    x: 'Capacities',
                    y: result2.capacities
                };
                extra.push(obj);
                this.setState({"extraRowsInitial": extra});

                // Extra Rows
                let extraRows = [];
                let obj1 = {
                    x: 'Total Value',
                    y: data2.totalValue,
                    z: ''
                }
                let obj2 = {
                    x: 'Total Weight',
                    y: data2.totalWeight,
                    z: ''
                }
                extraRows.push(obj1);
                extraRows.push(obj2);
                this.setState({"extraRowsFinal": extraRows});

                let extraColumn = [];
                data2.points.forEach(element =>
                    element.color == 0.3 ? extraColumn.push(String.fromCharCode(10003)) : extraColumn.push('no')
                );
                this.setState({"extraColumnValues": extraColumn});
            }
        }
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

    /* Pass Function to Drag And Drop to get Data */
    passedForDragAndDrop(formData) {
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
            let extra = [];
            let obj = {
                x: 'Capacities',
                y: response.data.value1
            };
            extra.push(obj);
            this.setState({"extraRowsInitial": extra});
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
            this.setState({});
            this.setState({packedItems: response.data.packedItems});
            // Extra Rows
            let extraRows = [];
            let obj = {
                x: 'Total Value',
                y: response.data.totalValue,
                z: ''
            }
            let obj1 = {
                x: 'Total Weight',
                y: response.data.totalWeight,
                z: ''
            }
            extraRows.push(obj);
            extraRows.push(obj1);
            this.setState({"extraRowsFinal": extraRows});
            let temp = JSON.parse(JSON.stringify(this.state.results));
            response.data.packedItems.map((item) => {
                temp[item].color = 0.3;
            });
            this.setState({packedItems: temp});
            let extra = [];
            this.state.packedItems.forEach(element =>
                element.color == 0.3 ? extra.push(String.fromCharCode(10003)) : extra.push('no')
            );
            this.setState({"extraColumnValues": extra});
            },
        (error) => {
            console.log("error");
        });
    }

    saveExperiment() {
        // Create JSON Object for initial data
        let initialData = {
            "points": this.state.results,
            "capacities": this.state.capacities
        }
        // Json object for result data
        let resultData = {
            "points": this.state.packedItems,
            "totalWeight": this.state.totalWeight,
            "totalValue": this.state.totalValue
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
                            <CustomBreadCrumb name="Home,OR Tools,Knapsack" title="Knapsack" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                        </Grid>
                        <CustomizedSteppers first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                            second={<CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'} />}
                                            third={<CustomTable rows={this.state.results} checkResult={false} capacities={this.state.capacities} extraColumns={[]} extraColumnValues={[]} extraRows={this.state.extraRowsInitial}/>}
                                            fourth={<CustomGraph data={this.state.packedItems} titleX={'Values'} titleY={'Weights'}/>}
                                            finish={this.saveExperiment}
                                            fifth={<InstructionsPanel/>}
                                            sixth={<CustomTable rows={this.state.packedItems} checkResult={true}
                                                                extraColumns={['Result']}
                                                                totalValue={this.state.totalValue}
                                                                totalWeight={this.state.totalWeight}
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

export default withRouter(Knapsack);