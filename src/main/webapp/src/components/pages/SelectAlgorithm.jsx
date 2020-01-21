import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import CustomCard from "../layout/CustomCard";
import axios from 'axios';

export default class SelectAlgorithm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [2,3]
        }
    }

    componentDidMount() {
        axios.get(SERVICE_URL + '/algorithms/findAll' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
                    console.log(response);
                    this.setState({"results": response.data});
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
                        <CustomBreadCrumb name="Home,Select Algorithm" title="Choose Algorithm" />
                    </Grid>
                    {
                        this.state.results.map((result, index) => (
                            <Grid item xs={4}>
                                <CustomCard title={result.name} content={result.description}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        );
    }
}