import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_RESET_STATE,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_RECOVER_FROM_FAILURE
} from './actionTypes';

import axios from 'axios';
import { SignupErrorType } from '../reducers/signup';

const AUTH_SIGN_UP_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/signup`;
const AUTH_SIGN_IN_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/auth/login`;

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token: string, userId: string, userName: string, gender: string) => {
    return {
        type: AUTH_SUCCESS,
        payload:{
            token: token,
            userId: userId,
            userName: userName,
            gender: gender
        }
    };
};

export const authFail = (error:string) => {
    return {
        type: AUTH_FAIL,
        payload: {
            error: error
        }
    };
};

export const authResetState = () => {
    return{
        type: AUTH_RESET_STATE
    }
}

export const signupStart = () => {
    return {
        type: SIGNUP_START
    };
};

export const signupfail = (error: SignupErrorType) => {
    return {
        type: SIGNUP_FAIL,
        payload: {
            error: error
        }
    };
};

export const signupSuccess = () => {
    return {
        type: SIGNUP_SUCCESS,
    };
};

export const signupRecoverFromFailure = () => {
    return {
        type: SIGNUP_RECOVER_FROM_FAILURE,
    };
};

export interface AuthArgsType {
    username: string,
    password: string,
    isSignUp?: boolean
    email?: string,
    name?: string
    gender?: string
}

export const auth = (props: AuthArgsType) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            console.log("iniciando contagem do login...")
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {

        const isSignup = props.isSignUp ? props.isSignUp : false

        if(!isSignup){
            dispatch(authStart());
        }else{
            dispatch(signupStart())
        }

        let data = {}
        if(!isSignup){
            data = {
                username: props.username,
                password: props.password
            }
        }else{
            data = {
                name: props.name,
                email: props.email,
                login: props.username,
                password: props.password,
                gender: props.gender
            }
        }

        const authData = data

        let AUTH_URL = isSignup ? AUTH_SIGN_UP_URL : AUTH_SIGN_IN_URL;

        // Esse delay está sendo aplicado apenas para fins 
        // de visualização do backdrop com spinner.
        await set_delay(1000)

        axios.post(AUTH_URL, authData)
            .then(async resp => {
                if(!isSignup){
                    console.log(resp.data)
                    dispatch(authSuccess(resp.data.access_token, resp.data.userId, resp.data.name, resp.data.gender));
                }else{
                    dispatch(signupSuccess());
                    dispatch(auth({
                        username: props.username,
                        password: props.password
                    }))
                }
            })
            .catch(err => {
                if(!isSignup){
                    dispatch(authFail(err.response?.data.error ? err.response?.data.error : "Serviço indisponível."));
                }else{
                    console.log(err.response?.data);
                    console.log(JSON.parse(err.response?.data.error))
                    dispatch(signupfail(JSON.parse(err.response?.data.error))) 
                }
            });
        return
    };
};