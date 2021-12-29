import { Action, ActionType } from '@actions/ActionType';

export function deleteChapter(id: number): Action {
    return {
        type: ActionType.DELETE_CHAPTER,
        id
    };
}
