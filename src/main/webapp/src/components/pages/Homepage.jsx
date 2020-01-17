import React, { Component, Fragment } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import CustomCard from "../layout/CustomCard";


export class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "results": []
        }
    }

    componentDidMount() {
        document.body.style.background = "white";
    }

    render() {
        return(
            <div>
                <ResponsiveDrawer/>
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
