import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomCard from "./CustomCard";
import Pagination from "react-bootstrap/Pagination";
import Container from "@material-ui/core/Container";
import axios from "axios";

export class RecentAlgorithms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [],
            offset: 0,
            perPage: 4,
            totalPages: 2,
            items: []
        }
        this.loadAlgorithms = this.loadAlgorithms.bind(this);
    }

    componentDidMount() {
        this.loadAlgorithms();
    }

    loadAlgorithms() {
        axios.get(SERVICE_URL + '/algorithms/recent' + '?size=' + this.state.perPage + '&page=' + this.state.offset , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log(response);
            this.setState({"results": response.data.response});
            this.setState({"totalPages": response.data.totalPages});
            let items = []
            for (let i = 0; i < this.state.totalPages; i++) {
                if(response.data.numOfPage == i) {
                    items.push(<li className={styles.styleLinkActive} onClick={() => this.handlePageClick(i)} key={i} active>{i+1}</li>);
                } else {
                    items.push(<li className={styles.styleLink} onClick={() => this.handlePageClick(i)} key={i}>{i+1}</li>);
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
            this.loadAlgorithms();
        });
    };

    render() {
        return (
            <Fragment className={styles.gridPadding}>
                <Grid item xs={12}>
                    <h5>{'Try out new algorithms'}</h5>
                    <hr className={styles.marginHr}></hr>
                </Grid>
                {
                    this.state.results.map((item, index) => (
                        <Grid item xs={12} md={12} lg={3} xl={3}>
                            <CustomCard title={item.name} content={item.description} href={"/algorithms/" + item.name.replace(/\s/g, "").toLowerCase() + "/" + item.id}/>
                        </Grid>
                    ))
                }
                <Grid item xs={12}>
                    <Pagination>
                        {this.state.items}
                    </Pagination>
                </Grid>
            </Fragment>
        );
    }

}

export default RecentAlgorithms;