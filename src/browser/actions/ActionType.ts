import { RequestState } from '@actions/requesting/types/RequestState';
import { ChapterData } from '@server/UseCase/GetApp/BookData';

export type Action = {
    type?: ActionType;
    title?: string;
    chapters?: Array<{ id: number } & Partial<ChapterData>>;
    requestState?: RequestState;
    message?: string;
    heading?: string;
    text?: string;
    id?: number;
    chapterNumber?: number;
};

export enum ActionType {
    SET_REQUEST_STATE = 'SET_REQUEST_STATE',
    SET_REQUEST_RESULT = 'SET_REQUEST_RESULT',
    CLEAR_REQUEST = 'CLEAR_REQUEST',

    SET_ACTIVE_CHAPTER_NUMBER = 'SET_ACTIVE_CHAPTER_NUMBER',
    DECREMENT_ACTIVE_CHAPTER_NUMBER = 'DECREMENT_ACTIVE_CHAPTER_NUMBER',

    SET_BOOK_TITLE = 'SET_BOOK_TITLE',
    SET_CHAPTERS = 'SET_CHAPTERS',

    SET_CHAPTER_HEADING = 'SET_CHAPTER_HEADING',
    DELETE_CHAPTER = 'DELETE_CHAPTER',

    SET_PARAGRAPH_HEADING = 'SET_PARAGRAPH_HEADING',
    DELETE_PARAGRAPH = 'DELETE_PARAGRAPH',

    SET_VERSE_TEXT = 'SET_VERSE_TEXT',
    DELETE_VERSE = 'DELETE_VERSE'
}
