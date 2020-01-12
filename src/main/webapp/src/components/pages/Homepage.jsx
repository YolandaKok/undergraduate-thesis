import React, { Component, Fragment } from 'react';
import ResponsiveDrawer from "../navigation/ResponsiveDrawer";

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
                <ResponsiveDrawer/>
            </div>
        );
    }
}