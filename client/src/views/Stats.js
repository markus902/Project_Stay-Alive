import React, { useContext, useState } from 'react'
import axios from 'axios';
import UserContext from '../utils/UserContext'
import { Chart } from 'react-charts'



const Stats = () => {


    const { userContext, setUserContext } = useContext(UserContext)
    const [chart, setChart] = useState(true);

    console.log(userContext)

    //Formatting data

    const originalData = React.useMemo(
        () => ({
            axis: [1, 2, 3],
            lines: [
                { data: [{ value: 10 }, { value: 10 }, { value: 10 }] },
                { data: [{ value: 10 }, { value: 10 }, { value: 10 }] },
                { data: [{ value: 10 }, { value: 10 }, { value: 10 }] }
            ]
        }),
        []
    )

    const data = React.useMemo(data => originalData.lines, [originalData])

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    return (
        <div>
            <div className="text-center"><h3>Check out what did!</h3></div>
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

            <div
                style={{
                    width: '400px',
                    height: '300px'
                }}
            >
                <Chart
                    data={data}
                // axes={axes} 
                />
            </div>
        </div>
    )
};

export default Stats;
