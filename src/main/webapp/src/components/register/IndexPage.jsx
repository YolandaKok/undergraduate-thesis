import React, { Component } from 'react';
import NavBar from "../navigation/NavBar";
import Knapsack from "../algorithms/Knapsack";
export class IndexPage extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <Knapsack/>
            </div>
        );
    }
}

export default IndexPage;