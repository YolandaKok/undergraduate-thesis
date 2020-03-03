import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import IndexPage from './components/register/IndexPage';
import SignIn from './components/register/SignIn';
import SignUp from './components/register/SignUp';
import TSP from './components/algorithms/TSP';
import {Homepage} from "./components/pages/Homepage";
import HomepageLayout from "./components/layout/HomepageLayout";
import SelectAlgorithm from "./components/pages/SelectAlgorithm";
import Knapsack from "./components/algorithms/Knapsack";
import MultipleKnapsacks from "./components/algorithms/MultipleKnapsacks";
import MyExperiments from "./components/pages/MyExperiments";
import ShowResult from "./components/layout/ShowResult";
import ShowResultMultiple from "./components/layout/ShowResultMultiple";
import ShowResultRouting from "./components/layout/ShowResultRouting";
import ManageProfile from "./components/pages/ManageProfile";
import LinearOpt from "./components/algorithms/LinearOpt";
import ShowResultLinear from "./components/layout/ShowResultLinear";
import NotFound from "./components/pages/NotFound";

const jwtDecode = require('jwt-decode');

const routing = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/signin" component={() => checkToken() ? <Homepage><HomepageLayout/></Homepage> : <SignIn/>}/>

            <Route exact path="/signup" component={() => checkToken() ? <Homepage><HomepageLayout/></Homepage> : <SignUp/>}/>

            <Route exact path="/" component={() => checkToken() ? <Homepage><HomepageLayout/></Homepage> : <IndexPage/>}/>

            <Route exact path="/select/algorithm" component={() => checkToken() ? <Homepage><SelectAlgorithm/></Homepage> : <IndexPage/>}/>

            <Route exact path="/algorithms/knapsack/:id" component={() => checkToken() ? <Homepage><Knapsack/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/algorithms/multipleknapsacks/:id" component={() => checkToken() ? <Homepage><MultipleKnapsacks/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/algorithms/travellingsalesman/:id" component={() => checkToken() ? <Homepage><TSP/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/algorithms/linearoptimization/:id" component={() => checkToken() ? <Homepage><LinearOpt/></Homepage> : <IndexPage/>}/>

            <Route exact path="/myexperiments" component={() => checkToken() ? <Homepage><MyExperiments/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/profile" component={() => checkToken() ? <Homepage><ManageProfile/></Homepage> : <IndexPage/>}/>

            <Route exact path="/show/result/knapsack/:id" component={() => checkToken() ? <Homepage><ShowResult/></Homepage> : <IndexPage/>}/>

            <Route exact path="/show/result/multipleknapsacks/:id" component={() => checkToken() ? <Homepage><ShowResultMultiple/></Homepage> : <IndexPage/>}/>

            <Route exact path="/show/result/travellingsalesman/:id" component={() => checkToken() ? <Homepage><ShowResultRouting/></Homepage> : <IndexPage/>}/>

            <Route exact path="/show/result/linearoptimization/:id" component={() => checkToken() ? <Homepage><ShowResultLinear/></Homepage> : <IndexPage/>}/>

            <Route path="">
                <Homepage><NotFound/></Homepage>
            </Route>
        </Switch>
    </BrowserRouter>
);

function checkToken() {
    try {
        let decoded = jwtDecode(localStorage.getItem('authorization').substring(7,localStorage.getItem('authorization').length));
        return true;
    } catch(err) {
        return false;
    }
}

ReactDOM.render(
    routing, document.getElementById('app')
);
