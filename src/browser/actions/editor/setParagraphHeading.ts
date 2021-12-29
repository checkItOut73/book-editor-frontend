import { Action, ActionType } from '@actions/ActionType';

export function setParagraphHeading(id: number, heading: string): Action {
    return {
        type: ActionType.SET_PARAGRAPH_HEADING,
        id,
        heading
    };
}
