import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import styles1 from "../../static/signup.module.css";
import Container from "@material-ui/core/Container";
import CustomTab from "../layout/CustomTab";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import List from "@material-ui/core/List";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import GeneralForm from "../forms/GeneralForm";
import Paper from "@material-ui/core/Paper";
import {CustomizedAlert} from "../errors/CustomizedAlert";
const axios = require('axios');

const styles = theme => ({
    list: {
        overflow: 'auto',
        height: 550,
        backgroundColor: '#9f8761',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    listItem: {
        backgroundColor: "#9f8761",
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 10,
        color: "black",
        fontWeight: "600"
    },
    textItem: {
        marginTop: 0,
        fontSize: 12,
        color: "#000"
    }
})

export class ManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstname": '',
            "lastname": '',
            "role": '',
            "summary": '',
            item: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                company: '',
                profession: '',
                summary: ''
            },
            requestValue: null,
            message: null
        }
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
        this.getProfileInfo();
    }

    handlePostChange(event) {
        let nam = event.target.name;
        let val = event.target.value;

        let newState = Object.assign({}, this.state);
        newState.item[nam] = val;
        this.setState(newState);

        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put(SERVICE_URL + '/users/' + this.state.item.id, this.state.item, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            this.setState({"requestValue": "success"});
            this.setState({"message": "You have successfully updated your profile information."});
            this.getUserInfo();
            this.getProfileInfo();
        }, (error) => {
            this.setState({"requestValue": "danger"});
            this.setState({"message": "Oops, something went wrong."});
            console.log(error);
        });
    }

    getUserInfo() {
        axios.get(SERVICE_URL + '/users/' + localStorage.getItem("username_info"), {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response.data);
            this.setState({"firstname": response.data.firstname});
            this.setState({"lastname": response.data.lastname});
            this.setState({"role": response.data.profession});
            this.setState({"summary": response.data.summary});
        }, (error) => {
            console.log(error);
        });
    }

    getProfileInfo() {
        axios.get(SERVICE_URL + '/users/' + localStorage.getItem("username_info"), {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response.data);
            this.setState({"item": response.data});
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        const {classes} = this.props;
        return(
            <Fragment>
                <Container fixed>
                    <Grid container spacing={2} className={styles1.gridPadding}>
                        <Grid item xs={12}>
                            <CustomBreadCrumb name="Home,Manage Profile" title="Profile" />
                            {
                                this.state.requestValue != null ? <CustomizedAlert value={this.state.requestValue}
                                                                                   message={this.state.message}/> : ''
                            }
                        </Grid>
                        <Grid item xs={2}>
                            <List className={classes.list}>
                                {/*style ={ { backgroundImage: "url('https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300')" } }*/}
                                <div>

                                </div>
                                {/*<Divider/>*/}
                                <Typography className={classes.listItem}>
                                    <Typography variant="h6" style={{fontWeight: 530}}>General</Typography>
                                    <Typography variant="body1" className={classes.textItem}>Firstname: {this.state.firstname}</Typography>
                                    <Typography variant="body1" className={classes.textItem}>Lastname: {this.state.lastname}</Typography>
                                </Typography>
                                <Divider/>
                                <Typography className={classes.listItem}>
                                    <Typography variant="h6">Summary</Typography>
                                    <Typography variant="body1" className={classes.textItem}>{this.state.role} - {this.state.summary}</Typography>
                                </Typography>
                                <Divider/>
                            </List>
                        </Grid>
                        <Grid item xs={8}>
                            <Container>
                                <Grid container justify={'center'}>
                                    <Grid item xs={12} component={Paper}>
                                        <CustomTab first={<GeneralForm item={this.state.item} handlePostChange={this.handlePostChange} handleSubmit={this.handleSubmit}/>}/>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(ManageProfile);