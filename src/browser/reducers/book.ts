import { ActionType } from '@actions/ActionType';

export const BOOK_DEFAULT_STATE = {
    id: undefined,
    title: '',
    chapters: []
};

type Action = {
    type?: string;
    title?: string;
};

export const book = (state = BOOK_DEFAULT_STATE, action: Action = {}) => {
    switch (action.type) {
        case ActionType.SET_BOOK_TITLE:
            return {
                ...state,
                title: action.title
            };
        default:
            return state;
    }
};
