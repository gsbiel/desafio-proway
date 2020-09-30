import React from "react";
import {useSelector} from 'react-redux';
import {
    Route,
    useLocation,
    useHistory
  } from "react-router-dom";

import {
    RootState
} from '../../index';

import {
    AuthContainer,
    FakeOpacityBox
} from './styles';

import LoginForm from "./components/loginForm";
import SignUpForm from './components/signUpForm';
import Spinner from './components/loginForm/spinner';

const Auth = () => {

    const location = useLocation()
    const history = useHistory()

    const isLoading = useSelector( (state: RootState) => state.auth.loading )

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

            {isLoading ? <Spinner /> : null}

        </AuthContainer>
    );
};

export default Auth;