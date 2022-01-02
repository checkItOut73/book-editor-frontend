import { Action, ActionType } from '@actions/ActionType';

export function setVerses(paragraphId: number, verses: Action['verses']): Action {
    return {
        type: ActionType.SET_VERSES,
        paragraphId,
        verses
    };
}
