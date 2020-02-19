import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import CustomBreadCrumb from "./CustomBreadCrumb";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import styles from '../../static/signup.module.css';
const axios = require('axios');
import {CSVLink} from 'react-csv';
import RouteGraph from "../graphs/RouteGraph";
import SimpleTable from "../layout/SimpleTable";
import CustomTable from "./CustomTable";

class ShowResultRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            initialData: [],
            totalValue: '',
            totalWeight: '',
            extraColumns: ['Result'],
            extraColumnValues: [],
            extraRows: undefined,
            headers: [
                { label: "cities", key: "x" },
            ],
            distanceMatrix: [[]],
            cities: [],
            routes: [],
            data: []
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
            this.setState({"data": resultObj.data});
            this.setState({"distanceMatrix": resultObj.distanceMatrix});
            this.setState({"cities": resultObj.cities});
            let initial = [];
            for(let i = 0; i < resultObj.cities.length; i++) {
                let obj = {x: resultObj.cities[i]}
                initial.push(obj);
            }
            this.setState({"initialData": initial});
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
                        <CustomBreadCrumb name="Home,Saved Experiments,Show Experiment" title="Show Experiment" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <RouteGraph data={this.state.data} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <SimpleTable rows={this.state.distanceMatrix} headers={this.state.cities} />
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <CSVLink uFEFF={false} headers={this.state.headers} filename={"my-file.csv"} data={this.state.initialData} separator={";"}>
                                        <Button variant='outlined' fullWidth>
                                            Download Initial (.csv)
                                        </Button>
                                    </CSVLink>
                                </Grid>
                                <Grid item xs={6}>
                                    <CSVLink filename={"my-file.csv"} data={this.state.results} separator={";"}>
                                        <Button variant='contained' color='primary' fullWidth>
                                            Download Result (.csv)
                                        </Button>
                                    </CSVLink>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResultRouting);