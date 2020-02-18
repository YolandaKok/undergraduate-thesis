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
import Knapsack from "./components/algorithms/Knapsack";
import MultipleKnapsacks from "./components/algorithms/MultipleKnapsacks";
import MyExperiments from "./components/pages/MyExperiments";
import ShowResult from "./components/layout/ShowResult";
import ShowResultMultiple from "./components/layout/ShowResultMultiple";

let routerProps;
const routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/app/tsp" component={TSP}/>
            <Route exact path="/app/homepage" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            })? <Homepage><HomepageLayout/></Homepage> : <IndexPage/>} />
            <Route exact path="/" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><HomepageLayout/></Homepage> : <IndexPage/>}/>
            <Route exact path="/select/algorithm" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><SelectAlgorithm/></Homepage> : <IndexPage/>}/>

            <Route exact path="/algorithms/knapsack/:id" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><Knapsack/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/algorithms/multipleknapsacks/:id" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><MultipleKnapsacks/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/algorithms/travellingsalesman/:id" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><TSP/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/myexperiments" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><MyExperiments/></Homepage> : <IndexPage/>}></Route>

            <Route exact path="/show/result/knapsack/:id" component={() => ["null", '', undefined, null].every((text) => {
            return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><ShowResult/></Homepage> : <IndexPage/>}/>

            <Route exact path="/show/result/multipleknapsacks/:id" component={() => ["null", '', undefined, null].every((text) => {
                return localStorage.getItem('authorization') !== text;
            }) ? <Homepage><ShowResultMultiple/></Homepage> : <IndexPage/>}/>

        </div>
    </BrowserRouter>
);

ReactDOM.render(
    routing, document.getElementById('app')
);
