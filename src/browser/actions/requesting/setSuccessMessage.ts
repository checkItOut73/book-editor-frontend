import { Action, ActionType } from '@actions/ActionType';
import { RequestState } from '@actions/requesting/types/RequestState';

export function setSuccessMessage(message: string): Action {
    return {
        type: ActionType.SET_REQUEST_RESULT,
        requestState: RequestState.SUCCESS,
        message
    };
}
