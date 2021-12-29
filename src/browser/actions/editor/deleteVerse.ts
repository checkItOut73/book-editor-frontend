import { Action, ActionType } from '@actions/ActionType';

export function deleteVerse(id: number): Action {
    return {
        type: ActionType.DELETE_VERSE,
        id
    };
}
