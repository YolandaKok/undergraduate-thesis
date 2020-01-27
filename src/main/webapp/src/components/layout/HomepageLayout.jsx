import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomCard from "./CustomCard";
import axios from "axios";

export default class HomepageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": []
        }
    }

    componentWillMount() {
        axios.get(SERVICE_URL + '/experiments/' + localStorage.getItem('username_info') , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
                console.log(response);
                this.setState({"results": response.data})
            },
            (error) => {
                console.log("error");
            });
    }

    render() {
        return (
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb name="Home,Overview" title="Recent Experiments" />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomCard title="New Experiment" content="Click to create a new experiment using an algorithm" href="/select/algorithm"/>
                    </Grid>
                    {
                        this.state.results.map((item, index) => (
                            <Grid item xs={4}>
                                <CustomCard title={item.algorithmName} content={item.description} href="/"/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        );
    }
}