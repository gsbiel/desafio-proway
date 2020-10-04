import React from "react";
import {useSelector} from 'react-redux';
import {
    Redirect,
    Route,
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
    
    const history = useHistory()

    const isLoading = useSelector( (state: RootState) => state.auth.loading )
    const isUserLoggedIn = useSelector( (state: RootState) => state.auth.isUserLogged)

    const openSignUpForm = () => {
        // shouldOpenSignUpForm(true)
        history.push(`/login/register`)
    }

    const closeSignUpForm = () => {
        history.goBack()
    }

    
    

    return(
        <AuthContainer>

            <FakeOpacityBox />

            <LoginForm openSignUpForm={openSignUpForm}/>

            <Route path={`/login/register`}>
                <SignUpForm closeSignUpForm={closeSignUpForm}/>
            </Route>

            {isLoading ? <Spinner /> : null}

            {isUserLoggedIn ? <Redirect to="/painel" /> : null}

        </AuthContainer>
    );
};

export default Auth;