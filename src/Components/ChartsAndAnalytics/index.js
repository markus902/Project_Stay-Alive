import React from 'react';
import CharacterDashboard from "../CharacterDashboard";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    justifyContent: "center",
    alignContent: "center",
  }
}));

function ChartsAndAnalytics(...props) {

  const classes = useStyles();
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  const handleChange = (num) => {
    switch (true) {
      case num === 1:
        setChecked1(prev => !prev);
        break;
      case num === 2:
        setChecked2(prev => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CharacterDashboard />
        <Container maxWidth="md">
          <FormControlLabel
            control={
              <Paper className={classes.paper} checked1={checked1} onClick={()=>handleChange(1)}>
                <Typography>
                  Chart 1
                    </Typography>
              </Paper>
            }
          />
          <Collapse in={checked1}>
            <Paper>
              <Chart
                data={[
                  { argument: 1, value: 10 },
                  { argument: 2, value: 20 },
                  { argument: 3, value: 30 }
                ]}
              >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="value" argumentField="argument" />
              </Chart>
            </Paper>
          </Collapse>
        </Container>
        <Container maxWidth="md">
          <FormControlLabel
            control={
              <Paper className={classes.paper} checked={checked2} onClick={()=>handleChange(2)}>
                <Typography>
                  Chart 2
                    </Typography>
              </Paper>
            }
          />
          <Collapse in={checked2}>
            <Paper>
              <Chart
                data={[
                  { argument: 1, value: 10 },
                  { argument: 2, value: 50 },
                  { argument: 3, value: 7 }
                ]}
              >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries valueField="value" argumentField="argument" />
              </Chart>
            </Paper>
          </Collapse>
        </Container>
      </React.Fragment>
    </div>
  );

  // <div>
  //   <React.Fragment>
  //     <CssBaseline />
  //     <Container maxWidth="md">
  //       <div className={classes.container}>
  //         <Paper className={classes.root}>
  //         </Paper>
  //       </div>
  //     </Container>
  //   </React.Fragment>
  // </div>
  // )
}


export default ChartsAndAnalytics;