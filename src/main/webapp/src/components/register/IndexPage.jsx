import React, { Component } from 'react';
import NavBar from "../navigation/NavBar";
import LinearGraph from "../graphs/LinearGraph";
import GoogleMapsGraph from "../graphs/GoogleMapsGraph";
export class IndexPage extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                {/*<GoogleMapsGraph/>*/}
                {this.props.children}
            </div>
        );
    }
}

export default IndexPage;