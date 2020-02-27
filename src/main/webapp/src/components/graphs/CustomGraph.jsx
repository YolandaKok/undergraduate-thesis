import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import {
    FlexibleWidthXYPlot,
    Hint,
    HorizontalGridLines,
    MarkSeries,
    VerticalGridLines,
    XAxis,
    YAxis,
} from "react-vis";

export default class CustomGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            formData: [],
            value: false,
            series: [{
                title: "Initial",
                disabled: false,
                color: 1.3,
            }]
        };
    }

    render() {
        let results = this.props.data;
        let titleX = this.props.titleX;
        let titleY = this.props.titleY;

        const markSeriesProps = {
            className: 'mark-series-example',
            sizeRange: [3, 8],
            seriesId: 'my-example-scatterplot',
            opacityType: 'literal',
            data: results,
            stokeWidth: 2,
            opacity: 0.8,
            colorType: 'linear',
            colorDomain: [0, 1, 2, 3, 4, 5],
            colorRange: ['blue', 'red', 'yellow'],
            onNearestXY: value => this.setState({value})
        };
        return(
            <Fragment>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <FlexibleWidthXYPlot height={400} onMouseLeave={() => this.setState({value: false})}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title={titleX} />
                    <YAxis title={titleY} />
                    <MarkSeries
                        {...markSeriesProps}
                        />
                    {this.state.value ? <Hint value={this.state.value} /> : null}
                </FlexibleWidthXYPlot>
            </Fragment>
        )
    }
}

CustomGraph.defaultProps = {
    titleX: '',
    titleY: ''
}