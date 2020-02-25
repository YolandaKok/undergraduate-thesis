import React, { Component } from 'react';
import NavBar from "../navigation/NavBar";
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