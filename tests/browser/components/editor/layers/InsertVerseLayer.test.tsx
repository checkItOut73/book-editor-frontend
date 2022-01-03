import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { InsertVerseLayer } from '@components/editor/layers/InsertVerseLayer';
import { RequestButton } from '@components/requesting/RequestButton';

jest.mock('@components/requesting/RequestButton', () => ({
    RequestButton: (props) => <div {...props}>RequestButtonMock</div>
}));

jest.mock('@components/requesting/RequestReponseMessage', () => ({
    RequestReponseMessage: (props) => (
        <div {...props}>RequestReponseMessageMock</div>
    )
}));

jest.mock('@actions/requesting/fetchApi', () => ({
    fetchApi: (url, options, onSuccessCallback) => ({
        type: 'FETCH_API_MOCK',
        url,
        options,
        onSuccessCallback
    })
}));

jest.mock('@actions/editor/setVerses', () => ({
    setVerses: (paragraphId, verses) => ({
        type: 'SET_VERSES_MOCK',
        paragraphId,
        verses
    })
}));

describe('<InsertVerseLayer />', () => {
    let props;
    let state;
    let component;
    let dispatch;
    const getState = () => state;

    beforeEach(() => {
        props = {
            paragraphId: 5,
            previousVerseNumber: 2
        };

        state = {
            book: {
                chapters: [
                    {
                        id: 1,
                        number: 1,
                        heading: 'Chapter 1',
                        paragraphs: [
                            {
                                id: 5,
                                numberInChapter: 1,
                                heading: 'Paragraph 1',
                                verses: [
                                    {
                                        id: 1,
                                        numberInParagraph: 1,
                                        numberInChapter: 3,
                                        text: 'Verse 1'
                                    },
                                    {
                                        id: 2,
                                        numberInParagraph: 2,
                                        numberInChapter: 4,
                                        text: 'Verse 2'
                                    },
                                    {
                                        id: 3,
                                        numberInParagraph: 3,
                                        numberInChapter: 5,
                                        text: 'Verse 3'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };

        dispatch = jest.fn();
    });

    function createNodeMock() {
        return {
            value: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
        };
    }

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <InsertVerseLayer {...props} />
            </Context.Provider>,
            { createNodeMock }
        );
    }

    test('<InsertVerseLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-verse-layer"
            >
              <h2
                className="insert-verse-layer__heading"
              >
                Neuen Vers einfügen
              </h2>
              <p>
                <textarea
                  autoFocus={true}
                  className="insert-verse-layer__textarea"
                />
                <div
                  className="insert-verse-layer__submit"
                  label="Hinzufügen"
                  onClick={[Function]}
                >
                  RequestButtonMock
                </div>
              </p>
              <div>
                RequestReponseMessageMock
              </div>
            </div>
        `);
    });

    describe('when the request button is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root.findByType(RequestButton).props.onClick();
        });

        test('fetchApi is dispatched correctly', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'FETCH_API_MOCK',
                url: '/api/paragraph/5?resultVersesInResponse=1',
                options: {
                    method: 'PATCH',
                    body: JSON.stringify({
                        verses: [
                            { id: 1 },
                            { id: 2 },
                            {
                                text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
                            },
                            { id: 3 }
                        ]
                    })
                },
                onSuccessCallback: expect.any(Function)
            });
        });

        describe('and when the fetch is complete', () => {
            beforeEach(() => {
                act(() => {
                    dispatch.mock.calls[0][0].onSuccessCallback({
                        result: {
                            verses: [
                                { id: 1 },
                                { id: 2 },
                                {
                                    id: 4,
                                    text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
                                },
                                { id: 3 }
                            ]
                        }
                    });
                });
            });

            test('the verses are set in the store', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'SET_VERSES_MOCK',
                    paragraphId: 5,
                    verses: [
                        { id: 1 },
                        { id: 2 },
                        {
                            id: 4,
                            text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
                        },
                        { id: 3 }
                    ]
                });
            });
        });
    });

    describe('when there are no paragraphs', () => {
        beforeEach(() => {
            state.book.chapters[0].paragraphs[0].verses = [];
            props.previousVerseNumber = 0;
        });

        describe('when the request button is clicked', () => {
            beforeEach(() => {
                renderComponent();

                component.root.findByType(RequestButton).props.onClick();
            });

            test('fetchApi is dispatched correctly', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'FETCH_API_MOCK',
                    url: '/api/paragraph/5?resultVersesInResponse=1',
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            verses: [
                                {
                                    text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
                                }
                            ]
                        })
                    },
                    onSuccessCallback: expect.any(Function)
                });
            });
        });
    });
});
