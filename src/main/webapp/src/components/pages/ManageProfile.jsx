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
            userInfoErrors: {
                firstname: '',
                lastname: '',
                email: ''
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
            emailRegularExpression: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            requestValue: null,
            message: null,
            validate: true,
            validateGeneral: true
        }
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateDataGeneral = this.validateDataGeneral.bind(this);

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

        let errors = this.state.userInfoErrors;
        switch(nam) {
            case 'firstname':
                errors.firstname =
                    this.state.item.firstname.length < 3
                        ? 'Firstname should be at least 2 characters long.'
                        : '';
                break;
            case 'lastname':
                errors.lastname =
                    this.state.item.lastname.length < 3
                        ? 'Lastname should be at least 2 characters long.'
                        : '';
                break;
            case 'email':
                errors.email =
                    !this.state.emailRegularExpression.test(val)
                        ? 'Please enter a valid email address.'
                        : '';
                break;
            default:
                break;
        }
        this.setState({errors, [nam]: val});
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
        let item = {
            "oldPassword": this.state.security.password,
            "newPassword": this.state.security.newPassword
        };
        axios.put(SERVICE_URL + '/users/change/password/' + this.state.item.id, item, {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
            if(response.data.item == true) {
                this.setState({"requestValue": "success"});
                this.setState({"message": "You have successfully updated password."});
            } else {
                this.setState({"requestValue": "danger"});
                this.setState({"message": "Oops, Wrong password."});
            }
        }, (error) => {
            this.setState({"requestValue": "danger"});
            this.setState({"message": "Oops, something went wrong."});
            console.log(error);
        });
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

    validateDataGeneral(event) {
        event.preventDefault();
        if(this.state.userInfoErrors.firstname != ''
            || this.state.userInfoErrors.lastname != ''
            || this.state.userInfoErrors.email != '') {
            this.setState({"validateGeneral": true});
            this.props.validateGeneral = true;
            return true;
        }
        this.setState({"validateGeneral": false});
        this.props.validateGeneral = false;
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
                        <Grid xl={2}>
                            <List className={classes.list} display={{ xs: 'none', md: 'none', lg: 'none', xl: 'block' }}>
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
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Container>
                                <Grid container justify={'center'}>
                                    <Grid item xs={12} component={Paper}>
                                        <CustomTab first={<GeneralForm data={this.state} validateGeneral={this.state.validateGeneral} handlePostChange={this.handlePostChange} handleSubmit={this.handleSubmit} validateData={this.validateDataGeneral} />}
                                                   second={<SecurityForm security={this.state} validate={this.state.validate} validateData={this.validateData}
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