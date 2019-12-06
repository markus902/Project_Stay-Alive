import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ChartDisplay from "../components/ChartDisplay"
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";
// import Chart from "chart.js"
import { Chart } from 'react-charts'

const Stats = () => {

    const { loading, user } = useAuth0();
    const [userData, setUserData] = useState();
    const [loader, setLoader] = useState(true);
    const [chart, setChart] = useState(true);

    // Chart settings

    const [data] = useState(React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    ))

    const [axes] = useState(React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    ))

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





    return (
        <div>
            <div>This is the stats page</div>

            <div
                style={{
                    width: '400px',
                    height: '300px'
                }}
            >
                <Chart data={data} axes={axes} />
            </div>
            )
          }

            {/* <ChartDisplay data={[
                { argument: 1, value: 10 },
                { argument: 2, value: 20 },
                { argument: 3, value: 30 }
            ]} /> */}
        </div>
    )
};

export default Stats;
