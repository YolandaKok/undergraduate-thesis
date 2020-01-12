import React, { Component, Fragment } from 'react';

export class Homepage extends Component {

    componentDidMount() {
        document.body.style.background = "#white";
    }

    render() {
        return(
            <h1>Hello</h1>
        );
    }
}