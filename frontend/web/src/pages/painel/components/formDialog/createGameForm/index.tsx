import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


import {
    RootState
} from '../../../../../index';

import {
    GameNameField
} from './styles';

import {
    painelCloseDialogueForm,
    painelCreateGame
} from '../../../../../store/actions/painel';

import {
    TextFieldErrorState
} from '../../../../auth/components/loginForm/index';

const CreateGameForm = () => {

    const dispatch = useDispatch();
    const userToken = useSelector( (state: RootState) => state.auth.token );
    const userId = useSelector( (state: RootState) => state.auth.userId );
    const selectedSeasonId = useSelector((state: RootState) => state.painel.selectedSeasonId);

    const [gameName, setGameName] = useState("");
    const [isGameNameValid, setGameNameValidationState] = useState(true);
    const [gameNameErrorMsg, setGameNameErrorMsg] = useState(TextFieldErrorState.OK);

    const [selectedDate, setSelectedDate] = useState(new Date());

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
        if((validateGameNameForm()) &&  !isNaN(selectedDate.getTime())){
            dispatch(painelCloseDialogueForm());
            dispatch(painelCreateGame(userToken, userId, selectedSeasonId, gameName, gameScore, selectedDate));
        }
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

    const onDateChangeHandler = (date:any) => {
        setSelectedDate(date);
    }

    const validateGameNameForm = ():boolean => {
        if(!gameName.trim().length){
            setGameNameValidationState(false)
            setGameNameErrorMsg(TextFieldErrorState.MISSING_DATA)
            return false;
        }else {
            setGameNameValidationState(true)
            setGameNameErrorMsg(TextFieldErrorState.OK)
            return true;
        }
    }

    return (
        <Fragment>
            <DialogTitle id="form-dialog-title">Create a new Game</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In order to create a new game, please, fill in the form below.
                </DialogContentText>
                <GameNameField
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
                <GameNameField
                    style={{marginTop:30, width:"100px"}}
                    id="standard-number"
                    label="Game score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => onGameScoreChangeHandler(event)}
                    value={gameScore}
                    defaultValue={0}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        style = {{marginLeft: 15, marginTop: 30}}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Game date"
                        value={selectedDate}
                        onChange={(date) => onDateChangeHandler(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
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