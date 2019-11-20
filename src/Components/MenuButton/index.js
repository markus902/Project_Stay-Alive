
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { mdiCheckOutline, mdiFaceProfile, mdiBagPersonal, mdiAccountCardDetails } from '@mdi/js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


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




// eslint-disable-next-line no-unused-vars
const MenuButton = (props) => {


  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null)
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
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Icon path={mdiFaceProfile}
              title="Character Profile"
              size={1}
              color="gray"
            />
          </ListItemIcon>
          <Button component={Link} to="/character" onClickCapture={handleClose} color="success">
            Character Profile
          </Button>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <Icon path={mdiCheckOutline}
              title="User Profile"
              size={1}
              color="gray"
            />
          </ListItemIcon>
          <Button component={Link} to="/character/taskmanger" onClickCapture={handleClose} color="success">
            Task Manager
          </Button>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon>
            <Icon path={mdiBagPersonal}
              title="Inventory"
              size={1}
              color="gray"
            />
          </ListItemIcon>
          <Button component={Link} to="/character/inventory" onClickCapture={handleClose} color="success">
            Inventory
        </Button>
        </StyledMenuItem>

        <StyledMenuItem >
          <ListItemIcon>
            <Icon path={mdiAccountCardDetails}
              title="Character Stats"
              size={1}
              color="gray"
            />
          </ListItemIcon>
          <Button component={Link} to="/character/chartsandanalytics" onClickCapture={handleClose} color="success">
            Character Stats
        </Button>
        </StyledMenuItem>

        <StyledMenuItem >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Button onClick={() => this.props.logoutWithRedirect()} color="success">
            Log Off
          </Button>
        </StyledMenuItem>

      </StyledMenu>
    </div>
  )
}

export default MenuButton