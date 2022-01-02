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

    test('book reducer updates chapters correctly', () => {
        const state = {
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 9043,
                    number: 1,
                    heading: 'Do Androids Dream of Electric Sheep?',
                    paragraphs: []
                },
                {
                    id: 9044,
                    number: 2,
                    heading: 'Everything I Never Told You',
                    paragraphs: [
                        {
                            id: 493204,
                            numberInChapter: 1,
                            heading: 'How it began...',
                            verses: []
                        }
                    ]
                },
                {
                    id: 9045,
                    number: 3,
                    heading: 'Cloudy with a Chance of Meatballs',
                    paragraphs: []
                }
            ]
        };

        const action = {
            type: ActionType.SET_CHAPTERS,
            chapters: [
                {
                    id: 9044
                },
                {
                    id: 90432,
                    heading: 'Everything I Never Told You'
                },
                {
                    id: 9045,
                    heading: 'Cloudy with a Chance of Meatballs 2'
                }
            ]
        };

        expect(book(state, action)).toEqual({
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 9044,
                    number: 1,
                    heading: 'Everything I Never Told You',
                    paragraphs: [
                        {
                            id: 493204,
                            numberInChapter: 1,
                            heading: 'How it began...',
                            verses: []
                        }
                    ]
                },
                {
                    id: 90432,
                    number: 2,
                    heading: 'Everything I Never Told You',
                    paragraphs: []
                },
                {
                    id: 9045,
                    number: 3,
                    heading: 'Cloudy with a Chance of Meatballs 2',
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
                    number: 4,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 944,
                    number: 5,
                    heading: 'Chapter 944',
                    paragraphs: []
                },
                {
                    id: 945,
                    number: 6,
                    heading: 'Chapter 945',
                    paragraphs: []
                },
                {
                    id: 946,
                    number: 7,
                    heading: 'Chapter 946',
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
                    number: 4,
                    heading: 'Chapter 943',
                    paragraphs: []
                },
                {
                    id: 945,
                    number: 5,
                    heading: 'Chapter 945',
                    paragraphs: []
                },
                {
                    id: 946,
                    number: 6,
                    heading: 'Chapter 946',
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

    test('book reducer updates paragraphs correctly', () => {
        const state = {
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 1,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 5,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: [
                        {
                            id: 9043,
                            numberInChapter: 1,
                            heading: 'Do Androids Dream of Electric Sheep?',
                            verses: []
                        },
                        {
                            id: 9044,
                            numberInChapter: 2,
                            heading: 'Everything I Never Told You',
                            verses: [
                                {
                                    id: 493204,
                                    numberInChapter: 1,
                                    numberInParagraph: 1,
                                    text: 'How it began...'
                                }
                            ]
                        },
                        {
                            id: 9045,
                            numberInChapter: 3,
                            heading: 'Cloudy with a Chance of Meatballs',
                            verses: []
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.SET_PARAGRAPHS,
            chapterId: 5,
            paragraphs: [
                {
                    id: 9044
                },
                {
                    id: 90432,
                    heading: 'Everything I Never Told You'
                },
                {
                    id: 9045,
                    heading: 'Cloudy with a Chance of Meatballs 2'
                }
            ]
        };

        expect(book(state, action)).toEqual({
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 1,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 5,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: [
                        {
                            id: 9044,
                            numberInChapter: 1,
                            heading: 'Everything I Never Told You',
                            verses: [
                                {
                                    id: 493204,
                                    numberInChapter: 1,
                                    numberInParagraph: 1,
                                    text: 'How it began...'
                                }
                            ]
                        },
                        {
                            id: 90432,
                            numberInChapter: 2,
                            heading: 'Everything I Never Told You',
                            verses: []
                        },
                        {
                            id: 9045,
                            numberInChapter: 3,
                            heading: 'Cloudy with a Chance of Meatballs 2',
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
                            numberInChapter: 1,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 490324,
                                    numberInChapter: 1,
                                    text: 'Verse 490324'
                                },
                                {
                                    id: 490325,
                                    numberInChapter: 2,
                                    text: 'Verse 490325'
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
                            numberInChapter: 2,
                            heading: 'Paragraph 2905',
                            verses: [
                                {
                                    id: 490326,
                                    numberInChapter: 3,
                                    text: 'Verse 490326'
                                },
                                {
                                    id: 490327,
                                    numberInChapter: 4,
                                    text: 'Verse 490327'
                                }
                            ]
                        },
                        {
                            id: 2906,
                            numberInChapter: 3,
                            heading: 'Paragraph 2906',
                            verses: [
                                {
                                    id: 490328,
                                    numberInChapter: 5,
                                    text: 'Verse 490328'
                                },
                                {
                                    id: 490329,
                                    numberInChapter: 6,
                                    text: 'Verse 490329'
                                }
                            ]
                        },
                        {
                            id: 2907,
                            numberInChapter: 4,
                            heading: 'Paragraph 2907',
                            verses: [
                                {
                                    id: 490330,
                                    numberInChapter: 7,
                                    text: 'Verse 490330'
                                },
                                {
                                    id: 490331,
                                    numberInChapter: 8,
                                    text: 'Verse 490331'
                                }
                            ]
                        },
                        {
                            id: 2908,
                            numberInChapter: 5,
                            heading: 'Paragraph 2908',
                            verses: [
                                {
                                    id: 490332,
                                    numberInChapter: 9,
                                    text: 'Verse 490332'
                                },
                                {
                                    id: 490333,
                                    numberInChapter: 10,
                                    text: 'Verse 490333'
                                }
                            ]
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
                            numberInChapter: 1,
                            heading: 'Paragraph 2904',
                            verses: [
                                {
                                    id: 490324,
                                    numberInChapter: 1,
                                    text: 'Verse 490324'
                                },
                                {
                                    id: 490325,
                                    numberInChapter: 2,
                                    text: 'Verse 490325'
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
                            numberInChapter: 2,
                            heading: 'Paragraph 2905',
                            verses: [
                                {
                                    id: 490326,
                                    numberInChapter: 3,
                                    text: 'Verse 490326'
                                },
                                {
                                    id: 490327,
                                    numberInChapter: 4,
                                    text: 'Verse 490327'
                                }
                            ]
                        },
                        {
                            id: 2907,
                            numberInChapter: 3,
                            heading: 'Paragraph 2907',
                            verses: [
                                {
                                    id: 490330,
                                    numberInChapter: 5,
                                    text: 'Verse 490330'
                                },
                                {
                                    id: 490331,
                                    numberInChapter: 6,
                                    text: 'Verse 490331'
                                }
                            ]
                        },
                        {
                            id: 2908,
                            numberInChapter: 4,
                            heading: 'Paragraph 2908',
                            verses: [
                                {
                                    id: 490332,
                                    numberInChapter: 7,
                                    text: 'Verse 490332'
                                },
                                {
                                    id: 490333,
                                    numberInChapter: 8,
                                    text: 'Verse 490333'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    });

    test('book reducer does not cause an error on attempt of deletion of a non existent paragraph', () => {
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
                            numberInChapter: 1,
                            heading: 'Paragraph 2904',
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
                            numberInChapter: 1,
                            heading: 'Paragraph 2904',
                            verses: []
                        }
                    ]
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

    test('book reducer updates verses correctly', () => {
        const state = {
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 1,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 5,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: [
                        {
                            id: 9043,
                            numberInChapter: 1,
                            heading: 'Do Androids Dream of Electric Sheep?',
                            verses: [
                                {
                                    id: 456454,
                                    numberInParagraph: 1,
                                    numberInChapter: 1,
                                    text: 'That is quite interesting.'
                                },
                                {
                                    id: 456455,
                                    numberInParagraph: 2,
                                    numberInChapter: 2,
                                    text: 'That is really interesting.'
                                }
                            ]
                        },
                        {
                            id: 9044,
                            numberInChapter: 2,
                            heading: 'Everything I Never Told You',
                            verses: [
                                {
                                    id: 456456,
                                    numberInParagraph: 1,
                                    numberInChapter: 3,
                                    text: 'Do Androids Dream of Electric Sheep?'
                                },
                                {
                                    id: 456457,
                                    numberInParagraph: 2,
                                    numberInChapter: 4,
                                    text: 'Everything I Never Told You'
                                },
                                {
                                    id: 456458,
                                    numberInParagraph: 3,
                                    numberInChapter: 5,
                                    text: 'Cloudy with a Chance of Meatballs'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        const action = {
            type: ActionType.SET_VERSES,
            paragraphId: 9044,
            verses: [
                {
                    id: 456457
                },
                {
                    id: 8673567,
                    text: 'Something really new'
                },
                {
                    id: 456458,
                    text: 'Cloudy with a Chance of Meatballs 2'
                }
            ]
        };

        expect(book(state, action)).toEqual({
            id: 93,
            title: 'Book Title',
            chapters: [
                {
                    id: 1,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 5,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: [
                        {
                            id: 9043,
                            numberInChapter: 1,
                            heading: 'Do Androids Dream of Electric Sheep?',
                            verses: [
                                {
                                    id: 456454,
                                    numberInParagraph: 1,
                                    numberInChapter: 1,
                                    text: 'That is quite interesting.'
                                },
                                {
                                    id: 456455,
                                    numberInParagraph: 2,
                                    numberInChapter: 2,
                                    text: 'That is really interesting.'
                                }
                            ]
                        },
                        {
                            id: 9044,
                            numberInChapter: 2,
                            heading: 'Everything I Never Told You',
                            verses: [
                                {
                                    id: 456457,
                                    numberInParagraph: 1,
                                    numberInChapter: 3,
                                    text: 'Everything I Never Told You'
                                },
                                {
                                    id: 8673567,
                                    numberInParagraph: 2,
                                    numberInChapter: 4,
                                    text: 'Something really new'
                                },
                                {
                                    id: 456458,
                                    numberInParagraph: 3,
                                    numberInChapter: 5,
                                    text: 'Cloudy with a Chance of Meatballs 2'
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
});
