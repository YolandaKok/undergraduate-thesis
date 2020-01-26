import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import styles from "../../static/signup.module.css";
import {HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";

export default class CustomGraph extends Component {
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
            ],
            formData: []
        };
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
        return(
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <h5>Graph</h5>
                <hr className={styles.marginHr}></hr>
                <XYPlot width={400} height={400}>
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
            </Grid>
        )
    }
}