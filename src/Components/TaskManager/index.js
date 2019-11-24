import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography} from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import TaskItems from "./TaskItems";
import CompletedItem from "./CompletedItem";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    minHeight: "50vh",
    padding: "2em"
  }
}));

function TaskManager(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4} m={3}>
        <Paper className={classes.paper}>
          <Typography variant="h2">Daily</Typography>
          <Typography variant="h6">Active</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Daily" && task.completed === false) ? <TaskItems taskInfo={task} /> : <div></div>
            ))}
          </List>
          <Typography variant="h6">Completed</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Daily" && task.completed === true) ? <CompletedItem taskInfo={task} /> : <div></div>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} m={3}>
        <Paper className={classes.paper} p={4}>
          <Typography variant="h2">Weekly</Typography>
          <Typography variant="h6">Active</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Weekly" && task.completed === false) ? <TaskItems taskInfo={task} /> : <div></div>
            ))}
          </List>
          <Typography variant="h6">Completed</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Weekly" && task.completed === true) ? <CompletedItem taskInfo={task} /> : <div></div>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} m={3}>
        <Paper className={classes.paper} p={4}>
          <Typography variant="h2">Monthly</Typography>
          <Typography variant="h6">Active</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Monthly" && task.completed === false) ? <TaskItems taskInfo={task} /> : <div></div>
            ))}
          </List>
          <Typography variant="h6">Completed</Typography>
          <List>
            {props.task.map(task => (
              (task.frequency === "Monthly" && task.completed === true) ? <CompletedItem taskInfo={task} /> : <div></div>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}


export default TaskManager;