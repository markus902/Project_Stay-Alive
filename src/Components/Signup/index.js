import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import { Face, Fingerprint } from '@material-ui/icons'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  }
});

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {/* <Face /> */}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="firstName" label="First Name" type="name" fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {/* <Fingerprint /> */}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="lastName" label="Last Name" type="name" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {/* <Fingerprint /> */}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="username" label="Email" type="email" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {/* <Face /> */}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="userName" label="Username" type="" fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              {/* <Fingerprint /> */}
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="password" label="Password" type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              {/* <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" /> */}
            </Grid>
            <Grid item>
              {/* <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button> */}
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Register</Button>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);