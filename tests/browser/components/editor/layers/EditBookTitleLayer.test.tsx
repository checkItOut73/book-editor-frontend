import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { EditBookTitleLayer } from '@components/editor/layers/EditBookTitleLayer';
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

jest.mock('@actions/editor/setBookTitle', () => ({
    setBookTitle: (title) => ({
        type: 'SET_BOOK_TITLE_MOCK',
        title
    })
}));

describe('<EditBookTitleLayer />', () => {
    let props;
    let component;
    let dispatch;
    let state;
    const getState = () => state;

    beforeEach(() => {
        props = {
            id: 5,
            title: 'Book Title'
        };

        dispatch = jest.fn();
        state = {};
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <EditBookTitleLayer {...props} />
            </Context.Provider>
        );
    }

    test('<EditBookTitleLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-book-title-layer"
            >
              <h2>
                Buchtitel bearbeiten
              </h2>
              <p>
                <label>
                  Buchtitel:
                </label>
                <input
                  autoFocus={true}
                  onChange={[Function]}
                  value="Book Title"
                />
                <div
                  label="Speichern"
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

    describe('when the input is changed', () => {
        beforeEach(() => {
            renderComponent();

            const event = {
                target: {
                    value: 'The most wanted book'
                }
            };

            act(() => {
                component.root.findByType('input').props.onChange(event);
            });
        });

        test('the input value is updated correctly', () => {
            expect(component.root.findByType('input').props.value).toBe(
                'The most wanted book'
            );
        });

        describe('and when the request button is clicked', () => {
            beforeEach(() => {
                component.root.findByType(RequestButton).props.onClick();
            });

            test('fetchApi is dispatched correctly', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'FETCH_API_MOCK',
                    url: '/api/book/5',
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            title: 'The most wanted book'
                        })
                    },
                    onSuccessCallback: expect.any(Function)
                });
            });

            describe('and when the fetch is complete', () => {
                beforeEach(() => {
                    dispatch.mock.calls[0][0].onSuccessCallback();
                });

                test('the book title is updated', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'SET_BOOK_TITLE_MOCK',
                        title: 'The most wanted book'
                    });
                });
            });
        });
    });
});
