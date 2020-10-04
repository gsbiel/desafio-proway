import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {
    RootState
} from '../../../../../index';

import {
    painelCloseDialogueForm,
    painelDeleteGames
} from '../../../../../store/actions/painel';

const DeleteGamesForm = () => {

    const dispatch = useDispatch();
    const userToken = useSelector( (state: RootState) => state.auth.token );
    const userId = useSelector( (state: RootState) => state.auth.userId );
    const selectedSeasonId = useSelector( (state: RootState) => state.painel.selectedSeasonId);
    const gamesToBeDeleted = useSelector( (state: RootState) => state.painel.gamesIdTrashList );

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    }

    const deleteHandler = () => {
        dispatch(painelDeleteGames(userToken, userId, selectedSeasonId, gamesToBeDeleted));
        dispatch(painelCloseDialogueForm());
    }

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Delete game(s)</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you really want to delete those games?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    NO
                </Button>
                <Button onClick={() => deleteHandler()} color="primary">
                    YES
                </Button>
            </DialogActions>
        </Fragment>  
    );
}

export default DeleteGamesForm;