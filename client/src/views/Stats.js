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
    const [chartInputThisMonth, setChartInputThisMonth] = useState();
    const [chartInputLastMonth, setChartInputLastMonth] = useState();

    //Chart data
    const [dataThisWeek, setDataThisWeek] = useState({});
    const [dataLastWeek, setDataLastWeek] = useState({});
    const [dataThisMonth, setDataThisMonth] = useState({});
    const [dataLastMonth, setDataLastMonth] = useState({});
    const [labelThisMonth, setLabelThisMonth] = useState();
    const [labelLastMonth, setLabelLastMonth] = useState();

    useEffect(() => {
        if (userContext.User.ToDoTasks) {

            // Defining variables

            let thisWeek = [];
            let thisWeekFormated = [];
            let lastWeekFormated = [];
            let tasksThisWeek = [0, 0, 0, 0, 0, 0, 0];
            let tasksLastWeek = [0, 0, 0, 0, 0, 0, 0];
            let tasksThisMonth = [];
            let tasksLastMonth = [];

            //Getting array with this and weeks dates

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

            //Getting array with last weeks dates

            lastWeekFormated = thisWeekFormated.map(elem => {
                return moment(elem, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
            });

            // console.log(thisWeekFormated, lastWeekFormated)

            //Getting array with this and last months dates

            let thisMonth = [];
            for (let i = 1; i < moment().daysInMonth() + 1; i++) {
                thisMonth.push(i);
                tasksThisMonth.push(0); // Setting up empty array for this months tasks
            }

            let lastMonth = [];
            let monthHelper = moment().month() - 1;
            for (let i = 1; i < moment().month(monthHelper).daysInMonth() + 1; i++) {
                lastMonth.push(i);
                tasksLastMonth.push(0); // Setting up empty array for last months tasks
            }
            setLabelThisMonth(thisMonth);
            setLabelLastMonth(lastMonth);
            console.log(thisMonth)
            console.log(lastMonth)
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

            //Calculating task count for this and last month

            userContext.User.ToDoTasks.forEach(elem => {
                if (moment(elem.complete).month() == moment().month()) {
                    console.log("this is this month");
                    tasksThisMonth[moment(elem.complete).date()] = tasksThisMonth[moment(elem.complete).date()] + 1;
                }
                else {
                    if (moment(elem.complete).month() === moment().month() - 1) {
                        tasksLastMonth[moment(elem.complete).date()] = tasksLastMonth[moment(elem.complete).date()] + 1
                    }
                    console.log("this is not this month");
                }
            });
            setChartInputThisMonth(tasksThisMonth);
            setChartInputLastMonth(tasksLastMonth);
            console.log(tasksThisMonth);

            console.log(userContext.User.ToDoTasks);
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
    }, [chartInputThisWeek]);

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
    }, [chartInputLastWeek]);

    useEffect(() => {
        setDataThisMonth(
            {
                chartData: {
                    labels: labelThisMonth,
                    datasets: [
                        {
                            label: "Number of Tasks",
                            data: chartInputThisMonth,
                            backgroundColor: "#B91D21"
                        }
                    ]
                }
            })
    }, [chartInputThisMonth]);

    useEffect(() => {
        setDataLastMonth(
            {
                chartData: {
                    labels: labelLastMonth,
                    datasets: [
                        {
                            label: "Number of Tasks",
                            data: chartInputLastMonth,
                            backgroundColor: "#B91D21"
                        }
                    ]
                }
            })
    }, [chartInputLastMonth]);

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
                <div className="col-sm-12 text-center">
                    <h5 className="headline2">This Month</h5>
                    <Chart chartData={dataThisMonth.chartData} />
                </div>
                <div className="col-sm-12 text-center">
                    <h5 className="headline2">Last Month</h5>
                    <Chart chartData={dataLastMonth.chartData} />
                </div>
            </div >
        </div>
    )
};

export default Stats;
