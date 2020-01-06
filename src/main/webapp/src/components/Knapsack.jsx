import React, {Component, Fragment} from 'react';


import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries
} from 'react-vis';
import * as PropTypes from "prop-types";

class ChildComponent extends Component {

    constructor(props) {
        super(props);
        console.log('ChildComponent: state');
    }

    render() {
        console.log('ChildComponent: render');
        return (
            <div>
                Name: {this.props.name}
            </div>
        );
    }
}

ChildComponent.defaultProps = {
    name: "Nelly"
};

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
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        this.setState({
            results: [
                {x: 330, y: 7, size: 2, color: 0.3},
                {x: 82, y: 0, size: 2, color: 0.3},
                {x: 65, y: 30, size: 2, color: 1.4},
                {x: 110, y: 22, size: 2, color: 1.4}]
        });
    }

    render() {
        let results = this.state.results;
        console.log('ParentComponent: render');
        return (
            <Fragment>
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
                <button onClick={this.onButtonClick}>Click me</button>
                <ChildComponent></ChildComponent>
            </Fragment>
        );
    }
}

export default Knapsack;