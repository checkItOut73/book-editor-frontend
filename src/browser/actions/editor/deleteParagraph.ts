import { Action, ActionType } from '@actions/ActionType';

export function deleteParagraph(id: number): Action {
    return {
        type: ActionType.DELETE_PARAGRAPH,
        id
    };
}
