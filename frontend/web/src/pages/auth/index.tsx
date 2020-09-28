import React, {useState} from "react";

import {
    AuthContainer,
    StyledPaper,
    LeftBackgroundBox,
    RightBackgroundBox,
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

            <StyledPaper elevation={3}>

                <LeftBackgroundBox />

                <RightBackgroundBox>

                    <FakeOpacityBox/>
 
                    <LoginForm openSignUpForm={openSignUpForm}/>

                    {
                        signUpFormShouldOpen ? 
                        <SignUpForm closeSignUpForm={closeSignUpForm}/> :
                        null   
                    }
                    

                </RightBackgroundBox>

            </StyledPaper>

        </AuthContainer>
    );
};

export default Auth;