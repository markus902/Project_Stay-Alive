import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuButton from "../MenuButton"
import auth0Client from '../../Auth';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  // const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [page, setPage] = useState(null)

  const logoutWithRedirect = () => {
    auth0Client.signOut();
    // eslint-disable-next-line react/prop-types
    props.history.replace('/');
  };

  const changeState = () => {
    setPage(true)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton logoutWithRedirect={logoutWithRedirect}/>
          <Typography variant="h6" className={classes.title}>
            Stay Alive
          </Typography>
          {auth0Client.isAuthenticated() ?
            (
              <Typography variant="h6" className={auth0Client.getProfile().name}>{auth0Client.getProfile().name} <Button color="inherit" onClick={() => logoutWithRedirect()} changeState={()=>changeState()}>Log Out</Button></Typography>
              
            ) : (
              <Button color="inherit" onClick={auth0Client.signIn}>Log In</Button>
            )
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}