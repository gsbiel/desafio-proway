import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface DialogueFormMode{
  entity:string,
  action:string
}

interface PropsType {
  shouldOpen: boolean,
  handleClose: () => void
  mode: DialogueFormMode
}

const FormDialog = (props: PropsType) => {

  const subscribeHandler = () => {
    console.log(props.mode)
  }

  return (
      <Dialog open={props.shouldOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.mode.entity}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => subscribeHandler()} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default FormDialog;