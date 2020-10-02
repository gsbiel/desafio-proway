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

import CreateSeasonForm from './createSeasonForm';
import CreateGameForm from './createGameForm';

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
        <CreateSeasonForm />
        {/* <CreateGameForm /> */}
      </Dialog>
  );
}

export default FormDialog;