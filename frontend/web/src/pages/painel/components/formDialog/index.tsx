import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {RootState} from '../../../../index';
import {painelCloseDialogueForm} from '../../../../store/actions/painel';
import {DialogueFormModeType} from '../../../../store/reducers/painel';

interface DialogueFormMode{
  entity:string,
  action:string
}

const FormDialog = () => {

  const dispatch = useDispatch();
  const isDialogueFormOpen = useSelector( (state: RootState) => state.painel.isDialogueFormOpen )

  const subscribeHandler = () => {
    // console.log(props.mode)
  }

  const handleClose = () => {
    dispatch(painelCloseDialogueForm());
  }

  return (
      <Dialog open={isDialogueFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
            label={"blablabla"}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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