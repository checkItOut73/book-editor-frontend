import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { EditChapterHeadingLayer } from '@components/editor/layers/EditChapterHeadingLayer';
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

jest.mock('@actions/editor/setChapterHeading', () => ({
    setChapterHeading: (id, heading) => ({
        type: 'SET_CHAPTER_HEADING_MOCK',
        id,
        heading
    })
}));

describe('<EditChapterHeadingLayer />', () => {
    let props;
    let component;
    let dispatch;
    let state;
    const getState = () => state;

    beforeEach(() => {
        props = {
            id: 49,
            heading: 'The unforgiven step'
        };

        dispatch = jest.fn();
        state = {};
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <EditChapterHeadingLayer {...props} />
            </Context.Provider>
        );
    }

    test('<EditChapterHeadingLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-chapter-heading-layer"
            >
              <h2>
                Kapitelüberschrift bearbeiten
              </h2>
              <p>
                <label>
                  Kapitelüberschrift:
                </label>
                <input
                  autoFocus={true}
                  onChange={[Function]}
                  value="The unforgiven step"
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
                    value: 'The path to the end'
                }
            };

            act(() => {
                component.root.findByType('input').props.onChange(event);
            });
        });

        test('the input value is updated correctly', () => {
            expect(component.root.findByType('input').props.value).toBe(
                'The path to the end'
            );
        });

        describe('and when the request button is clicked', () => {
            beforeEach(() => {
                component.root.findByType(RequestButton).props.onClick();
            });

            test('fetchApi is dispatched correctly', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'FETCH_API_MOCK',
                    url: '/api/chapter/49',
                    options: {
                        method: 'PATCH',
                        body: JSON.stringify({
                            heading: 'The path to the end'
                        })
                    },
                    onSuccessCallback: expect.any(Function)
                });
            });

            describe('and when the fetch is complete', () => {
                beforeEach(() => {
                    dispatch.mock.calls[0][0].onSuccessCallback();
                });

                test('the chapter heading is updated', () => {
                    expect(dispatch).toHaveBeenCalledWith({
                        type: 'SET_CHAPTER_HEADING_MOCK',
                        id: 49,
                        heading: 'The path to the end'
                    });
                });
            });
        });
    });
});
