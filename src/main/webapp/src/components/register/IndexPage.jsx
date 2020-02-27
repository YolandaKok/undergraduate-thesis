import React, { Component } from 'react';
import NavBar from "../navigation/NavBar";
import LinearGraph from "../graphs/LinearGraph";
export class IndexPage extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <LinearGraph/>
                {this.props.children}
            </div>
        );
    }
}

export default IndexPage;