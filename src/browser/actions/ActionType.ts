import { RequestState } from '@actions/requesting/types/RequestState';

export type Action = {
    type?: ActionType;
    title?: string;
    requestState?: RequestState;
    message?: string;
};

export enum ActionType {
    SET_REQUEST_STATE = 'SET_REQUEST_STATE',
    SET_REQUEST_RESULT = 'SET_REQUEST_RESULT',
    CLEAR_REQUEST = 'CLEAR_REQUEST',

    SET_BOOK_TITLE = 'SET_BOOK_TITLE'
}
