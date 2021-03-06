import React, {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router';

import {
    auth, 
    AuthArgsType,
    signupRecoverFromFailure
 } from '../../../../store/actions/auth';

import {
    RootState
} from '../../../../index';

import {
    SignUpFormContainer,
    FormContainer,
    NameField,
    EmailField,
    LoginField,
    PasswordField,
    Title,
    SignUpBtn,
    CancelButton,
    HorizontalBox,
    LoadingSpinner,
    RadioGroup,
    RadioItem,
    RadioLabel
} from './styles';

interface PropsType{
    closeSignUpForm: () => void
}

enum TextFieldErrorState {
    OK = "",
    MISSING_DATA= "Missing data",
    INVALID_LOGIN="Logins must have at least 8 characters, no spaces and no numbers at the begining.",
    INVALID_NAME= "Names must have at least 4 characters and cannot begin or terminate with spacings",
    INVALID_EMAIL = "Invalid e-mail",
    INVALID_PASSWORD = "Passwords must have at least 8 characters.",
    USERNAME_USED = "This username is already been used.",
    EMAIL_USED = "This e-mail is already been used.",
}

enum InputCase {
    NAME,
    EMAIL,
    LOGIN,
    PASSSWORD
}

const SignUpForm = (props: PropsType) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const isLoading = useSelector( (state: RootState) => state.signup.isLoading);
    const isCompleted = useSelector( (state: RootState) => state.signup.isCompleted);
    const isOnError = useSelector( (state: RootState) => state.signup.isOnError);
    const errors = useSelector( (state: RootState) => state.signup.error);

    const [isLoginDisabled, setLoginDisable] = useState(false);
    const [isFormFieldDisabled, setFieldDisabled] = useState(false);

    const [nameField, setNameField] = useState('');
    const [nameFieldStateError, setNameFieldStateError] = useState(false);
    const [nameFieldErrorMsg, setNameFieldErrorMsg] = useState("");
    
    const [emailField, setEmailField] = useState('');
    const [emailFieldStateError, setEmailFieldStateError] = useState(false);
    const [emailFieldErrorMsg, setEmailFieldErrorMsg] = useState("");

    const [loginField, setLoginField] = useState('');
    const [loginFieldStateError, setLoginFieldStateError] = useState(false);
    const [loginFieldErrorMsg, setLoginFieldErrorMsg] = useState("");

    const [passwordField, setPasswordField]= useState('');
    const [passwordFieldStateError, setPasswordFieldStateError] = useState(false);
    const [passwordFieldErrorMsg, setPasswordFieldErrorMsg] = useState("");

    const [selectedGenderValue, setSelectedGenderValue] = React.useState('m');


    useEffect(()=>{
        if(isCompleted){
            history.goBack();
        }
    }, [isCompleted])

    useEffect(() => {
        validateInput(InputCase.NAME, nameField);
    },[nameField])

    useEffect(() => {
        validateInput(InputCase.EMAIL, emailField);
    },[emailField])

    useEffect(() => {
        validateInput(InputCase.LOGIN, loginField);
    },[loginField])

    useEffect(() => {
        validateInput(InputCase.PASSSWORD, passwordField);
    },[passwordField])

    useEffect(() => {
        if(isOnError){
            setFieldDisabled(false);
            if(errors.email){
                setEmailFieldStateError(true);
                setEmailFieldErrorMsg(errors.email);
            }
            if(errors.login){
                setLoginFieldStateError(true);
                setLoginFieldErrorMsg(errors.login);
            }
            dispatch(signupRecoverFromFailure())
        }
    },[isOnError])

    useEffect(() => {
        if(nameFieldStateError || emailFieldStateError || loginFieldStateError || passwordFieldStateError){
            setLoginDisable(true)
        }
        else if(
            !nameFieldStateError && !emailFieldStateError && !loginFieldStateError && !passwordFieldStateError &&
            nameField.length && emailField.length && loginField.length && passwordField.length
        ){
            setLoginDisable(false)
        }
    },[nameFieldStateError, emailFieldStateError, loginFieldStateError, passwordFieldStateError])

    useEffect(() => {
        setNameFieldStateError(false)
        setNameFieldErrorMsg("")

        setEmailFieldStateError(false)
        setEmailFieldErrorMsg("")

        setLoginFieldStateError(false)
        setLoginFieldErrorMsg("")

        setPasswordFieldStateError(false)
        setPasswordFieldErrorMsg("")

        setLoginDisable(true)
    },[])

    const nameFieldChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameField(event.target.value);
    }

    const emailFieldChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailField(event.target.value);
    }

    const loginFieldChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginField(event.target.value);
    }

    const passwordFieldChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPasswordField(event.target.value);
    }

    const onSignUpBtnHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFieldDisabled(true);
        setLoginDisable(true);
        const data: AuthArgsType = {
            username: loginField,
            password: passwordField,
            isSignUp: true,
            email: emailField,
            name: nameField,
            gender: selectedGenderValue
        };
        dispatch(auth(data));
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedGenderValue(event.target.value);
    }

    const validateInput = (type: InputCase, data: string) => {
        switch(type){
            case InputCase.NAME:
                if(!data.length){
                    setNameFieldStateError(true)
                    setNameFieldErrorMsg(TextFieldErrorState.MISSING_DATA)
                }else if(!isNameCorrect(data)){
                    setNameFieldStateError(true)
                    setNameFieldErrorMsg(TextFieldErrorState.INVALID_NAME)
                }else{
                    setNameFieldStateError(false)
                    setNameFieldErrorMsg("")
                }
                break;
            case InputCase.EMAIL:
                if(!data.length){
                    setEmailFieldStateError(true)
                    setEmailFieldErrorMsg(TextFieldErrorState.MISSING_DATA)
                }else if(!isEmailCorrect(data)){
                    setEmailFieldStateError(true)
                    setEmailFieldErrorMsg(TextFieldErrorState.INVALID_EMAIL)
                }else{
                    setEmailFieldStateError(false)
                    setEmailFieldErrorMsg("")
                }
                break
            case InputCase.LOGIN:
                if(!data.length){
                    setLoginFieldStateError(true)
                    setLoginFieldErrorMsg(TextFieldErrorState.MISSING_DATA)
                }else if(!isLoginCorrect(data)){
                    setLoginFieldStateError(true)
                    setLoginFieldErrorMsg(TextFieldErrorState.INVALID_LOGIN)
                }else{
                    setLoginFieldStateError(false)
                    setLoginFieldErrorMsg("")
                }
                break;
            case InputCase.PASSSWORD:
                if(!data.length){
                    setPasswordFieldStateError(true)
                    setPasswordFieldErrorMsg(TextFieldErrorState.MISSING_DATA)
                }else if(!isPasswordCorrect(data)){
                    setPasswordFieldStateError(true)
                    setPasswordFieldErrorMsg(TextFieldErrorState.INVALID_PASSWORD)
                }else{
                    setPasswordFieldStateError(false)
                    setPasswordFieldErrorMsg("")
                }     
        }
    }

    const isEmailCorrect = (email: string) : boolean => {
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        return emailRegex.test(email)
    }

    const isNameCorrect = (name: string) : boolean => {
        const nameRegex = new RegExp(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/)
        return nameRegex.test(name)
    }

    const isLoginCorrect = (login: string): boolean => {
        const loginRegex = new RegExp(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
        return loginRegex.test(login)
    }

    const isPasswordCorrect = (password: string): boolean => {
        return (password.length > 8)
    }

    return(
        <SignUpFormContainer>
            <FormContainer>

                <CancelButton 
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => props.closeSignUpForm()}
                    disabled={isFormFieldDisabled}
                >
                    X
                </CancelButton>

                <Title>
                    Sign up
                </Title>

                <NameField 
                    error={nameFieldStateError}
                    label="Name"
                    disabled={isFormFieldDisabled}
                    id="outlined-margin-none"
                    defaultValue="" 
                    value={nameField}
                    placeholder="Your name here."
                    helperText={nameFieldStateError ? nameFieldErrorMsg : ""}
                    variant="outlined"
                    onChange={(event) => nameFieldChangedHandler(event)}
                />

                <RadioGroup>

                    <RadioLabel>Male</RadioLabel>
                    <RadioItem
                        disabled={isFormFieldDisabled}
                        checked={selectedGenderValue === 'm'}
                        onChange={(event) => handleGenderChange(event)}
                        value="m"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />

                    <RadioLabel>Female</RadioLabel>
                    <RadioItem
                        disabled={isFormFieldDisabled}
                        checked={selectedGenderValue === 'f'}
                        onChange={(event) => handleGenderChange(event)}
                        value="f"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'B' }}
                    />

                    <RadioLabel>Other</RadioLabel>
                    <RadioItem
                        disabled={isFormFieldDisabled}
                        checked={selectedGenderValue === 'o'}
                        onChange={(event) => handleGenderChange(event)}
                        value="o"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                    />
                </RadioGroup>

                <EmailField 
                    error={emailFieldStateError}
                    label="E-mail"
                    disabled={isFormFieldDisabled}
                    id="outlined-margin-none"
                    defaultValue=""
                    value={emailField}
                    placeholder="Your e-mail here."
                    variant="outlined"
                    helperText={emailFieldStateError ? emailFieldErrorMsg : ""}
                    onChange={(event) => emailFieldChangedHandler(event)}
                />

                <HorizontalBox>
                    <LoginField 
                        error={loginFieldStateError}                    
                        label="Username"
                        disabled={isFormFieldDisabled}
                        id="outlined-margin-none"
                        defaultValue=""
                        value={loginField}
                        placeholder="Your username here."
                        helperText={loginFieldStateError ? loginFieldErrorMsg : ""}
                        variant="outlined"
                        onChange={(event) => loginFieldChangedHandler(event)}
                    />

                    <PasswordField 
                        error={passwordFieldStateError}
                        type="password"
                        label="Password"
                        disabled={isFormFieldDisabled}
                        id="outlined-margin-none"
                        defaultValue=""
                        value={passwordField}
                        placeholder="Your password here."
                        variant="outlined"
                        helperText={passwordFieldStateError ? passwordFieldErrorMsg : ""}
                        onChange={(event) => passwordFieldChangedHandler(event)}
                    />
                </HorizontalBox>

                <SignUpBtn 
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={isLoginDisabled}
                    onClick={(event) => onSignUpBtnHandler(event)}
                >
                    Save
                </SignUpBtn>

                {
                    isLoading ? 
                    <LoadingSpinner color="primary" /> :
                    null
                }
                
            </FormContainer>
        </SignUpFormContainer>
    );

}

export default SignUpForm;