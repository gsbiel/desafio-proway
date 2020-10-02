import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import {RootState} from '../../../../index';
import {painelCloseDialogueForm} from '../../../../store/actions/painel';

import CreateSeasonForm from './createSeasonForm';
import CreateGameForm from './createGameForm';

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