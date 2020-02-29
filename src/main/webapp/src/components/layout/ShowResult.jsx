import React, {Component} from 'react';
import CustomTable from "../layout/CustomTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router-dom";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomGraph from "../graphs/CustomGraph";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import styles from '../../static/signup.module.css';
const axios = require('axios');
import {CSVLink} from 'react-csv';

class ShowResult extends Component {
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
                { label: "values", key: "x" },
                { label: "weights", key: "y" },
            ]
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
            this.setState({"results": resultObj.points});
            let extra = [];
            this.state.results.forEach(element =>
                element.color == 0.3 ? extra.push(String.fromCharCode(10003)) : extra.push('no')
            );
            this.setState({"extraColumnValues": extra});
            this.setState({"totalValue": resultObj.totalValue});
            this.setState({"totalWeight": resultObj.totalWeight});

            // extraRows
            let extraRows = [];
            let obj = {};
            obj.x = 'Total Value';
            obj.y = resultObj.totalValue;
            obj.z = '';
            extraRows.push(obj);

            let obj1 = {};
            obj1.x = 'Total Weight';
            obj1.y = resultObj.totalWeight;
            obj.z = '';
            extraRows.push(obj1);

            this.setState({"extraRows": extraRows});

            let initialObj = JSON.parse(response.data.initialData);
            let dataInit = {
                x: 'capacities',
                y: initialObj.capacities
            }
            initialObj.points.push(dataInit);
            this.setState({"initialData": initialObj.points});
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
                        <CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <CustomTable rows={this.state.results} checkResult={true} totalValue={this.state.totalValue} totalWeight={this.state.totalWeight} extraColumns={this.state.extraColumns} extraColumnValues={this.state.extraColumnValues} extraRows={this.state.extraRows}/>
                        <Container>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <CSVLink uFEFF={false} headers={this.state.headers} filename={"knapsack-initial-" + this.props.match.params.id + ".csv"} data={this.state.initialData} separator={";"}>
                                        <Button variant='outlined' fullWidth>
                                            Download Initial (.csv)
                                        </Button>
                                    </CSVLink>
                                </Grid>
                                <Grid item xs={6}>
                                    <CSVLink filename={"knapsack-result-" + this.props.match.params.id + ".csv"} data={this.state.results} separator={";"}>
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

export default withRouter(ShowResult);