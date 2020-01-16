import React, { Component, Fragment } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export class Homepage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.style.background = "#white";
    }

    render() {
        return(
            <div>
                <Container fixed>
                    <React.Fragment>
                        <ResponsiveDrawer/>
                        <Container fixed>
                            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
                        </Container>
                    </React.Fragment>
                </Container>
            </div>
        );
    }
}