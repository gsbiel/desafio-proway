import {AuthStateSliceType, PayloadType} from './reducers/auth';

export const updateObject = (oldObject: AuthStateSliceType, updatedProperties:PayloadType) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}