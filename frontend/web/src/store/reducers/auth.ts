import {
    updateObject
} from '../utility';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../actions/actionTypes'

export interface AuthStateSliceType {
    isUserLogged: boolean,
    token: string,
    userName:string,
    userId: string,
    error: string,
    loading: boolean
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
    loading?: boolean
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
        error:'',
        loading: false
    });
}

const authFail =(state: AuthStateSliceType, action:ActionType) => {
    return updateObject(state, {
        isUserLogged: false,
        error: action.payload.error,
        loading: false
    });
}

const initialState: AuthStateSliceType = {
    isUserLogged: true,
    token: '',
    userName:'',
    userId: '',
    error: '',
    loading: false
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
        default:
            return state;
    }
};

export default reducer;