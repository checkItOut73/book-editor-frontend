import { RequestState } from '@actions/requesting/types/RequestState';
import { ChapterData, ParagraphData, VerseData } from '@server/UseCase/GetApp/BookData';

export type Action = {
    type?: ActionType;
    id?: number;
    title?: string;
    chapterId?: number;
    chapterNumber?: number;
    chapters?: Array<{ id: number } & Partial<ChapterData>>;
    heading?: string;
    paragraphs?: Array<{ id: number } & Partial<ParagraphData>>;
    paragraphId?: number;
    verses?: Array<{ id: number } & Partial<VerseData>>;
    text?: string;
    requestState?: RequestState;
    message?: string;
};

export enum ActionType {
    SET_REQUEST_STATE = 'SET_REQUEST_STATE',
    SET_REQUEST_RESULT = 'SET_REQUEST_RESULT',
    CLEAR_REQUEST = 'CLEAR_REQUEST',

    SET_ACTIVE_CHAPTER_NUMBER = 'SET_ACTIVE_CHAPTER_NUMBER',
    DECREMENT_ACTIVE_CHAPTER_NUMBER = 'DECREMENT_ACTIVE_CHAPTER_NUMBER',

    SET_BOOK_TITLE = 'SET_BOOK_TITLE',
    SET_CHAPTERS = 'SET_CHAPTERS',
    DELETE_CHAPTER = 'DELETE_CHAPTER',

    SET_CHAPTER_HEADING = 'SET_CHAPTER_HEADING',
    SET_PARAGRAPHS = 'SET_PARAGRAPHS',
    DELETE_PARAGRAPH = 'DELETE_PARAGRAPH',

    SET_PARAGRAPH_HEADING = 'SET_PARAGRAPH_HEADING',
    SET_VERSES = 'SET_VERSES',
    DELETE_VERSE = 'DELETE_VERSE',

    SET_VERSE_TEXT = 'SET_VERSE_TEXT'
}
