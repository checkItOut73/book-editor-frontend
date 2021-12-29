import { Action, ActionType } from '@actions/ActionType';

export function setActiveChapterNumber(chapterNumber: number): Action {
    return {
        type: ActionType.SET_ACTIVE_CHAPTER_NUMBER,
        chapterNumber
    };
}
