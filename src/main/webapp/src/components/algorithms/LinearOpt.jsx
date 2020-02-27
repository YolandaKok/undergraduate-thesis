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
            samples: []
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
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
            this.setState({capacities: response.data.value1});
            // this.getResult();
        },
        (error) => {
            console.log("error with data upload");
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
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
                            <CustomizedSteppers steps={["Upload File", "Show Initial Data", "Show Results"]}
                                                first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                                second={<LinearGraph data={this.state.results} />}
                                                // third={<CustomTable rows={this.state.results} checkResult={false} capacities={this.state.capacities} extraColumns={[]} extraColumnValues={[]} extraRows={this.state.extraRowsInitial}/>}
                                                fourth={<LinearGraph data={this.state.packedItems} />}
                                                // finish={this.saveExperiment}
                                                // fifth={<InstructionsPanel/>}
                                                // sixth={<CustomTable rows={this.state.packedItems} checkResult={true}
                                                //                     extraColumns={['Result']}
                                                //                     totalValue={this.state.totalValue}
                                                //                     totalWeight={this.state.totalWeight}
                                                //                     extraColumnValues={this.state.extraColumnValues}
                                                //                     extraRows={this.state.extraRowsFinal}
                                                // />}
                                                // completed={<ResultCompleted message={this.state.saveMessage}
                                                //                             value={this.state.value}
                                                //                             path={this.state.path}
                                                //                             componentName={this.state.componentName}
                                                //                             uploadMessage={this.state.message}/>}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }

}

export default withRouter(LinearOpt);