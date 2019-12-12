import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';


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
                        position: 'right',
                        text: "Tasks completed",
                        textColor: 'white'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: true,
                                beginAtZero: true,
                                fontColor: 'white',
                                gridLines: {
                                    display: false,
                                    drawBorder: false,
                                }
                            },
                        }
                        ],
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