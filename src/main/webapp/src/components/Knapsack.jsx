import React, { Component } from 'react';


import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries
} from 'react-vis';

export class Knapsack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [
                {x: 360, y: 7, size: 2, color: 0.3},
                {x: 83, y: 0, size: 2, color: 0.3},
                {x: 59, y: 30, size: 2, color: 1.4},
                {x: 130, y: 22, size: 2, color: 1.4}]
        };
    }


    render() {
        let results = this.state.results;

        return (
            <XYPlot width={500} height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <MarkSeries
                    className="mark-series-example"
                    strokeWidth={2}
                    opacity="0.8"
                    sizeRange={[3, 8]}
                    colorType="linear"
                    colorDomain={[0, 1, 2]}
                    colorRange={['blue', 'red', 'yellow']}
                    data={results}
                />
            </XYPlot>
        );
    }
}

export default Knapsack;