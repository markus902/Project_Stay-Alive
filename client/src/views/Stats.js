import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import Chart from '../components/Chart';
import moment from 'moment';
import '../components/chartStyle.css';


const Stats = () => {

    //Getting Context
    const { userContext, setUserContext } = useContext(UserContext);
    const [chartInputThisWeek, setChartInputThisWeek] = useState();
    const [chartInputLastWeek, setChartInputLastWeek] = useState();

    //Chart data
    const [dataThisWeek, setDataThisWeek] = useState(
        {
            chartData: {
                labels: moment.weekdays(),
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
                labels: moment.weekdays(),
                datasets: [
                    {
                        label: "Days of the week",
                        data: []
                    }
                ]
            }
        });

    const [dataThisMonth, setDataThisMonth] = useState(
        {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Days of the week",
                        data: moment.months()
                    }
                ]
            }
        });

    useEffect(() => {
        if (userContext.User.ToDoTasks) {

            // Defining variables

            let thisWeek = [];
            let thisWeekFormated = [];
            let tasksThisWeek = [0, 0, 0, 0, 0, 0, 0];
            let tasksLastWeek = [0, 0, 0, 0, 0, 0, 0];
            let tasksThisMonth = [];

            //Getting array with this weeks data

            let startOfWeek = moment().startOf('week');
            let endOfWeek = moment().endOf('week');
            let day = startOfWeek;

            while (day <= endOfWeek) {
                thisWeek.push(day.toDate());
                moment(day).toDate();
                day = day.clone().add(1, 'd');
            }

            thisWeekFormated = thisWeek.map(elem => {
                return moment(elem).format('YYYY-MM-DD')
            });

            //Getting array with last weeks data

            let lastWeekFormated = thisWeekFormated.map(elem => {
                return moment(elem, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
            })

            //Getting array with this months data

            // console.log(daysInCurrentMonth);

            // moment("2012-02", "YYYY-MM").daysInMonth()

            //Calculating task count for this week

            userContext.User.ToDoTasks.forEach(elem => {
                if (thisWeekFormated.indexOf(elem.complete.slice(0, 10)) == -1) {
                    console.log("not in there");
                }
                else {
                    console.log("in there");
                    tasksThisWeek[moment(elem.complete).day()] = tasksThisWeek[moment(elem.complete).day()] + 1;
                }
            });
            setChartInputThisWeek(tasksThisWeek);
            console.log(tasksThisWeek);

            //Calculating task count for last week

            userContext.User.ToDoTasks.forEach(elem => {
                if (lastWeekFormated.indexOf(elem.complete.slice(0, 10)) == -1) {
                    console.log("not in there");
                }
                else {
                    console.log("in there");
                    tasksLastWeek[moment(elem.complete).day()] = tasksLastWeek[moment(elem.complete).day()] + 1;
                }
            })
            setChartInputLastWeek(tasksLastWeek);
            console.log(tasksLastWeek);
        }
    }, [userContext])

    useEffect(() => {
        setDataThisWeek(
            {
                chartData: {
                    labels: moment.weekdays(),
                    datasets: [
                        {
                            label: "Number of Tasks",
                            data: chartInputThisWeek,
                            backgroundColor: "#B91D21",

                        }
                    ]
                }
            })
    }, [chartInputThisWeek])

    useEffect(() => {
        setDataLastWeek(
            {
                chartData: {
                    labels: moment.weekdays(),
                    datasets: [
                        {
                            label: "Number of Tasks",
                            data: chartInputLastWeek,
                            backgroundColor: "#B91D21"
                        }
                    ]
                }
            })
    }, [chartInputLastWeek])

    return (
        <div>
            <div className="text-center" id="headline"><h3>Check out what you did!</h3></div>
            <div className="row">
                <div className="col-sm-12 text-center">
                    <h5 className="headline2">This Week</h5>
                    <Chart chartData={dataThisWeek.chartData}
                    />
                </div>
                <div className="col-sm-12 text-center" id="chartEnd">
                    <h5 className="headline2">Last Week</h5>
                    <Chart chartData={dataLastWeek.chartData} />
                </div>
                {/* <div className="col-sm-12 text-center">
                    <h5 className="headline2">This Month</h5>
                </div>
                <div className="col-sm-12 text-center">
                    <h5 className="headline2">Last Month</h5> */}
                <div ></div>
            </div>
        </div >
    )
};

export default Stats;
