import { Action, ActionType } from '@actions/ActionType';

export function clearRequest(): Action {
    return {
        type: ActionType.CLEAR_REQUEST
    };
}
