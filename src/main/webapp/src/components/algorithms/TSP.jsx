import React, { Component } from 'react';
import {ForceGraph, ForceGraphNode, ForceGraphLink, ForceGraphArrowLink} from 'react-vis-force';
import '../../../node_modules/react-vis/dist/style.css';
const axios = require('axios');

export class TSP extends Component {

    componentDidMount() {
        document.body.style.background = "white";
        console.log(SERVICE_URL);
    }

    componentWillMount() {
        axios.get('distance.py' , {
            headers: {"Authorization": localStorage.getItem('authorization')}
        })
        .then((response) => {
            console.log(response);
        },
        (error) => {

        });
    }

    render() {
        return (
            <ForceGraph simulationOptions={{ height: 600, width: 600, animate: false, strength: {
                    x: ({ radius }) => 15 / radius,
                    y: ({ radius }) => 3 / radius,
                } }} >
                <ForceGraphNode node={{ id: 'Athens', radius: 5 }} fill="red" showLabel />
                <ForceGraphNode node={{ id: 'Torino', radius: 8 }} fill="blue" showLabel />
                <ForceGraphNode node={{ id: 'Berlin', radius: 10 }} fill="red" showLabel />
                <ForceGraphNode node={{ id: 'Frankfurt', radius: 12 }} fill="yellow" showLabel />
                <ForceGraphArrowLink link={{ source: 'Athens', target: 'Torino' }} />
                <ForceGraphArrowLink link={{ source: 'Torino', target: 'Berlin' }} />
                <ForceGraphArrowLink link={{ source: 'Berlin', target: 'Frankfurt' }} />
            </ForceGraph>
        );
    }
}

export default TSP;