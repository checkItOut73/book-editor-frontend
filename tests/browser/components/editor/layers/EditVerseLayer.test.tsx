import React from 'react';
import { create } from 'react-test-renderer';
import { Context } from '@browser/context';
import { EditVerseLayer } from '@components/editor/layers/EditVerseLayer';
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

jest.mock('@actions/editor/setVerseText', () => ({
    setVerseText: (id, text) => ({
        type: 'SET_VERSE_TEXT_MOCK',
        id,
        text
    })
}));

describe('<EditVerseLayer />', () => {
    let props;
    let component;
    let dispatch;
    let state;
    const getState = () => state;

    beforeEach(() => {
        props = {
            id: 3843,
            text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.',
            numberInChapter: 5
        };

        dispatch = jest.fn();
        state = {};
    });

    function createNodeMock() {
        return {
            value: 'Suddently a bright light flashed up!'
        };
    }

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <EditVerseLayer {...props} />
            </Context.Provider>,
            { createNodeMock }
        );
    }

    test('<EditVerseLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-verse-layer"
            >
              <h2
                className="edit-verse-layer__heading"
              >
                Vers bearbeiten
              </h2>
              <p>
                <textarea
                  className="edit-verse-layer__textarea"
                  defaultValue="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                />
                <span
                  className="textarea-flap"
                >
                  5
                </span>
                <div
                  className="edit-verse-layer__submit"
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

    describe('when the request button is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root.findByType(RequestButton).props.onClick();
        });

        test('fetchApi is dispatched correctly', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'FETCH_API_MOCK',
                url: '/api/verse/3843',
                options: {
                    method: 'PATCH',
                    body: JSON.stringify({
                        text: 'Suddently a bright light flashed up!'
                    })
                },
                onSuccessCallback: expect.any(Function)
            });
        });

        describe('when the fetch is complete', () => {
            beforeEach(() => {
                dispatch.mock.calls[0][0].onSuccessCallback();
            });

            test('the verse text is updated', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'SET_VERSE_TEXT_MOCK',
                    id: 3843,
                    text:
                        'Suddently a bright light flashed up!'
                });
            });
        });
    });
});
