import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { InsertParagraphLayer } from '@components/editor/layers/InsertParagraphLayer';
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

jest.mock('@actions/editor/setParagraphs', () => ({
    setParagraphs: (chapterId, paragraphs) => ({
        type: 'SET_PARAGRAPHS_MOCK',
        chapterId,
        paragraphs
    })
}));

describe('<InsertParagraphLayer />', () => {
    let props;
    let state;
    let component;
    let dispatch;
    const getState = () => state;

    beforeEach(() => {
        props = {
            chapterId: 5,
            previousParagraphNumber: 2
        };

        state = {
            book: {
                chapters: [
                    {
                        id: 5,
                        number: 1,
                        heading: 'Chapter 1',
                        paragraphs: [
                            {
                                id: 1,
                                numberInChapter: 1,
                                heading: 'Paragraph 1'
                            },
                            {
                                id: 2,
                                numberInChapter: 2,
                                heading: 'Paragraph 2'
                            },
                            {
                                id: 3,
                                numberInChapter: 3,
                                heading: 'Paragraph 3'
                            }
                        ]
                    }
                ]
            }
        };

        dispatch = jest.fn();
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <InsertParagraphLayer {...props} />
            </Context.Provider>
        );
    }

    test('<InsertParagraphLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-paragraph-layer"
            >
              <h2
                className="insert-paragraph-layer__heading"
              >
                Paragraph hinzufügen
              </h2>
              <p>
                <label>
                  Paragraphüberschrift:
                </label>
                <input
                  autoFocus={true}
                  className="insert-paragraph-layer__input"
                  onChange={[Function]}
                  value=""
                />
                <div
                  className="insert-paragraph-layer__submit"
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

    describe('when the text field content is changed', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByProps({ className: 'insert-paragraph-layer__input' })
                    .props.onChange({
                        target: {
                            value: 'Der ungeöffnete Brief'
                        }
                    });
            });
        });

        describe('and when the request button is clicked', () => {
            beforeEach(() => {
                component.root.findByType(RequestButton).props.onClick();
            });

            test('fetchApi is dispatched correctly', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'FETCH_API_MOCK',
                    url: '/api/chapter/5?resultParagraphsInResponse=1',
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            paragraphs: [
                                { id: 1 },
                                { id: 2 },
                                { heading: 'Der ungeöffnete Brief' },
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
                                paragraphs: [
                                    { id: 1 },
                                    { id: 2 },
                                    { id: 4, heading: 'Der ungeöffnete Brief' },
                                    { id: 3 }
                                ]
                            }
                        });
                    });
                });

                test('the paragraphs are set in the store', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'SET_PARAGRAPHS_MOCK',
                        chapterId: 5,
                        paragraphs: [
                            { id: 1 },
                            { id: 2 },
                            { id: 4, heading: 'Der ungeöffnete Brief' },
                            { id: 3 }
                        ]
                    });
                });
            });
        });
    });

    describe('when there are no paragraphs', () => {
        beforeEach(() => {
            state.book.chapters[0].paragraphs = [];
            props.previousParagraphNumber = 0;
        });

        describe('and when the text field content is changed', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByProps({
                            className: 'insert-paragraph-layer__input'
                        })
                        .props.onChange({
                            target: {
                                value: 'Der ungeöffnete Brief'
                            }
                        });
                });
            });

            describe('and when the request button is clicked', () => {
                beforeEach(() => {
                    component.root.findByType(RequestButton).props.onClick();
                });

                test('fetchApi is dispatched correctly', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'FETCH_API_MOCK',
                        url: '/api/chapter/5?resultParagraphsInResponse=1',
                        options: {
                            method: 'PATCH',
                            body: JSON.stringify({
                                paragraphs: [{ heading: 'Der ungeöffnete Brief' }]
                            })
                        },
                        onSuccessCallback: expect.any(Function)
                    });
                });
            });
        });
    });
});
