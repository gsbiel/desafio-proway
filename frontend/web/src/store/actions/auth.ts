import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
} from './actionTypes';

// import axios from 'axios';

const AUTH_SIGN_UP_URL = ``;
const AUTH_SIGN_IN_URL = ``;

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token: string, userId: string) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        idToken: userId
    };
};

export const authFail = (error:string) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (email: string, password: string, isSignup: boolean) => {

    const set_delay = (ms: any): Promise<any> => {
        return new Promise( (resolve, reject) => {
            console.log("iniciando contagem do login...")
            setTimeout(resolve, ms)
            console.log("terminando contagem do login...")
        });
    }

    return async (dispatch:any) => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let AUTH_URL = isSignup ? AUTH_SIGN_UP_URL : AUTH_SIGN_IN_URL;

        // axios.post(AUTH_URL, authData)
        //     .then(resp => {
        //         console.log(resp.data.idToken);
        //         console.log(resp.data.localId);
        //         dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        //     })
        //     .catch(err => {
        //         dispatch(authFail(err.response.data.error));
        //     });

        return await set_delay(3000)
    };
};