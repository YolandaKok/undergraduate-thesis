import React, {Component, Fragment} from 'react';
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
import {withRouter} from "react-router-dom";
const axios = require('axios');
import TableSimple from "../layout/TableSimple";
import GoogleMapsGraph from "../graphs/GoogleMapsGraph";

export class VehicleRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadError: null,
            message: null,
            samples: [],
            initialData: {
                destinations: [],
                numOfVehicles: '',
                maxArcDistance: '',
                startIndex: 0,
                markers: []
            },
            instructionsPanel: {
                headers: ['Destinations', ''],
                instructionsData: [['Teo 24 Athens', ''],
                    ['Reas 24 Galatsi', ''],
                    ['Galatsiou 130 Galatsi', ''],
                    ['Patission 112 Athens', ''],
                    ['parameters', '{2,500000,0}']],
                moreInfo: true
            },
            matrix: [[]]
        }
        this.passedForDragAndDrop = this.passedForDragAndDrop.bind(this);
        this.getInitialData = this.getInitialData.bind(this);
    }

    componentWillMount() {
        this.setState({"algorithmId": this.props.match.params.id});
        // this.getDataSamples(this.props.match.params.id);
    }

    passedForDragAndDrop(formData) {
        this.setState({"formData": formData});
        this.getInitialData();
    }


    getInitialData() {
        axios.post(SERVICE_URL + '/routing/data' , this.state.formData, {
            headers: {"Authorization": localStorage.getItem('authorization'), 'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
            console.log(response);
            this.setState({uploadError: 'success'});
            this.setState({message: 'You have uploaded the file successfully !'});
            // Create Matrix
            this.setState({initialData: response.data});
            let matrix = [[]];
            for(let i = 0; i < this.state.initialData.destinations.length; i++) {
                matrix.push([this.state.initialData.destinations[i], '']);
            }
            matrix.push(['parameters', '{' + this.state.initialData.numOfVehicles + ',' + this.state.initialData.maxArcDistance + ',' + this.state.initialData.startIndex + '}']);
            this.setState({matrix: matrix});
            // this.getResult();
        },
        (error) => {
            console.log("Check File Format: " + error);
            this.setState({uploadError: 'danger'});
            this.setState({message: 'Error while uploading file !'});
        });
    }

    render() {
        return(
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "OR Tools", "url": "/select/algorithm"}, {"title": "Vehicle Routing", "url": ""}]} title="Vehicle Routing" />
                            <CustomizedAlert value={this.state.uploadError}
                                             message={this.state.message}></CustomizedAlert>
                            <CustomizedSteppers
                                steps={["Upload Document", "Show Result"]}
                                first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}
                                third={<TableSimple title={'Initial Data'} rows={this.state.matrix} headers={this.state.instructionsPanel.headers}/>}
                                second={<GoogleMapsGraph/>}
                                fifth={<InstructionsPanel headers={this.state.instructionsPanel.headers} data={this.state.instructionsPanel.instructionsData} moreInfo={this.state.instructionsPanel.moreInfo}/>}
                                // completed={<ResultCompleted message={this.state.saveMessage}
                                //                             value={this.state.value}
                                //                             path={this.state.path}
                                //                             componentName={this.state.componentName}
                                //                             uploadMessage={this.state.message}/>}
                                // finish={this.saveExperiment}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(VehicleRouting);
