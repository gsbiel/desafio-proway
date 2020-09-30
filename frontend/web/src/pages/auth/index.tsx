import React, {useState} from "react";
import {
    Route,
    useLocation,
    useHistory
  } from "react-router-dom";


import {
    AuthContainer,
    FakeOpacityBox
} from './styles';

import LoginForm from "./components/loginForm";
import SignUpForm from './components/signUpForm';

const Auth = () => {

    const location = useLocation()
    const history = useHistory()

    const [signUpFormShouldOpen, shouldOpenSignUpForm] = useState(false)

    const openSignUpForm = () => {
        // shouldOpenSignUpForm(true)
        history.push(`/login/register`)
    }

    const closeSignUpForm = () => {
        history.goBack()
    }

    // console.log(location.pahname)

    return(
        <AuthContainer>

            <FakeOpacityBox />

            <LoginForm openSignUpForm={openSignUpForm}/>

            <Route path={`/login/register`}>
                <SignUpForm closeSignUpForm={closeSignUpForm}/>
            </Route>

        </AuthContainer>
    );
};

export default Auth;