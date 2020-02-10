import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import {FlexibleXYPlot, HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";
import Box from "@material-ui/core/Box";

export default class CustomGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            formData: []
        };
    }

    render() {
        let results = this.props.data;
        let titleX = this.props.titleX;
        let titleY = this.props.titleY;
        return(
            <Fragment>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <FlexibleXYPlot>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title={titleX} />
                    <YAxis title={titleY} />
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
                </FlexibleXYPlot>
            </Fragment>
        )
    }
}

CustomGraph.defaultProps = {
    titleX: '',
    titleY: ''
}