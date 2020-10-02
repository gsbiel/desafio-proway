import {
    updateObject
} from '../utility';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_RESET_STATE
} from '../actions/actionTypes'

export interface AuthStateSliceType {
    isUserLogged: boolean,
    token: string,
    userName:string,
    userId: string,
    error: string,
    loading: boolean,
    gender: string
}

export interface ActionType {
    type: string,
    payload: PayloadType
}

export interface PayloadType {
    isUserLogged?: boolean,
    token?: string,
    userName?: string,
    userId?: string,
    error?: string;
    loading?: boolean,
    gender?: string
}

const authStart = (state: AuthStateSliceType, action:ActionType) => {
    return updateObject(state,{error: '', loading: true});
}

const authSuccess = (state: AuthStateSliceType, action:ActionType) => {
    return updateObject(state, {
        isUserLogged: true,
        token: action.payload.token,
        userName: action.payload.userName,
        userId: action.payload.userId,
        gender: action.payload.gender,
        error:'',
        loading: false
    });
}

const authFail = (state: AuthStateSliceType, action:ActionType) => {
    return updateObject(state, {
        isUserLogged: false,
        error: action.payload.error,
        loading: false
    });
}

const authResetState =(state: AuthStateSliceType, action:ActionType) => {
    return updateObject(state, {...initialState})
}

const initialState: AuthStateSliceType = {
    isUserLogged: true,
    token: '',
    userName:'',
    userId: '',
    error: '',
    loading: false,
    gender: ''
};

const reducer = (
        state: AuthStateSliceType = initialState, 
        action: ActionType
    ): AuthStateSliceType => {

    switch(action.type){
        case AUTH_START:
            return authStart(state, action);
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case AUTH_RESET_STATE:
            return authResetState(state,action);
        default:
            return state;
    }
};

export default reducer;