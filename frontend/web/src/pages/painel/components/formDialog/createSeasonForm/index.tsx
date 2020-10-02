import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    painelCloseDialogueForm
} from '../../../../../store/actions/painel';

import {
    TextFieldErrorState
} from '../../../../auth/components/loginForm/index';

const CreateSeasonForm = () => {

    const dispatch = useDispatch();

    const [seasonName, setSeasonName] = useState("");
    const [isSeasonNameValid, setSeasonNameValidationState] = useState(true);
    const [seasonNameErrorMsg, setSeasonNameErrorMsg] = useState(TextFieldErrorState.OK);

    useEffect(() => {
        if(!seasonName.trim().length){
            setSeasonNameValidationState(false)
            setSeasonNameErrorMsg(TextFieldErrorState.MISSING_DATA)
        }else {
            setSeasonNameValidationState(true)
            setSeasonNameErrorMsg(TextFieldErrorState.OK)
        }
    },[seasonName]);

    useEffect(() => {
        setSeasonNameValidationState(true)
        setSeasonNameErrorMsg(TextFieldErrorState.OK)
    },[]);

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    }

    const onSeasonNameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSeasonName(event.target.value)
    }

    const subscribeHandler = () => {
        dispatch(painelCloseDialogueForm());
    }

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Create a new season</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In order to create a new season, please, fill in the form below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"Season name"}
                    type="email"
                    fullWidth
                    error={!isSeasonNameValid}
                    helperText={seasonNameErrorMsg}
                    onChange={(event) => onSeasonNameChangeHandler(event)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => subscribeHandler()} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Fragment>  
    );
}

export default CreateSeasonForm;