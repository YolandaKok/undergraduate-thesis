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

class ShowResultMultiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            initialData: [],
            totalValue: '',
            totalWeight: '',
            extraColumns: ['Bin'],
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
            let extra = [];
            let items = [];
            let extraRows = [];
            let obj = {};
            obj.x = '';
            obj.y = 'Total Value';
            obj.z = 'Total Weight';
            extraRows.push(obj);

            let obj1 = {};
            obj1.x = 'All Bins';
            obj1.y = resultObj.result.totalPackedValue;
            obj1.z = resultObj.result.totalPackedWeight;
            extraRows.push(obj1);

            for(let i = 0; i < resultObj.result.bins.length; i++) {
                let obj = {};
                for(let j = 0; j < resultObj.result.bins[i].points.length; j++) {
                    items.push(resultObj.result.bins[i].points[j]);
                    extra.push(resultObj.result.bins[i].points[j].bin);
                    obj.x = 'Bin ' + resultObj.result.bins[i].points[j].bin;
                }
                obj.y = resultObj.result.bins[i].packedValue;
                obj.z = resultObj.result.bins[i].packedWeight;
                extraRows.push(obj);
            }
            this.setState({"extraRows": extraRows});
            this.setState({"results": items});
            this.setState({"extraColumnValues": extra});



            let initialObj = JSON.parse(response.data.initialData);
            // let dataInit = {
            //     x: 'capacities',
            //     y: initialObj.capacities
            // }
            // initialObj.points.push(dataInit);
            // this.setState({"initialData": initialObj.points});
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
                        <CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        <CustomTable extraRows={this.state.extraRows} rows={this.state.results} checkResult={true} totalValue={this.state.totalValue} totalWeight={this.state.totalWeight} extraColumns={this.state.extraColumns} extraColumnValues={this.state.extraColumnValues}/>
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

export default withRouter(ShowResultMultiple);