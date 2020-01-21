import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import IndexPage from './components/register/IndexPage';
import SignIn from './components/register/SignIn';
import SignUp from './components/register/SignUp';
import TSP from './components/algorithms/TSP';
import {Homepage} from "./components/pages/Homepage";
import HomepageLayout from "./components/layout/HomepageLayout";
import SelectAlgorithm from "./components/pages/SelectAlgorithm";

const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/app/tsp" component={TSP} />
            <Route exact path="/app/homepage" component={()=>["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            })?<Homepage><HomepageLayout /></Homepage> : <IndexPage/>} />
            <Route exact path="/" component={()=>["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            })?<Homepage><HomepageLayout /></Homepage> : <IndexPage/>} />
            <Route exact path="/select/algorithm" component={()=>["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            })?<Homepage><SelectAlgorithm /></Homepage> : <IndexPage/>} />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    routing, document.getElementById('app')
);
