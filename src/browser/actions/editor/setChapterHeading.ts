import { Action, ActionType } from '@actions/ActionType';

export function setChapterHeading(id: number, heading: string): Action {
    return {
        type: ActionType.SET_CHAPTER_HEADING,
        id,
        heading
    };
}
