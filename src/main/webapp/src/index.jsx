import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TSP from './components/TSP';

const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/tsp" component={TSP} />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    routing, document.getElementById('app')
);
