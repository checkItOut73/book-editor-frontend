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
        case ActionType.SET_CHAPTERS:
            return {
                ...state,
                chapters: action.chapters.map((chapter, index) => {
                    const chapterInState = state.chapters.find((chapterInStore) => chapterInStore.id === chapter.id) || {};

                    return {
                        paragraphs: [],
                        ...chapterInState,
                        ...chapter,
                        number: index + 1
                    };
                })
            };
        case ActionType.DELETE_CHAPTER:
            const chapterToBeDeleted = state.chapters.find((chapter) => chapter.id === action.id);

            if (!chapterToBeDeleted) {
                return state;
            }

            return {
                ...state,
                chapters: state.chapters
                    .filter((chapter) => {
                        return chapter.id !== action.id;
                    })
                    .map((chapter) => {
                        return {
                            ...chapter,
                            number: chapter.number > chapterToBeDeleted.number ? chapter.number - 1 : chapter.number
                        };
                    })
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
        case ActionType.DELETE_PARAGRAPH:
            const paragraphToBeDeleted = state.chapters.map((chapter) => chapter.paragraphs).flat().find((paragraph) => paragraph.id === action.id);

            if (!paragraphToBeDeleted) {
                return state;
            }

            return {
                ...state,
                chapters: state.chapters.map((chapter) => {
                    return {
                        ...chapter,
                        paragraphs: chapter.paragraphs
                            .filter((paragraph) => {
                                return paragraph.id !== action.id;
                            })
                            .map((paragraph) => {
                                if (paragraph.numberInChapter <= paragraphToBeDeleted.numberInChapter) {
                                    return paragraph;
                                }

                                return {
                                    ...paragraph,
                                    numberInChapter: paragraph.numberInChapter - 1,
                                    verses: paragraph.verses.map((verse) => {
                                        return {
                                            ...verse,
                                            numberInChapter: verse.numberInChapter - paragraphToBeDeleted.verses.length
                                        }
                                    })
                                }
                            })
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
        default:
            return state;
    }
};
