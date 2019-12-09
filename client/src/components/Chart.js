import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';


function Chart(props) {
    return (
        <div>
            <Bar
                data={props.chartData}
                options={{}}
            />
        </div>
    )
}

export default Chart;