import { Action, ActionType } from '@actions/ActionType';

export function setBookTitle(title: string): Action {
    return {
        type: ActionType.SET_BOOK_TITLE,
        title
    };
}
