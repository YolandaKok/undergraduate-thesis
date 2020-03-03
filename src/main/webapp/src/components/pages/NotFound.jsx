import React, {Component, Fragment} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import {withRouter} from "react-router-dom";

export class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <Fragment>
                <Container fixed>
                    <Grid className={styles.gridPadding}
                          container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justify="center">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justify="center">
                            <h1 style={{fontSize: 72, fontWeight: "bold"}}>Oops!</h1>
                            <h2 style={{fontSize: 52, fontWeight: "bold"}}>Not Found - 404</h2>
                            <a style={{fontSize: 32}} href={'/'}>Go to Homepage</a>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Container>
                </Fragment>
        );
    }
}

export default withRouter(NotFound);