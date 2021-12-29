import { Action, ActionType } from '@actions/ActionType';

export function decrementActiveChapterNumber(): Action {
    return {
        type: ActionType.DECREMENT_ACTIVE_CHAPTER_NUMBER
    };
}
