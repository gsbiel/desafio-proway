import {
    SIGNUP_START,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_RECOVER_FROM_FAILURE
} from '../actions/actionTypes';


export interface SignupErrorType {
    login?: string,
    email?: string
}

export interface SignupSliceStateType {
    isLoading: boolean,
    isOnError: boolean,
    isCompleted: boolean,
    error: SignupErrorType
}

export interface SignupPayloadType {
    error?: SignupErrorType
}

export interface SignupActionType {
    type: string
    payload: SignupPayloadType
}


const signupStartFlow = (state: SignupSliceStateType, action: SignupActionType ) => {
    return {
        ...state,
        isLoading: true 
    }
}

const signupSuccessFlow = (state: SignupSliceStateType, action: SignupActionType ) => {
    return {
        ...state,
        isLoading:false,
        isCompleted: true
    }
}

const signupFailFlow = (state: SignupSliceStateType, action: SignupActionType ) => {
    
    let errorState: SignupErrorType = {}

    if(action.payload.error?.email){
        errorState = {
            ...errorState,
            email: action.payload.error?.email
        }
    }

    if(action.payload.error?.login){
        errorState = {
            ...errorState,
            login: action.payload.error?.login
        }
    }
    
    return {
        ...state,
        isLoading: false,
        isOnError: true,
        error: errorState
    }
}

const signupRecoverFromFailureFlow = (state: SignupSliceStateType, action: SignupActionType ) => {
    return {
        ...state,
        isOnError: false
    }
}

const initialState: SignupSliceStateType = {
    isLoading: false,
    isOnError: false,
    isCompleted: false,
    error:{}
}

const reducer = (
    state: SignupSliceStateType = initialState,
    action: SignupActionType
): SignupSliceStateType => {

        switch(action.type){
            case SIGNUP_START:
                return signupStartFlow(state, action);
            case SIGNUP_SUCCESS:
                return signupSuccessFlow(state, action);
            case SIGNUP_FAIL:
                return signupFailFlow(state, action);
            case SIGNUP_RECOVER_FROM_FAILURE:
                return signupRecoverFromFailureFlow(state, action);
            default:
                return state;
        }

}

export default reducer;