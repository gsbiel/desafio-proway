import {
    updateObject
} from '../utility';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
} from '../actions/actionTypes'

export interface StateSliceType {
    token: string,
    userId: string,
    error: string,
    loading: boolean
}

export interface ActionType {
    type: string,
    payload: PayloadType
}

export interface PayloadType {
    token?: string,
    userId?: string,
    error?: string;
    loading?: boolean
}

const initialState: StateSliceType = {
    token: '',
    userId: '',
    error: '',
    loading: false
};

const authStart = (state: StateSliceType, action:ActionType) => {
    console.log("authStart function called")
    return updateObject(state,{error: '', loading: true});
}

const authSuccess = (state: StateSliceType, action:ActionType) => {
    return updateObject(state, {
        token: action.payload.token,
        userId: action.payload.userId,
        error:'',
        loading: false
    });
}

const authFail =(state: StateSliceType, action:ActionType) => {
    return updateObject(state, {
        error: action.payload.error,
        loading: false
    });
}

const reducer = (
        state: StateSliceType = initialState, 
        action: ActionType
    ): StateSliceType => {

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