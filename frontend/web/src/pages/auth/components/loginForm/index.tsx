import React from 'react';
import {
    LoginFormContainer,
    LoginField,
    PasswordField,
    LoginTitle,
    LoginButton
} from './styles';

const LoginForm = () => {

    return (
        <LoginFormContainer>

            <LoginTitle>
                Log in
            </LoginTitle>
        
            <LoginField
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
            />

            <PasswordField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
            />

            <LoginButton variant="contained" color="primary">
                Login
            </LoginButton>

        </LoginFormContainer>
    )
}

export default LoginForm;