import React, {useState} from "react";

import {
    AuthContainer,
    FakeOpacityBox
} from './styles';

import LoginForm from "./components/loginForm";
import SignUpForm from './components/signUpForm';

const Auth = () => {

    const [signUpFormShouldOpen, shouldOpenSignUpForm] = useState(false)

    const openSignUpForm = () => {
        shouldOpenSignUpForm(true)
    }

    const closeSignUpForm = () => {
        shouldOpenSignUpForm(false)
    }

    return(
        <AuthContainer>

            <FakeOpacityBox />

            <LoginForm openSignUpForm={openSignUpForm}/>

            {
                signUpFormShouldOpen ? 
                <SignUpForm closeSignUpForm={closeSignUpForm}/> :
                null   
            }

        </AuthContainer>
    );
};

export default Auth;