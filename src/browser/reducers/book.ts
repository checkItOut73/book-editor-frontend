import { Action, ActionType } from '@actions/ActionType';

export const BOOK_DEFAULT_STATE = {
    id: undefined,
    title: '',
    chapters: []
};

export const book = (state = BOOK_DEFAULT_STATE, action: Action = {}) => {
    switch (action.type) {
        case ActionType.SET_BOOK_TITLE:
            return {
                ...state,
                title: action.title
            };
        case ActionType.SET_CHAPTER_HEADING:
            return {
                ...state,
                chapters: state.chapters.map((chapter) => {
                    if (chapter.id !== action.id) {
                        return chapter;
                    }

                    return {
                        ...chapter,
                        heading: action.heading
                    };
                })
            };
        case ActionType.SET_PARAGRAPH_HEADING:
            return {
                ...state,
                chapters: state.chapters.map((chapter) => {
                    return {
                        ...chapter,
                        paragraphs: chapter.paragraphs.map((paragraph) => {
                            if (paragraph.id !== action.id) {
                                return paragraph;
                            }

                            return {
                                ...paragraph,
                                heading: action.heading
                            };
                        })
                    };
                })
            };
        case ActionType.SET_VERSE_TEXT:
            return {
                ...state,
                chapters: state.chapters.map((chapter) => {
                    return {
                        ...chapter,
                        paragraphs: chapter.paragraphs.map((paragraph) => {
                            return {
                                ...paragraph,
                                verses: paragraph.verses.map((verse) => {
                                    if (verse.id !== action.id) {
                                        return verse;
                                    }

                                    return {
                                        ...verse,
                                        text: action.text
                                    }
                                })
                            };
                        })
                    };
                })
            };
        case ActionType.DELETE_VERSE:
            return {
                ...state,
                chapters: state.chapters.map((chapter) => {
                    return {
                        ...chapter,
                        paragraphs: chapter.paragraphs.map((paragraph) => {
                            return {
                                ...paragraph,
                                verses: paragraph.verses.filter((verse) => {
                                    return verse.id !== action.id;
                                })
                            };
                        })
                    };
                })
            };
        default:
            return state;
    }
};
