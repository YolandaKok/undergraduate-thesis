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
import SimpleTable from "./SimpleTable";
import {CSVLink} from "react-csv";
import TableSimple from "./TableSimple";
const axios = require('axios');

export class ShowResultVehicleRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {lat: 38.02217, lng: 23.75288},
            routes: [],
            markers: [],
            headersInitial: [
                { label: "destinations", key: "x" },
                { label: "", key: "y" },
            ],
            resultsMatrix: [[]],
            destinations: [],
            parameters: ''
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
            this.setState({"headers": resultObj.headers});
            this.setState({"resultsMatrix": resultObj.resultsMatrix});
            this.setState({"parameters": resultObj.parameters});
            let destinations = [];
            for(let i = 0; i < resultObj.destinations.length; i++) {
                let obj = {x: resultObj.destinations[i]}
                destinations.push(obj);
            }
            let obj = {x: "parameters", y: resultObj.parameters}
            destinations.push(obj);
            this.setState({"destinations": destinations})
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
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <GoogleMapsGraph center={this.state.center} routes={this.state.routes} markers={this.state.markers} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <TableSimple title="Vehicles' Routes" rows={this.state.resultsMatrix} headers={this.state.headers} count={this.state.routes.length} />
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <CSVLink uFEFF={false} headers={this.state.headersInitial} filename={"vehicle-routing-initial-" + this.props.match.params.id + ".csv"} data={this.state.destinations} separator={";"}>
                                        <Button variant='outlined' fullWidth>
                                            Download Initial (.csv)
                                        </Button>
                                    </CSVLink>
                                </Grid>
                                <Grid item xs={6}>
                                    {/*<CSVLink filename={"vehicle-routing-result-" + this.props.match.params.id + ".csv"} data={this.state.results} separator={";"}>*/}
                                    {/*    <Button variant='contained' color='primary' fullWidth>*/}
                                    {/*        Download Result (.csv)*/}
                                    {/*    </Button>*/}
                                    {/*</CSVLink>*/}
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResultVehicleRouting);