import { Action, ActionType } from '@actions/ActionType';

export function setVerseText(id: number, text: string): Action {
    return {
        type: ActionType.SET_VERSE_TEXT,
        id,
        text
    };
}
