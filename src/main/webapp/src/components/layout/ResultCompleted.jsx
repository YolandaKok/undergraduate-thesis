import React, { Component } from 'react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {CustomizedAlert} from "../errors/CustomizedAlert";


export default class ResultCompleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            message: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
        this.setState({ message: nextProps.message });
    }

    render() {
        return(
            <Container>
                <Grid container>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <CheckCircleRoundedIcon style={{fontSize: "200px", color: 'green'}}/>
                        <h3>You have completed the experiment.<br/>Click to save the experiment.</h3>
                        <CustomizedAlert value={this.state.value}
                                         message={this.state.message}></CustomizedAlert>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}