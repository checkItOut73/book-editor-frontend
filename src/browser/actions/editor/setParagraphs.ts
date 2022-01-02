import { Action, ActionType } from '@actions/ActionType';

export function setParagraphs(chapterId: number, paragraphs: Action['paragraphs']): Action {
    return {
        type: ActionType.SET_PARAGRAPHS,
        chapterId,
        paragraphs
    };
}
