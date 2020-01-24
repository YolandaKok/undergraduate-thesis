import React, {Component, Fragment} from 'react';
import '../../../node_modules/react-vis/dist/style.css';

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

export class MultipleKnapsacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [
                {x: 360, y: 7, size: 2, color: 0.3},
                {x: 83, y: 0, size: 2, color: 0.3},
                {x: 59, y: 30, size: 2, color: 0.3},
                {x: 130, y: 22, size: 2, color: 0.3},
                {x: 431, y: 80, size: 2, color: 0.3},
                {x: 67, y: 94, size: 2, color: 0.3},
                {x: 230, y: 11, size: 2, color: 0.3},
                {x: 52, y: 81, size: 2, color: 0.3},
            ]
        };
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        this.setState({
            results: [
                {x: 360, y: 7, size: 2, color: 1.3},
                {x: 83, y: 0, size: 2, color: 1.3},
                {x: 59, y: 30, size: 2, color: 0.3},
                {x: 130, y: 22, size: 2, color: 1.3},
                {x: 431, y: 80, size: 2, color: 1.3},
                {x: 67, y: 94, size: 2, color: 0.3},
                {x: 230, y: 11, size: 2, color: 1.3},
                {x: 52, y: 81, size: 2, color: 0.3},
            ]
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

export default MultipleKnapsacks;