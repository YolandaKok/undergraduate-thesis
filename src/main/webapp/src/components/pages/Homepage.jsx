import React, { Component, Fragment } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../static/signup.module.css";
import CustomBreadCrumb from "../layout/CustomBreadCrumb";
import CustomCard from "../layout/CustomCard";
import SvgIcon from "@material-ui/core/SvgIcon";
const axios = require('axios');


export class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "firstname": '',
            "lastname": ''
        }
    }

    componentWillMount() {
        axios.get(SERVICE_URL + '/users/' + localStorage.getItem('username_info'), {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
                console.log(response);
                this.setState({"firstname": response.data.firstname,
                                "lastname": response.data.lastname});
                },
            (error) => {
                console.log("error");
            });
    }

    componentDidMount() {
        document.body.style.background = "white";
    }

    render() {
        return(
            <div>
                <ResponsiveDrawer firstname={this.state.firstname} lastname={this.state.lastname}/>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);
