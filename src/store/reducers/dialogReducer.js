import { OPENREQUEST, OPENSUCCESS } from "../actionTypes";
export const initialDialogState = {
    requestOpen: false,
    successOpen: false
};

export const  dialogReducer=( state , action )=> {
    switch (action.type) {
    case OPENREQUEST:
        return {
            ...state,
            requestOpen: action.payload,
        };

    case OPENSUCCESS:
        return {
            ...state,
            requestOpen: false,
            successOpen:action.payload
        };

    default:
        return state;
    }
};