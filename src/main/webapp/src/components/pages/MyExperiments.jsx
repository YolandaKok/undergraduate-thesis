import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import SelectItemList from "../layout/SelectItemList";
import CustomCard from "../layout/CustomCard";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

export class MyExperiments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            perPage: 9,
            offset: 0,
            librariesNames: [],
            dateOrder: 'desc',
            "library": '',
            "orderNames": ['asc', 'desc']
        }
        this.loadExperiments = this.loadExperiments.bind(this);
        this.loadLibraries = this.loadLibraries.bind(this);
        this.passedFunction = this.passedFunction.bind(this);
        this.dateOrderFunction = this.dateOrderFunction.bind(this);
    }

    componentDidMount() {
        this.loadLibraries();
        this.loadExperiments();
    }

    loadLibraries() {
        axios.get(SERVICE_URL + '/library/findAllNames' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log(response);
            this.setState({"librariesNames": response.data.libraryNames});
        },
        (error) => {
            console.log("error");
        });
    }

    loadExperiments() {
        axios.get(SERVICE_URL + '/experiments/' + localStorage.getItem('username_info') + '?size=' + this.state.perPage + '&page=' + this.state.offset + '&sort=modificationDate,' + this.state.dateOrder , {
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

    passedFunction(event) {
        console.log("Value: " + event.target.value);
        this.setState({"library": event.target.value});
    }

    dateOrderFunction(event) {
        console.log("Value: " + event.target.value);
        this.setState({dateOrder: event.target.value}, () => {
            this.loadExperiments();
        });
    }


    handlePageClick(pageNumber) {
        let offset = pageNumber;

        this.setState({ offset: offset }, () => {
            this.loadExperiments();
        });
    };

    render() {
        return(
            <Container fixed>
                <Grid container spacing={2} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb name="Home,My Experiments" title="Saved Experiments" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectItemList passedFunction={this.passedFunction} library={this.state.library} data={this.state.librariesNames} label="Library"></SelectItemList>
                        <SelectItemList passedFunction={this.dateOrderFunction} library={this.state.dateOrder} data={this.state.orderNames} label="Order By"></SelectItemList>
                    </Grid>
                    {
                        this.state.results.map((item, index) => (
                            <Grid item xs={6} md={6} lg={4} xl={4}>
                                <CustomCard title={item.algorithmName} content={item.description} href="/" date={item.modificationDate} removeIcon={true}/>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={12}>
                    <Pagination style={{paddingTop: '10px'}}>
                        {this.state.items}
                    </Pagination>
                </Grid>
            </Container>
        );
    }
}

export default MyExperiments;