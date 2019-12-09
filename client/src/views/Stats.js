import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import Chart from '../components/Chart';

const Stats = () => {

    //Getting Context
    const { userContext, setUserContext } = useContext(UserContext)


    // This weeks dates and compare to 

    //Calculating current weeks days -- code still wrong, using different script later

    let curr = new Date
    let currentWeek = []

    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        currentWeek.push(day)
    }

    // extracting data from context

    let today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ("0" + today.getDate()).slice(-2);

    console.log(date);

    if (userContext.User.ToDoTasks) {
        userContext.User.ToDoTasks.map(elem => {

        })
    }



    let datapoints = [1, 3, 5, 40, 5, 4, 2];

    const [data, setData] = useState(
        {
            chartData: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Days of the week",
                        data: datapoints,
                    }
                ]
            }
        }
    );


    // console.log(data)

    console.log(userContext.User.ToDoTasks)

    return (
        <div>
            <div className="text-center"><h3>Check out what you did!</h3></div>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h5>This Week</h5>
                </div>
                <div className="col-sm-12 text-center">
                    <h5>Last Week</h5>
                </div>
                <div className="col-sm-12 text-center">
                    <h5>This Month</h5>
                </div>
                <div className="col-sm-12 text-center">
                    <h5>Last Month</h5>
                </div>
            </div>

            <Chart chartData={data.chartData} />

            <div
                style={{
                    width: '600px',
                    height: '300px'
                }}
            >
            </div>
        </div>
    )
};

export default Stats;
