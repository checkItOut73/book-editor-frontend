import { book } from '@browser/reducers/book';
import { ActionType } from '@actions/ActionType';

describe('book | ', () => {
    test('book reducer returns correct default state', () => {
        expect(book()).toEqual({
            id: undefined,
            title: '',
            chapters: []
        });
    });

    test('book reducer updates title correctly', () => {
        const state = {
            id: 93,
            title: 'old title',
            chapters: []
        };

        const action = {
            type: ActionType.SET_BOOK_TITLE,
            title: 'new title'
        };

        expect(book(state, action)).toEqual({
            id: 93,
            title: 'new title',
            chapters: []
        });
    });

    test('book reducer updates chapter heading correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: []
                }
            ]
        };

        const action = {
            type: ActionType.SET_CHAPTER_HEADING,
            id: 944,
            heading: 'Updated Chapter 944'
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 944,
                    heading: 'Updated Chapter 944',
                    paragraphs: []
                }
            ]
        });
    });

    test('book reducer deletes chapter correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    number: 4,
                    paragraphs: []
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    number: 5,
                    paragraphs: []
                },
                {
                    id: 945,
                    heading: 'Chapter 945',
                    number: 6,
                    paragraphs: []
                },
                {
                    id: 946,
                    heading: 'Chapter 946',
                    number: 7,
                    paragraphs: []
                }
            ]
        };

        const action = {
            type: ActionType.DELETE_CHAPTER,
            id: 944
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    number: 4,
                    paragraphs: []
                },
                {
                    id: 945,
                    heading: 'Chapter 945',
                    number: 5,
                    paragraphs: []
                },
                {
                    id: 946,
                    heading: 'Chapter 946',
                    number: 6,
                    paragraphs: []
                }
            ]
        });
    });

    test('book reducer does not cause an error on attempt of deletion of a non existent chapter', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: []
                }
            ]
        };

        const action = {
            type: ActionType.DELETE_CHAPTER,
            id: 5345345
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: []
                }
            ]
        });
    });

    test('book reducer updates paragraph heading correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: []
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: []
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.SET_PARAGRAPH_HEADING,
            id: 2906,
            heading: 'Updated Paragraph 2906'
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: []
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Updated Paragraph 2906',
                            verses: []
                        }
                    ]
                }
            ]
        });
    });

    test('book reducer deletes paragraph correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: []
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: []
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.DELETE_PARAGRAPH,
            id: 2906
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: []
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        }
                    ]
                }
            ]
        });
    });

    test('book reducer updates verse text correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 59342,
                                    text: 'Verse 59342'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: [
                                {
                                    id: 59343,
                                    text: 'Verse 59343'
                                },
                                {
                                    id: 59344,
                                    text: 'Verse 59344'
                                },
                                {
                                    id: 59345,
                                    text: 'Verse 59345'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.SET_VERSE_TEXT,
            id: 59344,
            text: 'Updated Verse 59344'
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 59342,
                                    text: 'Verse 59342'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: [
                                {
                                    id: 59343,
                                    text: 'Verse 59343'
                                },
                                {
                                    id: 59344,
                                    text: 'Updated Verse 59344'
                                },
                                {
                                    id: 59345,
                                    text: 'Verse 59345'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });

    test('book reducer deletes verse correctly', () => {
        const state = {
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 59342,
                                    text: 'Verse 59342'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: [
                                {
                                    id: 59343,
                                    text: 'Verse 59343'
                                },
                                {
                                    id: 59344,
                                    text: 'Verse 59344'
                                },
                                {
                                    id: 59345,
                                    text: 'Verse 59345'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.DELETE_VERSE,
            id: 59344
        };

        expect(book(state, action)).toEqual({
            id: 43,
            title: 'book title',
            chapters: [
                {
                    id: 943,
                    heading: 'Chapter 943',
                    paragraphs: [
                        {
                            id: 2904,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 59342,
                                    text: 'Verse 59342'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 944,
                    heading: 'Chapter 944',
                    paragraphs: [
                        {
                            id: 2905,
                            heading: 'Paragraph 2905',
                            verses: []
                        },
                        {
                            id: 2906,
                            heading: 'Paragraph 2906',
                            verses: [
                                {
                                    id: 59343,
                                    text: 'Verse 59343'
                                },
                                {
                                    id: 59345,
                                    text: 'Verse 59345'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });
});
