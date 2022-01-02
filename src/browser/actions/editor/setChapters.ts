import { Action, ActionType } from '@actions/ActionType';

export function setChapters(chapters: Action['chapters']): Action {
    return {
        type: ActionType.SET_CHAPTERS,
        chapters
    };
}
