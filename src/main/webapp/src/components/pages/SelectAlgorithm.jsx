import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import SelectItemList from "../layout/SelectItemList";
import CustomCard from "../layout/CustomCard";
import axios from 'axios';

export default class SelectAlgorithm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [],
            "library": '',
            "category": ''
        }
        this.passedFunction = this.passedFunction.bind(this)
        this.categoryPassedFunction = this.categoryPassedFunction.bind(this)
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

    passedFunction(event) {
        console.log("Value: " + event.target.value);
        this.setState({"library": event.target.value});

        if(this.state.category === '') {
            axios.get(SERVICE_URL + '/algorithms/filter/library',{
                params: {
                    library: event.target.value
                },
                headers: {"Authorization": localStorage.getItem('authorization')}
            }).then((response) => {
                    console.log(response);
                    this.setState({"results": response.data});
                },
                (error) => {
                    console.log("error");
                });
        } else {

            axios.get(SERVICE_URL + '/algorithms/filter/both',{
                params: {
                    library: event.target.value,
                    category: this.state.category
                },
                headers: {"Authorization": localStorage.getItem('authorization')}
            }).then((response) => {
                    console.log(response);
                    this.setState({"results": response.data});
                },
                (error) => {
                    console.log("error");
                });
        }


    }

    categoryPassedFunction(event) {
        console.log("Value: " + event.target.value);
        this.setState({"category": event.target.value});

        if(this.state.library === '') {
            axios.get(SERVICE_URL + '/algorithms/filter/category',{
                params: {
                    category: event.target.value
                },
                headers: {"Authorization": localStorage.getItem('authorization')}
            }).then((response) => {
                    console.log(response);
                    this.setState({"results": response.data});
                },
                (error) => {
                    console.log("error");
                });
        } else {
            axios.get(SERVICE_URL + '/algorithms/filter/both',{
                params: {
                    category: event.target.value,
                    library: this.state.library
                },
                headers: {"Authorization": localStorage.getItem('authorization')}
            }).then((response) => {
                    console.log(response);
                    this.setState({"results": response.data});
                },
                (error) => {
                    console.log("error");
                });
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
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <SelectItemList passedFunction={this.passedFunction} library={this.state.library} data="ORTools,py" label="Library"></SelectItemList>
                        <SelectItemList passedFunction={this.categoryPassedFunction} library={this.state.category} data="Routing,Packing" label="Category"></SelectItemList>
                    </Grid>
                    {
                        this.state.results.map((result, index) => (
                            <Grid item xs={4} key={index}>
                                <CustomCard title={result.name} content={result.description}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        );
    }
}