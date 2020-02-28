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
import LinearGraph from "../graphs/LinearGraph";
import SimpleTable from "./SimpleTable";

class ShowResultLinear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            rows: [],
            optimalValue: null,
            initialData: [],
            headers: [
                { label: "values", key: "x" },
                { label: "weights", key: "y" },
            ],
            headersTable: []
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        axios.get(SERVICE_URL + '/experiments/result/' + this.props.match.params.id, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            let resultObj = JSON.parse(response.data.resultData);
            console.log(resultObj.results);
            console.log(resultObj.resultLine);
            this.setState({"results": resultObj.results});
            this.setState({"result": resultObj.resultLine});
            this.setState({"headersTable": resultObj.headers});
            this.setState({"rows": resultObj.rows});
            this.setState({"optimalValue": resultObj.optimalValue});
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
                        {/*Linear Graph*/}
                        {
                            this.state.result != null && this.state.results != null ? <LinearGraph data={this.state.results} resultLine={this.state.result} /> : ''
                        }
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6} component={Paper}>
                        {this.state.result != null && this.state.results != null ? <SimpleTable headers={this.state.headersTable} rows={this.state.rows} noHeaders={true} result={this.state.result} optimalValue={this.state.optimalValue}/> : ''}
                        {/*<Container>*/}
                        {/*    <Grid container spacing={3}>*/}
                        {/*        <Grid item xs={6}>*/}
                        {/*            <CSVLink uFEFF={false} headers={this.state.headers} filename={"my-file.csv"} data={this.state.initialData} separator={";"}>*/}
                        {/*                <Button variant='outlined' fullWidth>*/}
                        {/*                    Download Initial (.csv)*/}
                        {/*                </Button>*/}
                        {/*            </CSVLink>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid item xs={6}>*/}
                        {/*            <CSVLink filename={"my-file.csv"} data={this.state.results} separator={";"}>*/}
                        {/*                <Button variant='contained' color='primary' fullWidth>*/}
                        {/*                    Download Result (.csv)*/}
                        {/*                </Button>*/}
                        {/*            </CSVLink>*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}
                        {/*</Container>*/}
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResultLinear);