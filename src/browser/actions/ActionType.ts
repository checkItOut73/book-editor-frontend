import { RequestState } from '@actions/requesting/types/RequestState';

export type Action = {
    type?: ActionType;
    title?: string;
    requestState?: RequestState;
    message?: string;
    heading?: string;
    text?: string;
    id?: number;
};

export enum ActionType {
    SET_REQUEST_STATE = 'SET_REQUEST_STATE',
    SET_REQUEST_RESULT = 'SET_REQUEST_RESULT',
    CLEAR_REQUEST = 'CLEAR_REQUEST',

    SET_BOOK_TITLE = 'SET_BOOK_TITLE',
    SET_CHAPTER_HEADING = 'SET_CHAPTER_HEADING',
    SET_PARAGRAPH_HEADING = 'SET_PARAGRAPH_HEADING',
    SET_VERSE_TEXT = 'SET_VERSE_TEXT',
    DELETE_VERSE = 'DELETE_VERSE'
}
