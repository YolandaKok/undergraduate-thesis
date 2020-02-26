import React, { Component } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../static/signup.module.css";
const axios = require('axios');


export class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "firstname": '',
            "lastname": '',
            items: []
        }
        this.userInfo = this.userInfo.bind(this);
    }

    componentDidMount() {
        document.body.style.background = "white";
    }

    componentWillMount() {
        this.userInfo();
        this.algorithmInfo();
    }

    userInfo() {
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

    algorithmInfo() {
        axios.get(SERVICE_URL + '/algorithms/recent' + '?size=' + this.state.perPage + '&page=' + this.state.offset , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        }).then((response) => {
            console.log(response);
            let results = [];
            for(let i = 0; i < response.data.response.length; i++) {
                let obj = {
                    title: response.data.response[i].name,
                    url: "/algorithms/" + response.data.response[i].name.replace(/\s/g, "").toLowerCase() + "/" + response.data.response[i].id
                };
                results.push(obj);
            }
            this.setState({"items": results});
        },
        (error) => {
            console.log("error");
        });
    }

    render() {
        return(
            <div>
                <ResponsiveDrawer algorithmLinks={this.state.items} firstname={this.state.firstname} lastname={this.state.lastname}/>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Homepage);
