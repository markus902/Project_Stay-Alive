import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ChartDisplay from "../components/ChartDisplay"
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";
import Chart from "chart.js"

const Stats = () => {

    const { loading, user } = useAuth0();
    const [userData, setUserData] = useState();
    const [loader, setLoader] = useState(true);
    const [chart, setChart] = useState(true);

    if (loading || !user) {
        return <Loading />;
    }

    if (loader) {
        axios.get(`/api/getuserbyusername/${user.nickname}`)
            .then(response => {
                console.log(response);
                setUserData(response.data[0]);
                setLoader(false);
            });
    }


    // var myChart = new Chart(ctx, {});


    return (
        <div>
            <div>This is the stats page</div>

            <ChartDisplay data={[
                { argument: 1, value: 10 },
                { argument: 2, value: 20 },
                { argument: 3, value: 30 }
            ]} />
        </div>
    )
};

export default Stats;
