import React, { Component, Fragment } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import CustomCard from "../layout/CustomCard";
const axios = require('axios');


export class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "results": [],
            "firstname": '',
            "lastname": ''
        }
    }

    componentWillMount() {
        axios.get(SERVICE_URL + '/users/' + localStorage.getItem('username_info'), {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
                console.log(response);
                this.setState({"firstname": response.data.firstname,
                                "lastname": response.data.lastname});
                },
            (error) => {
                console.log("error");
            });
    }

    componentDidMount() {
        document.body.style.background = "white";
    }

    render() {
        return(
            <div>
                <ResponsiveDrawer firstname={this.state.firstname} lastname={this.state.lastname}/>
                <Container fixed>
                    <Grid container spacing={3} className={styles.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,Overview" title="Recent Experiments"/>
                        </Grid>
                        <Grid item xs={4}>
                            <CustomCard title="New Experiment" content="Click to create a new experiment using an algorithm"/>
                        </Grid>
                        {
                            this.state.results.map((text, index) => (
                                <Grid item xs={4}>
                                    <CustomCard title="Knapsack" content="Click to create a new experiment using an algorithm"/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);
