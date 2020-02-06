import React, {Component} from 'react';
import CustomTable from "../layout/CustomTable";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import {withRouter} from "react-router-dom";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomGraph from "../graphs/CustomGraph";
const axios = require('axios');

class ShowResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            totalValue: '',
            totalWeight: ''
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
            this.setState({"totalValue": resultObj.totalValue});
            this.setState({"totalWeight": resultObj.totalWeight});
        },
        (error) => {
            console.log("error");
        });
    }

    render() {
        return(
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12} direction="column"
                          alignItems="center"
                          justify="center">
                        <CustomBreadCrumb name="Home,Saved Experiments,Show Experiment" title="Show Experiment" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6}>
                        <CustomGraph data={this.state.results} titleX={'Values'} titleY={'Weights'}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6} xl={6}>
                        <CustomTable rows={this.state.results} checkResult={true}
                                     totalValue={this.state.totalValue}
                                     totalWeight={this.state.totalWeight}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ShowResult);