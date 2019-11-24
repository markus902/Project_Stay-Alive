import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import MergeTypeIcon from '@material-ui/icons/MergeType';




function TaskItems(props) {
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = React.useState(props.taskInfo);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);

  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleClickRedo = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  return (
    <div>
      <Box border={1} borderRadius={16} m={1}>
        <Tooltip disableFocusListener title={task.description}>
          <ListItem button>
            <ListItemText primary={task.name} />
            <ListItemText secondary={"Challenge Rating: " + task.challenge} />
            <ListItemIcon>
              <Button onClick={handleClickRedo}><MergeTypeIcon /></Button>
            </ListItemIcon>
            <ListItemIcon>
              <Button onClick={handleClickOpenRemove}><DeleteForeverIcon /></Button>
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      </Box>
      <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Remove {task.name} from Completed </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Do you want to remove task from Completed?
            </Typography>
          </DialogContentText>
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