import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

function CharacterDashboard() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            <img src="https://via.placeholder.com/150x150" />
            <List >
              <ListItem>
                <ListItemText primary="Name: " />
                <ListItemText primary="Muric" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gender: " />
                <ListItemText primary="Male" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Experience:  " />
                <ListItemText primary="1000/2000" />
              </ListItem>
            </List>

          </Grid>

        </Paper>
      </Container>
    </React.Fragment>

  )
}

export default CharacterDashboard;