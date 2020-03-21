import React, { Component } from 'react';
import NavBar from "../navigation/NavBar";
import LinearGraph from "../graphs/LinearGraph";
import GoogleMapsGraph from "../graphs/GoogleMapsGraph";
export class IndexPage extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                {this.props.children}
            </div>
        );
    }
}

export default IndexPage;
