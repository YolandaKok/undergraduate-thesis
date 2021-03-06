import React, {Component, Fragment} from 'react';
import styles from "../../static/signup.module.css";
import {
    FlexibleXYPlot,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis
} from "react-vis";
import ChartLabel from "react-vis/es/plot/chart-label";
import LineSeries from "react-vis/es/plot/series/line-series";

export default class RouteGraph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                        data={this.props.data}
                    />
                </FlexibleXYPlot>

            </Fragment>
        )
    }
}