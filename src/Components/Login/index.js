import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { green, purple, blue, indigo, deepPurple, lavender, } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Animated } from 'react-animated-css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    backgroundColor: '#3f51b5',
    background: '-webkit-linear-gradient(to bottom, #D7DDE8, indigo)',
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
  },
  margin: {
    fontSize: 60,
    fontFamily: 'Permanent Marker',
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

  return (
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
                <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={true}>
                <Typography className={classes.title} gutterBottom variant="subtitle1">
                  Stay Alive
                </Typography>
                </Animated>
                <Typography variant="body2" gutterBottom>
                <Animated animationInDelay='fadeIn' animationOutDelay='fadeOut' isVisible={true}>
                <ColorButton variant="contained" color="primary" className={classes.margin}>Enter</ColorButton>
                </Animated>
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