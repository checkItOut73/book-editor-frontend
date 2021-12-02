import React from 'react';
import { create } from 'react-test-renderer';
import { DeleteParagraphLayer } from '@components/editor/layers/DeleteParagraphLayer';

jest.mock('@components/Paragraph', () => ({
    Paragraph: (props) => <div {...props}>ParagraphMock</div>
}));

describe('<DeleteParagraphLayer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            heading: 'The missing key',
            verses: [
                {
                    text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.',
                    numberInChapter: 5
                },
                {
                    text: "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll.",
                    numberInChapter: 6
                }
            ]
        };
    });

    function renderComponent() {
        component = create(<DeleteParagraphLayer {...props} />);
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
                        "numberInChapter": 5,
                        "text": "In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.",
                      },
                      Object {
                        "numberInChapter": 6,
                        "text": "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll.",
                      },
                    ]
                  }
                >
                  ParagraphMock
                </div>
              </div>
              <p>
                <button
                  className="delete-paragraph-layer__submit"
                >
                  Bestätigen
                </button>
              </p>
            </div>
        `);
    });
});
