import React, {Component, Fragment} from 'react';
import XYPlot from "react-vis/es/plot/xy-plot";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import XAxis from "react-vis/es/plot/axis/x-axis";
import YAxis from "react-vis/es/plot/axis/y-axis";
import LineSeries from "react-vis/es/plot/series/line-series";
import {FlexibleWidthXYPlot, Hint} from "react-vis";
import styles from "../../static/signup.module.css";

export default class LinearGraph extends Component {
    constructor(props) {
        super(props);

    }

    createLines(data) {
        let result = [];
        for(let i = 0; i < data.length-1; i++) {
            result.push(<LineSeries className="first-series"
                                    data={[{x: data[i][0], y: data[i][1]}, {x: data[i+1][0], y: data[i+1][1]}]}
                                    style={{
                                        strokeLinejoin: 'round',
                                        strokeWidth: 4
                                    }}>
                        </LineSeries>);
        }
        result.push(<LineSeries className="first-series"
                                data={[{x: data[0][0], y: data[0][1]}, {x: data[data.length-1][0], y: data[data.length-1][1]}]}
                                style={{
                                    strokeLinejoin: 'round',
                                    strokeWidth: 4
                                }}>
        </LineSeries>);
        return result;
    }

    createResult(result) {
        return(
                <LineSeries
                    className="first-series"
                    data={[{x: result[0][0], y: result[0][1]},{x: result[1][0], y: result[1][1]}, {x: result[2][0], y: result[2][1]}]}
                    style={{
                        strokeLinejoin: 'round',
                        strokeWidth: 2
                    }}
                />
            );
    }

    render() {
        let data = this.props.data;
        console.log("Data: " + data);
        let result = this.props.resultLine;
        return (
            <Fragment>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <FlexibleWidthXYPlot height={400}>
                    <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
                    <VerticalGridLines style={{stroke: '#B7E9ED'}} />
                    <XAxis
                        title="X Axis"
                        style={{
                            line: {stroke: '#ADDDE1'},
                            ticks: {stroke: '#ADDDE1'},
                            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                        }}
                    />
                    <YAxis title="Y Axis" />
                    {
                        this.createLines(data)
                    }
                    <LineSeries
                        className="first-series"
                        data={[{x: result[0][0], y: result[0][1]},{x: result[1][0], y: result[1][1]}, {x: result[2][0], y: result[2][1]}]}
                        style={{
                            strokeLinejoin: 'round',
                            strokeWidth: 2
                        }}
                    />
                </FlexibleWidthXYPlot>
            </Fragment>
        );
    }

}

{/*<LineSeries*/}
{/*    className="first-series"*/}
{/*    data={[{x: 2.0, y: 6.0}, {x: -1.0, y: -3.0}, {x: 6.0, y: 4.0}, {x: 2.0, y: 6.0}]}*/}
{/*    style={{*/}
{/*        strokeLinejoin: 'round',*/}
{/*        strokeWidth: 4*/}
{/*    }}*/}
{/*/>*/}

// <LineSeries
//     className="first-series"
//     data={[{x: 2.0, y: 6.0}, {x: -1.0, y: -3.0}]}
//     style={{
//         strokeLinejoin: 'round',
//         strokeWidth: 4
//     }}
//     onNearestXY={(val, {index}) => {
//         //do smth
//     }}
// />
// <LineSeries
// className="first-series"
// data={[{x: -1.0, y: -3.0}, {x: 6.0, y: 4.0}]}
// style={{
//     strokeLinejoin: 'round',
//         strokeWidth: 4
// }}
// />
// <LineSeries
//     className="first-series"
//     data={[{x: 2.0, y: 6.0}, {x: 6.0, y: 4.0}]}
//     style={{
//         strokeLinejoin: 'round',
//         strokeWidth: 4
//     }}
// />