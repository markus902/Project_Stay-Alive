import React, { Fragment } from "react";
import Loading from "../components/Loading";
import ChartDisplay from "../components/ChartDisplay"
// import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";
import Chart from "chart.js"

const Stats = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <Loading />;
    }

    state = () => {
        chart: "test"
    }

    // var myChart = new Chart(ctx, {});

    console.log(myChart)

    return (
        <div>
            <div>This is the stats page</div>

            <ChartDisplay graphic={state.chart} />
        </div>
    )
};

export default Stats;
