import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import {FlexibleWidthXYPlot, Hint, HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, YAxis} from "react-vis";
import {ForceGraph, ForceGraphArrowLink, ForceGraphNode} from "react-vis-force";
import Paper from "@material-ui/core/Paper";

export default class CustomGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    render() {
        let results = this.props.data;
        return(
            <Fragment>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <div style={{borderColor: 'grey', borderStyle: 'solid'}}>
                    <ForceGraph simulationOptions={{ height: 300, width: 300, animate: false, strength: {
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
                </div>
            </Fragment>
        )
    }
}