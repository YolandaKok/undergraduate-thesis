import React, {Component, Fragment} from 'react';
import NavBar from "./NavBar";
import Knapsack from "./Knapsack";

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