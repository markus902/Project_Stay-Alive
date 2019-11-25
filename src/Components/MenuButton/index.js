
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@mdi/react'
import { withStyles } from '@material-ui/core/styles';
import { mdiCheckOutline, mdiFaceProfile, mdiBagPersonal, mdiAccountCardDetails } from '@mdi/js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
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




// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
const MenuButton = ({logout}) => {
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
          <Button component={Link} to="/character" onClickCapture={handleClose} color="inherit">
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
          <Button component={Link} to="/character/taskmanager" onClickCapture={handleClose} color="inherit">
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
          <Button component={Link} to="/character/inventory" onClickCapture={handleClose} color="inherit">
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
          <Button component={Link} to="/character/chartsandanalytics" onClickCapture={handleClose} color="inherit">
            Character Stats
        </Button>
        </StyledMenuItem>

        <StyledMenuItem >
          <ListItemIcon>
            <Icon path={mdiAccountCardDetails}
              title="Character Creator Test"
              size={1}
              color="gray"
            />
          </ListItemIcon>
          <Button component={Link} to="/charactercreation" onClickCapture={handleClose} color="inherit">
            Character Creator Test
        </Button>
        </StyledMenuItem>

        <StyledMenuItem >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <Button onClick={() => logout()} color="inherit">
            Log Off
          </Button>
        </StyledMenuItem>

      </StyledMenu>
    </div>
  )
}

export default MenuButton