import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import SelectItemList from "../layout/SelectItemList";
import CustomCard from "../layout/CustomCard";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Alert from "react-bootstrap/Alert";

export class MyExperiments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            perPage: 9,
            offset: 0,
            algorithmNames: [],
            dateOrder: 'desc',
            "algorithm": '',
            "orderNames": ['asc', 'desc'],
            "deleteAlert": false
        }
        this.loadExperiments = this.loadExperiments.bind(this);
        this.loadAlgorithms = this.loadAlgorithms.bind(this);
        this.passedFunction = this.passedFunction.bind(this);
        this.dateOrderFunction = this.dateOrderFunction.bind(this);
    }

    componentDidMount() {
        this.loadAlgorithms();
        this.loadExperiments();
    }

    loadAlgorithms() {
        axios.get(SERVICE_URL + '/experiments/findAllAlgorithms/' + localStorage.getItem('username_info')  , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log(response);
            this.setState({"algorithmNames": response.data.list});
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
        this.setState({"algorithm": event.target.value});
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

    deleteItem(id, functionToCall, passThis) {
        axios.delete(SERVICE_URL + '/experiments/' + id , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log("Item deleted.");
            functionToCall();
            passThis.setState({"deleteAlert": true});
        },
        (error) => {
            console.log("error");
        });
    };

    render() {
        return(
            <Container fixed>
                <Grid container spacing={2} className={styles.gridPadding}>
                    <Grid item xs={12}>
                        <CustomBreadCrumb name="Home,My Experiments" title="Saved Experiments" />
                        {this.state.deleteAlert ? <Alert variant={'success'}>
                            {'You have successfully deleted an item.'}
                        </Alert> : ''}
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <SelectItemList passedFunction={this.passedFunction} library={this.state.algorithm} data={this.state.algorithmNames} label="Algorithm"></SelectItemList>
                        <SelectItemList passedFunction={this.dateOrderFunction} library={this.state.dateOrder} data={this.state.orderNames} label="Date"></SelectItemList>
                    </Grid>
                    {
                        this.state.results.map((item, index) => (
                            <Grid item xs={6} md={6} lg={4} xl={4}>
                                <CustomCard deleteFunction={this.deleteItem} functionToCall={this.loadExperiments} passThis={this} id={item.id} title={item.algorithmName} content={item.description} href="/" date={item.modificationDate} removeIcon={true}/>
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