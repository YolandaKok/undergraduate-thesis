import React, { Component } from 'react';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

export class TSP extends Component {
    render() {
        return (
            <ForceGraph simulationOptions={{ height: 300, width: 300, animate: true, strength: {x: 0.0001, y: 0.0001} }}>
                <ForceGraphNode node={{ id: 'Athens' }} fill="red" showLabel />
                <ForceGraphNode node={{ id: 'Torino' }} fill="blue" showLabel />
                <ForceGraphNode node={{ id: 'Berlin' }} fill="red" showLabel />
                <ForceGraphLink link={{ source: 'Athens', target: 'Torino' }} />
                <ForceGraphLink link={{ source: 'Torino', target: 'Berlin' }} />
            </ForceGraph>
        );
    }
}

export default TSP;