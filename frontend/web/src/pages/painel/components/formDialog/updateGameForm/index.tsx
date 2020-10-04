import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


import {
    RootState
} from '../../../../../index';

import {
    TextFieldErrorState
} from '../../../../auth/components/loginForm/index';

import {
    painelCloseDialogueForm,
    painelUpdateGame
} from '../../../../../store/actions/painel';

import {
    UpdateField,
    GameNameField
} from './styles';

const UpdateGameForm = () => {

    const dispatch = useDispatch();
    const userToken = useSelector( (state: RootState) => state.auth.token );
    const userId = useSelector( (state: RootState) => state.auth.userId );
    const selectedSeasonId = useSelector((state: RootState) => state.painel.selectedSeasonId);
    const selectedGameId = useSelector((state: RootState) => state.painel.selectedGameId);
    const games = useSelector((state: RootState) => state.painel.games);

    const [gameName, setGameName] = useState("");
    const [isGameNameValid, setGameNameValidationState] = useState(true);
    const [gameNameErrorMsg, setGameNameErrorMsg] = useState(TextFieldErrorState.OK);
    const [gameNameCheckBoxState, setGameNameCheckBoxState] = useState(false);

    const [gameScore, setGameScore] = useState(0);
    const [gameScoreCheckBoxState, setGameScoreCheckBoxState] = useState(false);

    const [selectedGameDate, setSelectedGameDate] = React.useState(new Date());
    const [gameDateCheckBoxState, setGameDateCheckBoxState] = useState(false);

    let gameDateFreezedValue = new Date(); 

    useEffect(() => {
        if(!gameName.trim().length){
            setGameNameValidationState(false)
            setGameNameErrorMsg(TextFieldErrorState.MISSING_DATA)
        }else {
            setGameNameValidationState(true)
            setGameNameErrorMsg(TextFieldErrorState.OK)
        }
    },[gameName]);

    useEffect(()=> {
        if(gameDateCheckBoxState){
            gameDateFreezedValue = selectedGameDate;
        }
    }, [selectedGameDate]);

    useEffect(() => {
        if(!gameDateCheckBoxState){
            setSelectedGameDate(new Date());
        }
    }, [gameDateCheckBoxState]);

    useEffect(() => {
        setGameNameValidationState(true)
        setGameNameErrorMsg(TextFieldErrorState.OK)
        const gameSelected = games.filter(gameItem => {
            return gameItem.id == selectedGameId;
        });
        setGameName(gameSelected[0].name);
        setGameScore(gameSelected[0].score);
        setSelectedGameDate(gameSelected[0].date);
    },[]);

    const onGameScoreCheckBoxChangedHandler = () => {
        setGameScoreCheckBoxState(!gameScoreCheckBoxState)
    }

    const onGameScoreChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(parseInt(event.target.value,10) < 0){
            event.target.value = "0";
        }else{
            setGameScore(parseInt(event.target.value,10));
        }
    };

    const onGameNameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setGameName(event.target.value);
    };

    const onGameNameCheckBoxChangeHandler =() => {
        setGameNameCheckBoxState(!gameNameCheckBoxState);
    };

    const onGameDateChangeHandler = (date: any) => {
        if(gameDateCheckBoxState){
            setSelectedGameDate(date);
        }else{
            setSelectedGameDate(gameDateFreezedValue);
        } 
    };

    const onGameDateCheckBoxChangeHandler =() => {
        setGameDateCheckBoxState(!gameDateCheckBoxState);
    };

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    };

    const updateGameHandler = () => {
        if(gameNameCheckBoxState || gameScoreCheckBoxState || gameDateCheckBoxState){
            if((validateGameNameForm()) &&  !isNaN(selectedGameDate.getTime())){
                dispatch(painelCloseDialogueForm());
                dispatch(painelUpdateGame(userToken, userId, selectedSeasonId, selectedGameId, gameName, gameScore, selectedGameDate));
            }
        }else{
            dispatch(painelCloseDialogueForm());
        } 
    };

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

    return(
        <Fragment>
            <DialogTitle id="form-dialog-title">Update Game</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    In order to update this game, please, check the boxes you want to change and insert the new value for the data.
                    PS: It may not be possible to change some fields.
                </DialogContentText>

                {/* -------------------------------------- */}
                {/* GAME NAME */}
                <UpdateField>
                   
                    <FormControl component="fieldset">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox checked={gameNameCheckBoxState} onChange={() => onGameNameCheckBoxChangeHandler()} color="primary" />}
                            label=""
                            labelPlacement="start"
                        />
                    </FormControl>
                    <GameNameField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={"Game name"}
                        disabled = {!gameNameCheckBoxState}
                        error={!isGameNameValid}
                        helperText={gameNameErrorMsg}
                        onChange={(event) => onGameNameChangeHandler(event)}
                    /> 
                </UpdateField>

                {/* -------------------------------------- */}
                {/* GAME SCORE */}
                <UpdateField>
                    <FormControl component="fieldset">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox checked={gameScoreCheckBoxState} onChange={() => onGameScoreCheckBoxChangedHandler()} color="primary" />}
                            label=""
                            labelPlacement="start"
                        />
                    </FormControl>
                    <GameNameField
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
                        disabled={!gameScoreCheckBoxState}
                    />
                </UpdateField>

                {/* -------------------------------------- */}
                {/* GAME DATE */}
                <UpdateField>
                    <FormControl component="fieldset">
                            <FormControlLabel
                                value="startDate"
                                control={<Checkbox checked={gameDateCheckBoxState} onChange={() => onGameDateCheckBoxChangeHandler()} color="primary" />}
                                label=""
                                labelPlacement="start"
                            />
                     </FormControl>
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{opacity:0.6, marginLeft:15}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Game date"
                            value={selectedGameDate}
                            onChange = {(date) => onGameDateChangeHandler(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                     </MuiPickersUtilsProvider> 
                </UpdateField>
                {/* -------------------------------------- */}

            </DialogContent>

            {/* -------------------------------------- */}
            {/* BUTTONS */}
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => updateGameHandler()} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Fragment>
    );
};

export default UpdateGameForm;