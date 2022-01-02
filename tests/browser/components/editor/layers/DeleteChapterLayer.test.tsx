import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { DeleteChapterLayer } from '@components/editor/layers/DeleteChapterLayer';
import { RequestButton } from '@components/requesting/RequestButton';

jest.mock('@components/Chapter', () => ({
    Chapter: (props) => <div {...props}>ChapterMock</div>
}));

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

jest.mock('@actions/editor/deleteChapter', () => ({
    deleteChapter: (id) => ({
        type: 'DELETE_CHAPTER_MOCK',
        id
    })
}));

jest.mock('@actions/navigation/decrementActiveChapterNumber', () => ({
    decrementActiveChapterNumber: () => ({
        type: 'DECREMENT_ACTIVE_CHAPTER_MOCK'
    })
}));

describe('<DeleteChapterLayer />', () => {
    const initialState = {
        navigation: {
            activeChapterNumber: 3
        },
        book: {
            chapters: [{}, {}, {}, {}, {}]
        }
    };

    let props;
    let component;
    let dispatch;
    let state = initialState;
    const getState = () => state;

    beforeEach(() => {
        props = {
            id: 34,
            number: 8,
            heading: 'The missing key',
            paragraphs: []
        };

        dispatch = jest.fn();
    });

    afterEach(() => {
        state = initialState;
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <DeleteChapterLayer {...props} />
            </Context.Provider>
        );
    }

    test('<DeleteChapterLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="delete-chapter-layer"
            >
              <h2>
                Kapitel löschen
              </h2>
              <div
                className="delete-chapter-layer__chapter"
              >
                <div
                  heading="The missing key"
                  number={8}
                  paragraphs={Array []}
                >
                  ChapterMock
                </div>
              </div>
              <p>
                <div
                  className="delete-chapter-layer__submit"
                  disabled={false}
                  label="Bestätigen"
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
                url: '/api/chapter/34',
                options: {
                    method: 'DELETE'
                },
                onSuccessCallback: expect.any(Function)
            });
        });

        describe('and when the fetch is complete', () => {
            beforeEach(() => {
                act(() => {
                    dispatch.mock.calls[0][0].onSuccessCallback();
                });
            });

            test('the chapter is deleted in the store', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'DELETE_CHAPTER_MOCK',
                    id: 34
                });
            });

            test('the submit button is disabled and the label is changed', () => {
                expect(component).toMatchInlineSnapshot(`
                    <div
                      className="delete-chapter-layer"
                    >
                      <h2>
                        Kapitel löschen
                      </h2>
                      <div
                        className="delete-chapter-layer__chapter"
                      >
                        <div
                          heading="The missing key"
                          number={8}
                          paragraphs={Array []}
                        >
                          ChapterMock
                        </div>
                      </div>
                      <p>
                        <div
                          className="delete-chapter-layer__submit"
                          disabled={true}
                          label="Gelöscht"
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

            test('the active chapter number is not decremented', () => {
                expect(dispatch).not.toHaveBeenCalledWith({
                    type: 'DECREMENT_ACTIVE_CHAPTER_MOCK'
                });
            });

            describe('but if the last chapter has been deleted', () => {
                beforeAll(() => {
                    state.navigation.activeChapterNumber = 5;
                });

                test('the active chapter number is decremented', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'DECREMENT_ACTIVE_CHAPTER_MOCK'
                    });
                });
            });
        });
    });
});
