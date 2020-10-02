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

const CreateGameForm = () => {

    const dispatch = useDispatch();

    const [gameName, setGameName] = useState("");
    const [isGameNameValid, setGameNameValidationState] = useState(true);
    const [gameNameErrorMsg, setGameNameErrorMsg] = useState(TextFieldErrorState.OK);

    const [gameScore, setGameScore] = useState(0);
    
    useEffect(() => {
        if(!gameName.trim().length){
            setGameNameValidationState(false)
            setGameNameErrorMsg(TextFieldErrorState.MISSING_DATA)
        }else {
            setGameNameValidationState(true)
            setGameNameErrorMsg(TextFieldErrorState.OK)
        }
    },[gameName]);

    useEffect(() => {
        setGameNameValidationState(true)
        setGameNameErrorMsg(TextFieldErrorState.OK)
    },[]);

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    };

    const onCreateHandler = () => {
        dispatch(painelCloseDialogueForm());
    };

    const onGameNameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setGameName(event.target.value)
    };

    const onGameScoreChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(parseInt(event.target.value,10) < 0){
            event.target.value = "0"
        }else{
            setGameScore(parseInt(event.target.value,10))
        }
    };

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Create a new Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In order to create a new game, please, fill in the form below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="gameName"
                    label={"Game name"}
                    fullWidth
                    onChange={(event) => onGameNameChangeHandler(event)}
                    value={gameName}
                    error = {!isGameNameValid}
                    helperText = {gameNameErrorMsg}
                />
                <TextField
                    style={{marginTop:30, width:"100px"}}
                    id="standard-number"
                    label="Your score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => onGameScoreChangeHandler(event)}
                    value={gameScore}
                    defaultValue={0}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onCreateHandler()} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Fragment>  
    );
}

export default CreateGameForm;