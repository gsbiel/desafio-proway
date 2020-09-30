import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
} from './actionTypes';

import axios from 'axios';

const AUTH_SIGN_UP_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/signup`;
const AUTH_SIGN_IN_URL = `${process.env.REACT_APP_DEV_BACKEND_BASE_URL}/auth/login`;

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token: string, userId: string, userName: string) => {
    return {
        type: AUTH_SUCCESS,
        payload:{
            token: token,
            userId: userId,
            userName: userName
        }
    };
};

export const authFail = (error:string) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (username: string, password: string, isSignup: boolean) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            console.log("iniciando contagem do login...")
            setTimeout(resolve, ms)
            
        });
    }

    return async (dispatch:any) => {

        dispatch(authStart());

        const authData = {
            username: username,
            password: password
        };

        let AUTH_URL = isSignup ? AUTH_SIGN_UP_URL : AUTH_SIGN_IN_URL;

        axios.post(AUTH_URL, authData)
            .then(resp => {
                dispatch(authSuccess(resp.data.access_token, resp.data.userId, resp.data.name));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });

        return
    };
};