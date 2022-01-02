import React from 'react';
import { create, act } from 'react-test-renderer';
import { Context } from '@browser/context';
import { DeleteParagraphLayer } from '@components/editor/layers/DeleteParagraphLayer';
import { RequestButton } from '@components/requesting/RequestButton';

jest.mock('@components/Paragraph', () => ({
    Paragraph: (props) => <div {...props}>ParagraphMock</div>
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

jest.mock('@actions/editor/deleteParagraph', () => ({
    deleteParagraph: (id) => ({
        type: 'DELETE_PARAGRAPH_MOCK',
        id
    })
}));

describe('<DeleteParagraphLayer />', () => {
    let props;
    let component;
    let dispatch;

    beforeEach(() => {
        props = {
            id: 34,
            heading: 'The missing key',
            verses: [
                {
                    id: 2930,
                    numberInParagraph: 1,
                    numberInChapter: 5,
                    text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.'
                },
                {
                    id: 2931,
                    numberInParagraph: 2,
                    numberInChapter: 6,
                    text: "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                }
            ]
        };

        dispatch = jest.fn();
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch }}>
                <DeleteParagraphLayer {...props} />
            </Context.Provider>
        );
    }

    test('<DeleteParagraphLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="delete-paragraph-layer"
            >
              <h2>
                Paragraph löschen
              </h2>
              <div
                className="delete-paragraph-layer__paragraph"
              >
                <div
                  heading="The missing key"
                  verses={
                    Array [
                      Object {
                        "id": 2930,
                        "numberInChapter": 5,
                        "numberInParagraph": 1,
                        "text": "In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.",
                      },
                      Object {
                        "id": 2931,
                        "numberInChapter": 6,
                        "numberInParagraph": 2,
                        "text": "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll.",
                      },
                    ]
                  }
                >
                  ParagraphMock
                </div>
              </div>
              <p>
                <div
                  className="delete-paragraph-layer__submit"
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
                url: '/api/paragraph/34',
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

            test('the paragraph is deleted in the store', () => {
                expect(dispatch).toHaveBeenCalledWith({
                    type: 'DELETE_PARAGRAPH_MOCK',
                    id: 34
                });
            });

            test('the submit button is disabled and the label is changed', () => {
                expect(component).toMatchInlineSnapshot(`
                    <div
                      className="delete-paragraph-layer"
                    >
                      <h2>
                        Paragraph löschen
                      </h2>
                      <div
                        className="delete-paragraph-layer__paragraph"
                      >
                        <div
                          heading="The missing key"
                          verses={
                            Array [
                              Object {
                                "id": 2930,
                                "numberInChapter": 5,
                                "numberInParagraph": 1,
                                "text": "In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.",
                              },
                              Object {
                                "id": 2931,
                                "numberInChapter": 6,
                                "numberInParagraph": 2,
                                "text": "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll.",
                              },
                            ]
                          }
                        >
                          ParagraphMock
                        </div>
                      </div>
                      <p>
                        <div
                          className="delete-paragraph-layer__submit"
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
        });
    });
});
