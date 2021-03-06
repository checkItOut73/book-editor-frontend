import React from 'react';
import { create } from 'react-test-renderer';
import { Paragraph } from '@components/Paragraph';

jest.mock('@components/Verse', () => ({
    Verse: (props) => <div {...props}>VerseMock</div>
}));

describe('<Paragraph />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            heading: 'The missing key',
            verses: [
                {
                    id: 934,
                    numberInParagraph: 5,
                    numberInChapter: 12,
                    text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.'
                },
                {
                    id: 935,
                    numberInParagraph: 6,
                    numberInChapter: 13,
                    text: "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                }
            ]
        };
    });

    function renderComponent() {
        component = create(<Paragraph {...props} />);
    }

    test('<Paragraph /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            Array [
              <h2>
                The missing key
              </h2>,
              <p>
                <div
                  id={934}
                  numberInChapter={12}
                  numberInParagraph={5}
                  text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                >
                  VerseMock
                </div>
                 
                <div
                  id={935}
                  numberInChapter={13}
                  numberInParagraph={6}
                  text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                >
                  VerseMock
                </div>
              </p>,
            ]
        `);
    });

    describe('if no heading is given', () => {
        beforeEach(() => {
            props.heading = '';
        });

        test('<Paragraph /> is rendered correctly without heading', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <p>
                  <div
                    id={934}
                    numberInChapter={12}
                    numberInParagraph={5}
                    text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                  >
                    VerseMock
                  </div>
                   
                  <div
                    id={935}
                    numberInChapter={13}
                    numberInParagraph={6}
                    text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                  >
                    VerseMock
                  </div>
                </p>
            `);
        });
    });
});
