import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from './Chart';


class ChartDisplay extends Component {

    state = {
        chartData: {
            labels: ["Monday", "Tuesday", "Wednesday"],
            datasets: [
                {
                    label: "Days of the Week",
                    data: [3, 6, 1, 6, 89]
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <h1>This is gonna be a chart</h1>
                <Chart
                    chartData={this.state.chartData}
                />
            </div>
        )
    }
}

export default ChartDisplay;
