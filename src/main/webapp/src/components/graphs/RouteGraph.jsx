import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import {
    FlexibleWidthXYPlot,
    FlexibleXYPlot,
    Hint,
    HorizontalGridLines,
    MarkSeries,
    VerticalGridLines,
    XAxis,
    YAxis
} from "react-vis";
import {ForceGraph, ForceGraphArrowLink, ForceGraphNode} from "react-vis-force";
import Paper from "@material-ui/core/Paper";
import XYPlot from "react-vis/es/plot/xy-plot";
import ChartLabel from "react-vis/es/plot/chart-label";
import LineSeries from "react-vis/es/plot/series/line-series";
import {Container} from "react-bootstrap";

export default class CustomGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    // [{x: 0, y: 'Athens'}, {x: 3400, y: 'Berlin'}, {x: 5000, y: 'Amsterdam'}, {x: 5200, y: 'Rotterdam'}]
    createData(nodes, routes, distanceMatrix) {
        let data = [];
        let i;
        let currentDistance = 0;
        for(i = 0; i < nodes.length-1; i++) {
            let obj = {
                x: currentDistance,
                y: nodes[routes[i]]
            };
            data.push(obj);
            currentDistance += distanceMatrix[routes[i]][routes[i+1]];
        }
        let obj = {
            x: currentDistance + distanceMatrix[routes[0]][routes[i]],
            y: nodes[routes[i]]
        }
        console.log('Current Distance' + currentDistance);
        data.push(obj);
        return data;
    }

    render() {
        // Nodes are the cities
        let nodes = this.props.nodes;
        let routes = this.props.routes;
        let distanceMatrix = this.props.distanceMatrix;

        return(
            <Fragment>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>

                <FlexibleXYPlot yType='ordinal' margin={{left: 100}}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis />
                    <YAxis />
                    <ChartLabel
                        text="X Axis"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.025}
                        yPercent={1.01}
                    />

                    <ChartLabel
                        text="Y Axis"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.06}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                        }}
                    />
                    <LineSeries
                        className="first-series"
                        data={this.createData(nodes, routes, distanceMatrix)}
                    />
                </FlexibleXYPlot>

            </Fragment>
        )
    }
}