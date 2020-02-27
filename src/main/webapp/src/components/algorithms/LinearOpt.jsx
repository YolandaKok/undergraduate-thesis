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

export class LinearOpt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadError: null,
            message: null
        }
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
                            {/*<CustomizedSteppers*/}
                            {/*    steps={["Upload Document", "Show Result"]}*/}
                            {/*    first={<DragAndDrop passedFunction={this.passedForDragAndDrop} handleChange={this.handleChange} data={this.state.samples}/>}*/}
                            {/*    third={<SimpleTable rows={this.state.distanceMatrix} headers={this.state.cities}/>}*/}
                            {/*    second={<RouteGraph data={this.state.data}/>}*/}
                            {/*    fifth={<InstructionsPanel/>}*/}
                            {/*    completed={<ResultCompleted message={this.state.saveMessage}*/}
                            {/*                                value={this.state.value}*/}
                            {/*                                path={this.state.path}*/}
                            {/*                                componentName={this.state.componentName}*/}
                            {/*                                uploadMessage={this.state.message}/>}*/}
                            {/*    finish={this.saveExperiment}*/}
                            {/*/>*/}
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }

}

export default withRouter(LinearOpt);