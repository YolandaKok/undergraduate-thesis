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
            "category": '',
            "order": '',
            "librariesNames": [],
            "categoriesNames": [],
            "orderNames": ['Ascending', 'Descending']
        }
        this.passedFunction = this.passedFunction.bind(this);
        this.categoryPassedFunction = this.categoryPassedFunction.bind(this);
        this.orderPassedFunction = this.orderPassedFunction.bind(this);
    }

    componentDidMount() {
        axios.get(SERVICE_URL + '/algorithms/findAll' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
                    console.log(response);
                    if(this.state.order === 'Ascending')
                        this.setState({"results": response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
                    else
                        this.setState({"results": response.data.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
                },
                (error) => {
                    console.log("error");
                });

        axios.get(SERVICE_URL + '/library/findAllNames' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
                console.log(response);
                this.setState({"librariesNames": response.data.libraryNames});
            },
            (error) => {
                console.log("error");
            });

        axios.get(SERVICE_URL + '/algorithms/categories' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
                console.log(response);
                this.setState({"categoriesNames": response.data.libraryNames});
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
                    if(this.state.order === 'Ascending')
                        this.setState({"results": response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
                    else
                        this.setState({"results": response.data.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
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
                    if(this.state.order === 'Ascending')
                        this.setState({"results": response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
                    else
                        this.setState({"results": response.data.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
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
                    if(this.state.order === 'Ascending')
                        this.setState({"results": response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
                    else
                        this.setState({"results": response.data.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
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
                    if(this.state.order === 'Ascending')
                        this.setState({"results": response.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
                    else
                        this.setState({"results": response.data.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
                },
                (error) => {
                    console.log("error");
                });
        }
    }

    orderPassedFunction(event) {
        console.log("Value: " + event.target.value);
        this.setState({"order": event.target.value});
        if(event.target.value === 'Ascending')
            this.setState({"results": this.state.results.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))});
        else
            this.setState({"results": this.state.results.sort((a,b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0))});
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
                        <SelectItemList passedFunction={this.passedFunction} library={this.state.library} data={this.state.librariesNames} label="Library"></SelectItemList>
                        <SelectItemList passedFunction={this.categoryPassedFunction} library={this.state.category} data={this.state.categoriesNames} label="Category"></SelectItemList>
                        <SelectItemList passedFunction={this.orderPassedFunction} library={this.state.order} data={this.state.orderNames} label="Order By"></SelectItemList>
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