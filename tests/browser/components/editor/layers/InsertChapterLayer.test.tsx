import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { InsertChapterLayer } from '@components/editor/layers/InsertChapterLayer';
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

jest.mock('@actions/editor/setChapters', () => ({
    setChapters: (chapters) => ({
        type: 'SET_CHAPTERS_MOCK',
        chapters
    })
}));

jest.mock('@actions/navigation/setActiveChapterNumber', () => ({
    setActiveChapterNumber: (activeChapterNumber) => ({
        type: 'SET_ACTIVE_CHAPTER_NUMBER_MOCK',
        activeChapterNumber
    })
}));

describe('<InsertChapterLayer />', () => {
    let props;
    let state;
    let component;
    let dispatch;
    const getState = () => state;

    beforeEach(() => {
        props = {
            previousChapterNumber: 2
        };

        state = {
            book: {
                id: 5,
                chapters: [
                    {
                        id: 1,
                        number: 1,
                        heading: 'Chapter 1'
                    },
                    {
                        id: 2,
                        number: 2,
                        heading: 'Chapter 2'
                    },
                    {
                        id: 3,
                        number: 3,
                        heading: 'Chapter 3'
                    }
                ]
            }
        };

        dispatch = jest.fn();
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <InsertChapterLayer {...props} />
            </Context.Provider>
        );
    }

    test('<InsertChapterLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-chapter-layer"
            >
              <h2
                className="insert-chapter-layer__heading"
              >
                Kapitel hinzufügen
              </h2>
              <p>
                <label>
                  Kapitelüberschrift:
                </label>
                <input
                  autoFocus={true}
                  className="insert-chapter-layer__input"
                  onChange={[Function]}
                  value=""
                />
                <div
                  className="insert-chapter-layer__submit"
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
                    .findByProps({ className: 'insert-chapter-layer__input' })
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
                    url: '/api/book/5?resultChaptersInResponse=1',
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            chapters: [
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
                                chapters: [
                                    { id: 1 },
                                    { id: 2 },
                                    { id: 4, heading: 'Der ungeöffnete Brief' },
                                    { id: 3 }
                                ]
                            }
                        });
                    });
                });

                test('the chapters are set in the store', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'SET_CHAPTERS_MOCK',
                        chapters: [
                            { id: 1 },
                            { id: 2 },
                            { id: 4, heading: 'Der ungeöffnete Brief' },
                            { id: 3 }
                        ]
                    });
                });

                test('the active chapter number is updated correctly', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'SET_ACTIVE_CHAPTER_NUMBER_MOCK',
                        activeChapterNumber: 3
                    });
                });
            });
        });
    });

    describe('when there are no chapters', () => {
        beforeEach(() => {
            state.book.chapters = [];
            props.previousChapterNumber = 0;
        });

        describe('and when the text field content is changed', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByProps({ className: 'insert-chapter-layer__input' })
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
                        url: '/api/book/5?resultChaptersInResponse=1',
                        options: {
                            method: 'PATCH',
                            body: JSON.stringify({
                                chapters: [
                                    { heading: 'Der ungeöffnete Brief' }
                                ]
                            })
                        },
                        onSuccessCallback: expect.any(Function)
                    });
                });
            });
        });
    });
});
