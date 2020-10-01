import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    auth, 
    authResetState,
    AuthArgsType
 } from '../../../../store/actions/auth'

import {
    LoginFormContainer,
    LoginField,
    PasswordField,
    LoginTitle,
    LoginButton,
    RegisterButton
} from './styles';

import {
    RootState
} from '../../../../index';

enum TextFieldErrorState {
    OK = "",
    WRONG_DATA = "Wrong username or password",
    MISSING_DATA= "Missing data"
}

interface PropsType {
    openSignUpForm: () => void
}

const LoginForm = (props: PropsType) => {

    const dispatch = useDispatch()
    const authError = useSelector( (state: RootState) => state.auth.error );
    
    const [loginBtnEnabled, setLoginBtnEnabled] = useState(false)

    const [passwordField, setPasswordField] = useState("")
    const [passwordFieldError, setPasswordFieldError] = useState(false)
    const [passwordFieldErrorState, setPasswordFieldErrorState] = useState(TextFieldErrorState.OK)

    const [loginField, setLoginField] = useState("")
    const [loginFieldError, setLoginFieldError] = useState(false)
    const [loginFieldErrorState, setLoginFieldErrorState] = useState(TextFieldErrorState.OK)

    useEffect(() => {
        if(authError.length){
            setLoginFieldError(true);
            setLoginFieldErrorState(TextFieldErrorState.WRONG_DATA);
            dispatch(authResetState());
        }
    },[authError])

    useEffect(() => {
        validateLoginFieldState(loginField)
        validateLoginBtnState()
    },[loginField])

    useEffect(() => {
        validatePasswordFieldState(passwordField)
        validateLoginBtnState()
    },[passwordField])

    useEffect(() => {
        setLoginFieldErrorState(TextFieldErrorState.OK)
        setLoginFieldError(false)

        setPasswordFieldErrorState(TextFieldErrorState.OK)
        setPasswordFieldError(false)
    },[])

    const loginChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoginField(event.target.value)
    }
    const passwordChangedHandler = (event: React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement>) => {
        setPasswordField(event.target.value)
    }

    const validateLoginFieldState = (value: string) => {
        if(!value){
            setLoginFieldErrorState(TextFieldErrorState.MISSING_DATA)
            setLoginFieldError(true)
        }
        else{
            setLoginFieldErrorState(TextFieldErrorState.OK)
            setLoginFieldError(false)
        }
    }

    const validatePasswordFieldState = (value: string) => {
        if(!value){
            setPasswordFieldErrorState(TextFieldErrorState.MISSING_DATA)
            setPasswordFieldError(true)
        }
        else{
            setPasswordFieldErrorState(TextFieldErrorState.OK)
            setPasswordFieldError(false)
        }
    }

    const validateLoginBtnState = () => {
        if(loginField=="" || passwordField==""){
            setLoginBtnEnabled(false)
        }else{
            setLoginBtnEnabled(true)
        }
    }

    const loginHandler = () => {

        const data: AuthArgsType = {
            username: loginField,
            password: passwordField,
            isSignUp: false
        }

        dispatch(auth(data))
    }

    return (
        <LoginFormContainer>

            <LoginTitle>
                Log in
            </LoginTitle>
        
            <LoginField
                error= {loginFieldError}
                helperText={loginFieldErrorState}
                id="outlined-basic" 
                label="Username" 
                variant="outlined"
                value={loginField}
                onChange={(event) => loginChangedHandler(event)}
            />

            <PasswordField
                error= {passwordFieldError}
                helperText={passwordFieldErrorState}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={passwordField}
                onChange = {(event) => passwordChangedHandler(event)}
            />

            <LoginButton 
                variant="contained" 
                color="primary"
                disabled = {!loginBtnEnabled}
                onClick={() => loginHandler()}
            >
                Login
            </LoginButton>

            <RegisterButton 
                variant="contained" 
                color="secondary"
                onClick={() => props.openSignUpForm()}
            >
                Sign Up
            </RegisterButton>

        </LoginFormContainer>
    )
}

export default LoginForm;