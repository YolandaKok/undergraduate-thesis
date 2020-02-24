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
import SecurityForm from "../forms/SecurityForm";
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
            security: {
              password: '',
              newPassword: '',
              repeatNewPassword: ''
            },
            errors: {
              password: '',
              newPassword: '',
              repeatNewPassword: ''
            },
            passwordRegularExpression: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            requestValue: null,
            message: null,
            validate: true
        }
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleSecurityChange = this.handleSecurityChange.bind(this);
        this.handleSecuritySubmit = this.handleSecuritySubmit.bind(this);
        this.validateData = this.validateData.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
        this.getProfileInfo();
    }

    handlePostChange(event) {
        event.preventDefault();
        let nam = event.target.name;
        let val = event.target.value;

        let newState = Object.assign({}, this.state);
        newState.item[nam] = val;
        this.setState(newState);

        console.log(this.state);
    }

    handleSecurityChange(event) {
        event.preventDefault();
        let nam = event.target.name;
        let val = event.target.value;

        let newState = Object.assign({}, this.state);
        newState.security[nam] = val;
        this.setState(newState);
        let errors = this.state.errors;
        switch(nam) {
            case 'password':
                errors.password =
                    !this.state.passwordRegularExpression.test(val)
                        ? 'Password must contain at least one uppercase, one lowercase and one special character and be 8 characters long.'
                        : '';
                break;
            case 'newPassword':
                this.state.passwordRegularExpression.test(val);
                errors.newPassword =
                    !this.state.passwordRegularExpression.test(val)
                        ? 'Password must contain at least one uppercase, one lowercase and one special character and be 8 characters long.'
                        : '';
                break;
            case 'repeatNewPassword':
                errors.repeatNewPassword =
                    this.state.security.newPassword != this.state.security.repeatNewPassword
                        ? 'Password does not match.'
                        : '';
                break;
            default:
                break;
        }
        this.setState({errors, [nam]: val});
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

    handleSecuritySubmit(event) {
        event.preventDefault();
    }

    validateData(event) {
        event.preventDefault();
        console.log(this.state);
        if(this.state.errors.password != ''
            || this.state.errors.newPassword != ''
            || this.state.errors.repeatNewPassword != ''
            || this.state.security.password == ''
            || this.state.security.newPassword == ''
            || this.state.security.repeatNewPassword == '') {
            this.setState({"validate": true});
            this.props.validate = true;
            return true;
        }
        this.setState({"validate": false});
        this.props.validate = false;
        return false;
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
                                        <CustomTab first={<GeneralForm item={this.state.item} handlePostChange={this.handlePostChange} handleSubmit={this.handleSubmit} />}
                                                   second={<SecurityForm validate={this.state.validate} validateData={this.validateData} security={this.state}
                                                                         handleSecurityChange={this.handleSecurityChange}
                                                                         handleSubmit={this.handleSecuritySubmit} />} />
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