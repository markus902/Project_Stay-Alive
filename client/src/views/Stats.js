import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import Chart from '../components/Chart';
import moment from 'moment';

const Stats = () => {

    //Getting Context
    const { userContext, setUserContext } = useContext(UserContext);
    const [chartInputThisWeek, setChartInputThisWeek] = useState();
    const [chartInputLastWeek, setChartInputLastWeek] = useState();
    const [dataThisWeek, setDataThisWeek] = useState(
        {
            chartData: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Days of the week",
                        data: chartInputThisWeek
                    }
                ]
            }
        });

    const [dataLastWeek, setDataLastWeek] = useState(
        {
            chartData: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [
                    {
                        label: "Days of the week",
                        data: []
                    }
                ]
            }
        });

    useEffect(() => {
        if (userContext.User.ToDoTasks) {

            // Defining variables

            let curr = new Date
            let thisWeek = [];
            let lastWeek = [];
            let tasksThisWeek = [0, 0, 0, 0, 0, 0, 0];
            let tasksLastWeek = [0, 0, 0, 0, 0, 0, 0];

            //Getting array with this weeks data


            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                thisWeek.push(day)
            }

            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
                lastWeek.push(day)
            }

            // var date = curr.getFullYear() + '-' + (curr.getMonth() + 1) + '-' + ("0" + curr.getDate()).slice(-2)

            userContext.User.ToDoTasks.forEach(elem => {
                if (thisWeek.indexOf(elem.complete.slice(0, 10)) == -1) {
                    console.log("not in there");
                }
                else {
                    console.log("in there");
                    tasksThisWeek[moment(elem.complete).day()] = tasksThisWeek[moment(elem.complete).day()] + 1;
                }
            });
            setChartInputThisWeek(tasksThisWeek);

            userContext.User.ToDoTasks.forEach(elem => {
                if (lastWeek.indexOf(elem.complete.slice(0, 10)) == -1) {
                    console.log("not in there");
                }
                else {
                    console.log("in there");
                    tasksLastWeek[moment(elem.complete).day()] = tasksLastWeek[moment(elem.complete).day()] + 1;
                }
            })
            setChartInputLastWeek(tasksLastWeek);
            console.log(tasksThisWeek);
        }
    }, [userContext])

    useEffect(() => {
        setDataThisWeek(
            {
                chartData: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [
                        {
                            label: "This Week",
                            data: chartInputThisWeek
                        }
                    ]
                }
            })
    }, [chartInputThisWeek])

    useEffect(() => {
        setDataLastWeek(
            {
                chartData: {
                    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    datasets: [
                        {
                            label: "Last Week",
                            data: chartInputThisWeek
                        }
                    ]
                }
            })
    }, [chartInputLastWeek])

    // let datapoints = [1, 3, 5, 40, 5, 4, 2];

    console.log(chartInputThisWeek)
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

            <Chart chartData={dataThisWeek.chartData} />
            <Chart chartData={dataLastWeek.chartData} />


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
