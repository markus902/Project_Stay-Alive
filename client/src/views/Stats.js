import React, { Component } from 'react'
import axios from 'axios';
import { Chart } from 'react-charts'

export default class Stats extends Component {
    state = {
        user: this.props.user.nickname,
        userData: null,
        chartData: null,
        chartProps: null,
    }

    componentDidMount() {

        axios.get(`/api/getuserbyusername/${this.props.user.nickname}`)
            .then(res => {
                console.log(res);
                this.setState(res.data[0]);
            });
    }


    render() {
        return (
            //     this.setState({
            //         chart: [
            //             {
            //                 label: 'Series 1',
            //                 data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            //             },
            //             {
            //                 label: 'Series 2',
            //                 data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            //             }
            //         ]
            //     })
            //     return (
            //         <div>

            //         </div>
            //     )
            <div></div>)
    }
}

    //Convert to a class
    // const Stats = () => {


//     const [userData, setUserData] = useState();
//     const [chart, setChart] = useState(true);

//     // Chart settings

//     const [data] = useState(React.useMemo(
//         () => ,
//         []
//     ))

//     const [axes] = useState(React.useMemo(
//         () => [
//             { primary: true, type: 'linear', position: 'bottom' },
//             { type: 'linear', position: 'left' }
//         ],
//         []
//     ))

//     if (loading || !user) {
//         return <Loading />;
//     }

//     if (loader) {
//         axios.get(`/api/getuserbyusername/${user.nickname}`)
//             .then(response => {
//                 console.log(response);
//                 setUserData(response.data[0]);
//             });
//     }





//     return (
//         <div>
//             <div>This is the stats page</div>

//             <div
//                 style={{
//                     width: '400px',
//                     height: '300px'
//                 }}
//             >
//                 <Chart data={data} axes={axes} />
//             </div>
//             )
//           }

//             {/* <ChartDisplay data={[
//                 { argument: 1, value: 10 },
//                 { argument: 2, value: 20 },
//                 { argument: 3, value: 30 }
//             ]} /> */}
//         </div>
//     )
// };

