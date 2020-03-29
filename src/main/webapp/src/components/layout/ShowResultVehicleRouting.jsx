import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import CustomBreadCrumb from "./CustomBreadCrumb";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import styles from '../../static/signup.module.css';
const axios = require('axios');

export class ShowResultVehicleRouting extends Component {
    render() {
        return(
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "Saved Experiments", "url": "/myexperiments"}, {"title": "Show Experiment", "url": ""}]} title="Show Experiment" />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResultVehicleRouting);