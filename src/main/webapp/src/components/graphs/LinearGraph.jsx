import React from 'react';
import XYPlot from "react-vis/es/plot/xy-plot";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import XAxis from "react-vis/es/plot/axis/x-axis";
import YAxis from "react-vis/es/plot/axis/y-axis";
import LineSeries from "react-vis/es/plot/series/line-series";
import {Hint} from "react-vis";

export default function LinearGraph(props) {
    return (
        <XYPlot width={300} height={300}>
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
            <LineSeries
                className="first-series"
                data={[{x: 2.0, y: 6.0}, {x: -1.0, y: -3.0}]}
                style={{
                    strokeLinejoin: 'round',
                    strokeWidth: 4
                }}
                onNearestXY={(val, {index}) => {
                    //do smth
                }}
            />
            <LineSeries
                className="first-series"
                data={[{x: -1.0, y: -3.0}, {x: 6.0, y: 4.0}]}
                style={{
                    strokeLinejoin: 'round',
                    strokeWidth: 4
                }}
            />
            <LineSeries
                className="first-series"
                data={[{x: 2.0, y: 6.0}, {x: 6.0, y: 4.0}]}
                style={{
                    strokeLinejoin: 'round',
                    strokeWidth: 4
                }}
            />
            {/*<LineSeries*/}
            {/*    className="first-series"*/}
            {/*    data={[{x: 2.0, y: 6.0}, {x: -1.0, y: -3.0}, {x: 6.0, y: 4.0}, {x: 2.0, y: 6.0}]}*/}
            {/*    style={{*/}
            {/*        strokeLinejoin: 'round',*/}
            {/*        strokeWidth: 4*/}
            {/*    }}*/}
            {/*/>*/}
            <LineSeries
                className="first-series"
                data={[{x: 0.0, y: 34/4},{x: 6.0, y: 4.0}, {x: 7.0, y: 13/4}]}
                style={{
                    strokeLinejoin: 'round',
                    strokeWidth: 2
                }}
            />
            <Hint value={"x"}>
                <div style={{background: 'black'}}>
                    <h3>Value of hint</h3>
                </div>
            </Hint>
        </XYPlot>
    );
}