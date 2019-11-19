import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@mdi/react'
import { mdiCalendarCheck, mdiFaceProfile, mdiBagPersonal, mdiPoll } from '@mdi/js';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorE2={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    console.log("Click")
    setAnchorE2(event.currentTarget);
  };

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };

  const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      
      {auth && (<StyledMenu
        id="customized-menu"
        anchorE2={anchorE2}
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleCloseMenu}
      >
        <StyledMenuItem>
          <ListItemIcon>
          <Icon path={mdiCalendarCheck}
          title="User Profile"
          size={1}
          horizontal
          vertical
          rotate={180}
          color="red"
          />
          </ListItemIcon>
          <Link to="/character/taskmanger" onClick={handleClick}>Task Manager</Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
          <Icon path={mdiFaceProfile}
          title="Character Profile"
          size={1}
          horizontal
          vertical
          rotate={180}
          color="red"
          />
          </ListItemIcon>
          <Link to="/character" onClick={handleClick}><ListItemText primary="Character Profile" /></Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
          <Icon path={mdiBagPersonal}
          title="Inventory"
          size={1}
          horizontal
          vertical
          rotate={180}
          color="red"
          />
          </ListItemIcon>
          <Link to="/character/inventory" onClick={handleClick}><ListItemText primary="Inventory" /></Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
          <Icon path={mdiPoll}
          title="Character Stats"
          size={1}
          horizontal
          vertical
          rotate={180}
          color="red"
          />
          </ListItemIcon>
          <Link to="/character/chartsandanalytics" onClick={handleClick}><ListItemText primary="Character Stats" /></Link>
        </StyledMenuItem>
        
      </StyledMenu>
          )}
          <Typography variant="h6" className={classes.title}>
            Stay Alive
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
