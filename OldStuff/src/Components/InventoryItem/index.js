import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: 1
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ItemCard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndUse = () => {
    setAnchorEl(null);
  };

  const handleCloseAndRemove = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
          </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon onClick={handleClick} />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseAndUse}>Use</MenuItem>
                <MenuItem onClick={handleCloseAndRemove}>Remove</MenuItem>
              </Menu>
            </IconButton>
          }
          title="Item Name"
          subheader="Bonus Information"
        />
        <CardMedia
          className={classes.media}
          image="https://via.placeholder.com/150x150"
          title="Item Name"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Description of the item Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Qui dicta architecto tempora facere. Quia soluta
            atque veniam consequatur in nemo reiciendis praesentium ratione quasi dolore.
            Recusandae iure tempore quibusdam ab!
        </Typography>
        </CardContent>
      </Card>
    </Grid>
      );
    }
