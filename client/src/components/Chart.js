import React from 'react';
import { Bar } from 'react-chartjs-2';


function Chart(props) {
    return (
        <div>
            <Bar
                data={props.chartData}
                options={{
                    title: {
                        display: false,
                        text: "Tasks completed"
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        text: "Tasks completed",
                        textColor: 'white'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: true,
                                beginAtZero: true,
                                fontColor: 'white',
                                precision: 0,
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                        }]
                    }
                }}
            />
        </div>
    )
}

export default Chart;