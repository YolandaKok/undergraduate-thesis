import React, { Component } from 'react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {CustomizedAlert} from "../errors/CustomizedAlert";
import {withRouter} from "react-router-dom";

export class ResultCompleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            message: null,
            path: null,
            componentName: null
        }
        this.redirectTo = this.redirectTo.bind(this);
    }

    redirectTo(path) {
        this.props.history.push(path);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
        this.setState({ message: nextProps.message });
        this.setState({ path: nextProps.path });
        this.setState({ componentName: nextProps.componentName });
    }

    render() {
        return(
            <Container>
                <Grid container>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <CheckCircleRoundedIcon style={{fontSize: "200px", color: 'green'}}/>
                        <h3>You have completed the experiment.</h3>
                        <CustomizedAlert value={this.state.value}
                                         message={this.state.message}
                                         path={this.state.path}
                                         componentName={this.state.componentName}></CustomizedAlert>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(ResultCompleted)