import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import CustomCard from "../layout/CustomCard";

export default class SelectAlgorithm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [3, 4]
        }
    }

    render() {
        return(
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb name="Home,Select Algorithm" title="Choose Algorithm" />
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
        );
    }
}