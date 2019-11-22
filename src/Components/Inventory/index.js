import React from 'react';
import CharacterDashboard from "../CharacterDashboard";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { classes } from 'istanbul-lib-coverage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    justifyContent: "center",
    alignContent: "center",
  },
  h2:{
    padding: theme.spacing(3, 2),
  }
}));


function Inventory(...props){
  const classes = useStyles();
  return(
      <Container className={classes.root} maxWidth="md">
        <CharacterDashboard />
        <Paper >
          <Typography variant="h2">
            Inventory:
          </Typography>
        </Paper>
      </Container>
  )
}


export default Inventory;