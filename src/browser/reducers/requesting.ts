import { ActionType } from '@actions/ActionType';
import { RequestState } from '@actions/requesting/types/RequestState';

export const REQUESTING_DEFAULT_STATE = {
    requestState: RequestState.IDLE,
    message: ''
};

type Action = {
    type?: string;
    requestState?: RequestState;
    message?: string;
};

export const requesting = (
    state = REQUESTING_DEFAULT_STATE,
    action: Action = {}
) => {
    switch (action.type) {
        case ActionType.SET_REQUEST_RESULT:
            return {
                ...state,
                requestState: action.requestState,
                message: action.message
            };
        case ActionType.SET_REQUEST_STATE:
            return {
                ...state,
                requestState: action.requestState
            };
        case ActionType.CLEAR_REQUEST:
            return {
                ...state,
                requestState: RequestState.IDLE,
                message: ''
            };
        default:
            return state;
    }
};
