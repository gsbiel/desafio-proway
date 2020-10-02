import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
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
    UpdateNameField,
    SeasonNameField
} from './styles';

import {
    TextFieldErrorState
} from '../../../../auth/components/loginForm/index';

import {
    painelCloseDialogueForm
} from '../../../../../store/actions/painel';


const UpdateSeasonForm = () => {

    const dispatch = useDispatch()

    const [nameCheckBoxState, setNameCheckboxState] = useState(false);

    const [seasonName, setSeasonName] = useState("");
    const [isSeasonNameValid, setSeasonNameValidationState] = useState(true);
    const [seasonNameErrorMsg, setSeasonNameErrorMsg] = useState(TextFieldErrorState.OK);

    const [selectedStartDate, setSelectedStartDate] = useState(new Date())

    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [endDateCheckBoxState, setEndDateCheckBoxState] = useState(false)

    let endDateFreezedValue = new Date(); 

    useEffect(() => {
        if(!seasonName.trim().length){
            setSeasonNameValidationState(false)
            setSeasonNameErrorMsg(TextFieldErrorState.MISSING_DATA)
        }else{
            setSeasonNameValidationState(true)
            setSeasonNameErrorMsg(TextFieldErrorState.OK)
        }
    },[seasonName]);

    useEffect(()=> {
        if(endDateCheckBoxState){
            endDateFreezedValue = selectedEndDate;
        }
    }, [selectedEndDate]);

    useEffect(() => {
        if(nameCheckBoxState){
            if(!seasonName.trim().length){
                setSeasonNameValidationState(false)
                setSeasonNameErrorMsg(TextFieldErrorState.MISSING_DATA)
            }
        }else{
            setSeasonNameValidationState(true)
            setSeasonNameErrorMsg(TextFieldErrorState.OK)
        }
    }, [nameCheckBoxState])

    useEffect(() => {
        setSeasonNameValidationState(true)
        setSeasonNameErrorMsg(TextFieldErrorState.OK)
    },[]);

    const onNameCheckBoxMarkedHandler = () => {
        setNameCheckboxState(!nameCheckBoxState)
    }

    const onSeasonNameChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSeasonName(event.target.value)
    }

    const onStartDateChangeHandler = (date: any) => {
        setSelectedStartDate(new Date())
        return null;
    }

    const onEndDateChangeHandler = (date:any) => {  
        if(endDateCheckBoxState){
            setSelectedEndDate(date);
        }else{
            console.log("entrei aqui")
            setSelectedEndDate(endDateFreezedValue);
        } 
    }

    const onEndDateCheckBoxMarkedHandler = () => {
        setEndDateCheckBoxState(!endDateCheckBoxState);
    }

    const updateSeasonHandler = () => {
        dispatch(painelCloseDialogueForm());
    }

    const handleClose = () => {
        dispatch(painelCloseDialogueForm());
    }

    return(
        <Fragment>
            <DialogTitle id="form-dialog-title">Update season</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    In order to update this season, please, check the boxes you want to change and insert the new value for the data.
                    PS: It may not be possible to change some fields.
                </DialogContentText>

                <UpdateNameField>

                    <FormControl component="fieldset">
                        <FormControlLabel
                            value="start"
                            control={<Checkbox checked={nameCheckBoxState} onChange={() => onNameCheckBoxMarkedHandler()} color="primary" />}
                            label=""
                            labelPlacement="start"
                        />
                    </FormControl>
                    <SeasonNameField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={"Season name"}
                        type="email"
                        disabled = {!nameCheckBoxState}
                        error={!isSeasonNameValid}
                        helperText={seasonNameErrorMsg}
                        onChange={(event) => onSeasonNameChangeHandler(event)}
                    />
                    
                </UpdateNameField>

                <UpdateNameField>
                    <FormControl component="fieldset">
                            <FormControlLabel
                                value="startDate"
                                control={<Checkbox checked={true} disabled={true} color="primary" />}
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
                            label="Start date"
                            value={selectedStartDate}
                            onChange = {(date) => onStartDateChangeHandler(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                     </MuiPickersUtilsProvider> 
                </UpdateNameField>

                <UpdateNameField>
                    <FormControl component="fieldset">
                            <FormControlLabel
                                value="endDate"
                                control={<Checkbox checked={endDateCheckBoxState} onChange={() => onEndDateCheckBoxMarkedHandler()} color="primary" />}
                                label=""
                                labelPlacement="start"
                            />
                     </FormControl>
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{opacity:0.6, marginLeft:15}}
                            defaultValue={null}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="End date"
                            value={selectedEndDate}
                            onChange = {(date) => onEndDateChangeHandler(date) }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                     </MuiPickersUtilsProvider> 
                </UpdateNameField>                

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => updateSeasonHandler()} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Fragment>
    )
}

export default UpdateSeasonForm;