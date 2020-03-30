import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import CustomBreadCrumb from "./CustomBreadCrumb";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import styles from '../../static/signup.module.css';
import RouteGraph from "../graphs/RouteGraph";
import GoogleMapsGraph from "../graphs/GoogleMapsGraph";
const axios = require('axios');

export class ShowResultVehicleRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {lat: 38.02217, lng: 23.75288},
            routes: [],
            markers: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(SERVICE_URL + '/experiments/result/' + this.props.match.params.id, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            let resultObj = JSON.parse(response.data.resultData);
            console.log(resultObj);
            this.setState({"center": resultObj.center});
            this.setState({"routes": resultObj.routes});
            this.setState({"markers": resultObj.markers});
        },
        (error) => {
            console.log("error");
        });
    }

    render() {
        return(
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "Saved Experiments", "url": "/myexperiments"}, {"title": "Show Experiment", "url": ""}]} title="Show Experiment" />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={6} xl={6}>
                    <GoogleMapsGraph center={this.state.center} routes={this.state.routes} markers={this.state.markers} />
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResultVehicleRouting);