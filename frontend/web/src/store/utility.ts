import {StateSliceType, PayloadType} from './reducers/auth';

export const updateObject = (oldObject: StateSliceType, updatedProperties:PayloadType) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}