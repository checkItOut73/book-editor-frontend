import { Action, ActionType } from '@actions/ActionType';

export const NAVIGATION_DEFAULT_STATE = {
    activeChapterNumber: 1
};
const MIN_ACTIVE_CHAPTER_NUMBER = 1;

export const navigation = (
    state = NAVIGATION_DEFAULT_STATE,
    action: Action = {}
) => {
    switch (action.type) {
        case ActionType.DECREMENT_ACTIVE_CHAPTER_NUMBER:
            return {
                activeChapterNumber: state.activeChapterNumber > MIN_ACTIVE_CHAPTER_NUMBER ? state.activeChapterNumber - 1 : state.activeChapterNumber
            }
        case ActionType.SET_ACTIVE_CHAPTER_NUMBER:
            return {
                activeChapterNumber: action.chapterNumber
            }
        default:
            return state;
    }
};
