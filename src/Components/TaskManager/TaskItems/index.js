import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, makeStyles } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// eslint-disable-next-line no-unused-vars
const marks = [
  {
    value: 1,
    label: 'Menial',
  },
  {
    value: 2,
    label: 'Easy',
  },
  {
    value: 3,
    label: 'Normal',
  },
  {
    value: 4,
    label: 'Hard',
  },
  {
    value: 5,
    label: 'Challenging',
  },
];
function valuetext(value) {

  return `${value}`;
}

function TaskItems(props) {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = React.useState(props.taskInfo);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [frequency, setFrequency] = React.useState('');
  const handleClickDone = ()=>{
    console.log("set Status To Done")
  }
  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };
  const handleChange = event => {
    setFrequency(event.target.value);
  };
  return (
    <div>
      <Box border={1} borderRadius={16} m={1}>
        <Tooltip disableFocusListener title={task.description}>
          <ListItem button>
            <ListItemText primary={task.name} />
            <ListItemText secondary={"Challenge Rating: " + task.challenge} />
            <ListItemIcon>
              <Button onClick={handleClickOpenAdd}><EditIcon /></Button>
            </ListItemIcon>
            <ListItemIcon>
            <Button onClick={handleClickDone}><DoneIcon /></Button>
          </ListItemIcon>
            <ListItemIcon>
              <Button onClick={handleClickOpenRemove}><DeleteForeverIcon /></Button>
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      </Box>
      <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit {task.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Please Enter Changes you would like on the task?
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            defaultValue={task.name}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            defaultValue={task.description}
            fullWidth
            variant="outlined"
          />
          <Typography id="discrete-slider" gutterBottom>
            Challenge Rating
          </Typography>
          <Slider
            defaultValue={task.challenge || 3}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="frequency-select-label">Frequency</InputLabel>
            <Select
              labelId="frequency-select-label"
              id="frequency-select"
              value={frequency}
              onChange={handleChange}
            >
              <MenuItem value={10}>Daily</MenuItem>
              <MenuItem value={20}>Weekly</MenuItem>
              <MenuItem value={30}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseAdd} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRemove} onClose={handleCloseRemove} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove {task.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Are you sure you want to remove {task.name} task?
          </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemove} color="primary">
            Cancel
        </Button>
          <Button onClick={handleCloseRemove} color="primary">
            Remove Task
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default TaskItems