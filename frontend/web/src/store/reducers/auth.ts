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
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcmxhaCIsInN1YiI6IjgyMzllZWM4LTM2ZjQtNDU0Yy05ZDlmLTE1NDZmZDQxMTE5ZSIsImlhdCI6MTYwMTc3MTkwNCwiZXhwIjoxNjAxNzc1NTA0fQ.1DZ97_puC4Ymd1q63Dgq_HpeqWdypPOKnQ81X-Ovn3M",
    userName:'Carla Steffanie do Nascimento',
    userId: '8239eec8-36f4-454c-9d9f-1546fd41119e',
    error: '',
    loading: false,
    gender: 'f'
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