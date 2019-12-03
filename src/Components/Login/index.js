import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import { deepPurple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import auth0Client from '../../Auth';
import CharacterCreation from "../CharacterCreation";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    backgroundColor: '#3f51b5',
    background: 'linear-gradient(to bottom, #D7DDE8, indigo)',
    margin: 'auto',
    minHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    textAlign: 'center',
    position: 'fixed',
  },

  title: {
    fontSize: 120,
    fontStyle: 'italic',
    padding: 25,
    color: 'indigo',
    fontFamily: 'Permanent Marker',
    textShadow: 'horizontal-offset vertical-offset blur color 8px 16px 12px rgba(0,0,0,0.3)',
  },
  margin: {
    fontSize: 30,
    fontFamily: 'Permanent Marker',
    textShadow: 'horizontal-offset vertical-offset blur color 8px 16px 12px rgba(0,0,0,0.3)',
    boxShadow: '8px 16px 12px rgba(0,0,0,0.3)',
    margin: '2em'
  },

}));

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[700],
    },
  },
}))(Button);

export default function ComplexGrid() {
  const classes = useStyles();
  console.log(auth0Client.getAccessToken())

  return (
    auth0Client.isAuthenticated() ?
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
              </ButtonBase>
            </Grid>
            <Grid item xl={12} lg container>
              <Grid item xl container direction="column" spacing={2}>
                <Grid item xl>
                  <Typography className={classes.title} gutterBottom variant="subtitle1">
                    Welcome {auth0Client.profile.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {/* ID: 1030114 */}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      :
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
              </ButtonBase>
            </Grid>
            <Grid item xl={12} lg container>
              <Grid item xl container direction="column" spacing={2}>
                <Grid item xl>
                  <Typography className={classes.title} gutterBottom variant="subtitle1">
                    Stay Alive
                </Typography>
                  <Typography variant="body2" gutterBottom>
                    <ColorButton variant="contained" color="primary" className={classes.margin}>Enter</ColorButton>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {/* ID: 1030114 */}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    {/* Remove */}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1"></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
  );
}