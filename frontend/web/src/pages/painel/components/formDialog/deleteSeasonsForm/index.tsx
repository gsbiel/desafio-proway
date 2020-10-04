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
    painelDeleteSeasons
} from '../../../../../store/actions/painel';

const DeleteSeasonForm = () => {

    const dispatch = useDispatch();
    const userToken = useSelector( (state: RootState) => state.auth.token );
    const userId = useSelector( (state: RootState) => state.auth.userId );
    const seasonsToBeDeleted = useSelector( (state: RootState) => state.painel.seasonsIdTrashList );

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    }

    const deleteHandler = () => {
        dispatch(painelDeleteSeasons(userToken, userId, seasonsToBeDeleted));
        dispatch(painelCloseDialogueForm());
    }

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Delete season(s)</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you really want to delete those seasons?
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

export default DeleteSeasonForm;