import { RequestState } from '@actions/requesting/types/RequestState';
import { Action, ActionType } from '@actions/ActionType';

export function setRequestState(requestState: RequestState): Action {
    return {
        type: ActionType.SET_REQUEST_STATE,
        requestState
    };
}
