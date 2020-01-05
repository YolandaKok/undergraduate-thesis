import React, {Component, Fragment} from 'react';
import NavBar from "./NavBar";

export class SignIn extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <div>
                    Sign In
                </div>
            </Fragment>
        );
    }
}

export default SignIn;