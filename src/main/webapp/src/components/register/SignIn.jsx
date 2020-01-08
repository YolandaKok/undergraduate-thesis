import React, {Component, Fragment} from 'react';
import NavBar from "../navigation/NavBar";
import Knapsack from "../algorithms/Knapsack";

export class SignIn extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <div>
                    Sign In
                </div>
                <Knapsack/>
            </Fragment>
        );
    }
}

export default SignIn;