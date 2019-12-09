import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import './styles/app.scss';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const routing = (
    <BrowserRouter>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
            <Route exact path="/" component={IndexPage} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    routing, document.getElementById('app')
);
