import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomCard from "./CustomCard";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Pagination from "react-bootstrap/Pagination";

export default class HomepageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [],
            offset: 0,
            perPage: 5,
            totalPages: 2,
            items: []
        }
        this.loadExperiments = this.loadExperiments.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
    }

    componentDidMount() {
        this.loadExperiments();
    }

    loadExperiments() {
        axios.get(SERVICE_URL + '/experiments/' + localStorage.getItem('username_info') + '?size=' + this.state.perPage + '&page=' + this.state.offset + '&sort=modificationDate,desc' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log(response);
            this.setState({"results": response.data.response});
            this.setState({"totalPages": response.data.totalPages});
            let items = []
            for (let i = 0; i < this.state.totalPages; i++) {
                if(response.data.numOfPage == i) {
                    items.push(<Pagination.Item onClick={() => this.handlePageClick(i)} key={i} active>{i+1}</Pagination.Item>);
                } else {
                    items.push(<Pagination.Item onClick={() => this.handlePageClick(i)} key={i}>{i+1}</Pagination.Item>);
                }
            }
            this.setState({"items": items});
        },
        (error) => {
            console.log("error");
        });
    }

    handlePageClick(pageNumber) {
        let offset = pageNumber;

        this.setState({ offset: offset }, () => {
            this.loadExperiments();
        });
    };

    pageChanged(e){
        console.log("Item: " + e.target.text);
    }


    render() {

        return (
            <Container fixed>
                <Grid container spacing={3} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb name="Home,Overview" title="Recent Experiments" />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomCard title="New Experiment" content="Create a new experiment using an algorithm" href="/select/algorithm"/>
                    </Grid>
                    {
                        this.state.results.map((item, index) => (
                            <Grid item xs={6} md={6} lg={4} xl={4}>
                                <CustomCard title={item.algorithmName} content={item.description} href="/" date={item.modificationDate}/>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12}>
                        <Pagination>
                            {this.state.items}
                        </Pagination>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}