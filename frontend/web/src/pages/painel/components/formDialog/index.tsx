import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import {RootState} from '../../../../index';
import {painelCloseDialogueForm} from '../../../../store/actions/painel';

import CreateSeasonForm from './createSeasonForm';
import CreateGameForm from './createGameForm';
import UpdateSeasonForm from './updateSeasonForm';
import UpdateGameForm from './updateGameForm';
import { DialogueFormModeType, DialogueFormActionType } from '../../../../store/reducers/painel';

const FormDialog = () => {

  const dispatch = useDispatch();
  const isDialogueFormOpen = useSelector( (state: RootState) => state.painel.isDialogueFormOpen );
  const dialogueFormMode = useSelector( (state: RootState) => state.painel.dialogueEntityMode );
  const dialogueActionMode = useSelector( (state: RootState) => state.painel.dialogueActionMode );

  const handleClose = () => {
    dispatch(painelCloseDialogueForm());
  };

  let dialogueForm = null;
  if(dialogueFormMode == DialogueFormModeType.SEASON){
    if(dialogueActionMode == DialogueFormActionType.ADD){
      dialogueForm = <CreateSeasonForm />
    }else{
      dialogueForm = <UpdateSeasonForm />
    }
  }else{
    if(dialogueActionMode == DialogueFormActionType.ADD){
      dialogueForm = <CreateGameForm />
    }else{
      dialogueForm = <UpdateGameForm />
    }
  }

  return (
      <Dialog open={isDialogueFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        {dialogueForm}
      </Dialog>
  );
}

export default FormDialog;