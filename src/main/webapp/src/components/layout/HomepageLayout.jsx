import React, { Component } from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles1 from "../../static/signup.module.css";
import CustomBreadCrumb from "./CustomBreadCrumb";
import CustomCard from "./CustomCard";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import RecentAlgorithms from "./RecentAlgorithms";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    media: {
        height: 120,
    },
    menuButton: {
        color: "red",
    },
    cardStyle: {
        backgroundColor: "#d1b78f"
    },
    cardAction: {
        backgroundColor: "#d1b78f",
        color: "black",
        align: 'center'
    },
    styleButton: {
        backgroundColor: "#d1b78f",
        color: 'black'
    }
})

class HomepageLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "results": [],
            offset: 0,
            perPage: 7,
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
                    items.push(<li className={styles1.styleLinkActive} onClick={() => this.handlePageClick(i)} key={i} active>{i+1}</li>);
                } else {
                    items.push(<li className={styles1.styleLink} onClick={() => this.handlePageClick(i)} key={i}>{i+1}</li>);
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
        const {classes} = this.props;
        return (
            <Container fixed>
                <Grid container spacing={2} className={styles1.gridPadding} alignItems="stretch">
                    <Grid item xs={12}>
                        <CustomBreadCrumb links={[{"title": "Home", "url": "/"}, {"title": "Overview", "url": "/"}]} title="Recent Experiments" />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3} xl={3}>
                        <Card className={classes.cardStyle}>
                            <CardActionArea className={classes.cardAction} onClick={(event) => {this.props.history.push("/select/algorithm");}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <AddCircleOutlineIcon/>
                                        {'New Experiment'}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {'Create a new experiment'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.styleButton}>
                                <Button size="small" color="black">
                                    Read More
                                </Button>
                                <Button disabled={true} size="small" color="black">
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    {
                        this.state.results.map((item, index) => (
                            <Grid item xs={12} md={4} lg={3} xl={3}>
                                <CustomCard id={item.id} title={item.algorithmName} content={item.description} href={'/show/result/' + item.algorithmName.replace(/\s/g, "").toLowerCase() + "/"  + item.id} date={item.modificationDate}/>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12}>
                        <Pagination>
                            {this.state.items}
                        </Pagination>
                    </Grid>
                    <RecentAlgorithms/>
                </Grid>
            </Container>
        );
    }
}

export default withRouter((withStyles(styles)(HomepageLayout)))