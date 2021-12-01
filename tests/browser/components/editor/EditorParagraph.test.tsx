import React from 'react';
import { create } from 'react-test-renderer';
import { EditorParagraph } from '@components/editor/EditorParagraph';

jest.mock('@components/editor/EditorVerse', () => ({
    EditorVerse: (props) => <div {...props}>EditorVerseMock</div>
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
}));

describe('<EditorParagraph />', () => {
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
            ],
            setTooltipText: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<EditorParagraph {...props} />);
    }

    test('<EditorParagraph /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            Array [
              <h2
                className="paragraph-heading"
              >
                The missing key
              </h2>,
              <p
                className="paragraph"
              >
                <div
                  className="verse-placeholder"
                  setTooltipText={[MockFunction]}
                  tagName="span"
                  tooltipText="insert verse"
                >
                  TooltipTriggerDivMock
                </div>
                <div
                  numberInChapter={5}
                  text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                >
                  EditorVerseMock
                </div>
                <div
                  className="verse-gap"
                  setTooltipText={[MockFunction]}
                  tagName="span"
                  tooltipText="insert verse"
                >
                  TooltipTriggerDivMock
                </div>
                <div
                  numberInChapter={6}
                  text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                >
                  EditorVerseMock
                </div>
                <div
                  className="verse-placeholder"
                  setTooltipText={[MockFunction]}
                  tagName="span"
                  tooltipText="insert verse"
                >
                  TooltipTriggerDivMock
                </div>
              </p>,
            ]
        `);
    });

    test('setTooltipText is passed correctly to the verse gaps', () => {
      renderComponent();

      component.root
          .findAllByProps({ className: 'verse-gap' })
          .forEach((tooltipTriggerDiv) => {
              props.setTooltipText.mockClear();
              tooltipTriggerDiv.props.setTooltipText('insert verse');

              expect(props.setTooltipText).toHaveBeenCalledWith('insert verse');
          });
    });

    test('setTooltipText is passed correctly to the verse placeholders', () => {
      renderComponent();

      component.root
          .findAllByProps({ className: 'verse-placeholder' })
          .forEach((tooltipTriggerDiv) => {
              props.setTooltipText.mockClear();
              tooltipTriggerDiv.props.setTooltipText('insert verse');

              expect(props.setTooltipText).toHaveBeenCalledWith('insert verse');
          });
    });

    describe('if no heading is given', () => {
        beforeEach(() => {
            props.heading = '';
        });

        test('<EditorParagraph /> is rendered correctly with heading placeholder', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                Array [
                  <div
                    className="book-paragraph-heading-placeholder"
                    setTooltipText={[MockFunction]}
                    tooltipText="set paragraph heading"
                  >
                    TooltipTriggerDivMock
                  </div>,
                  <p
                    className="paragraph"
                  >
                    <div
                      className="verse-placeholder"
                      setTooltipText={[MockFunction]}
                      tagName="span"
                      tooltipText="insert verse"
                    >
                      TooltipTriggerDivMock
                    </div>
                    <div
                      numberInChapter={5}
                      text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                    >
                      EditorVerseMock
                    </div>
                    <div
                      className="verse-gap"
                      setTooltipText={[MockFunction]}
                      tagName="span"
                      tooltipText="insert verse"
                    >
                      TooltipTriggerDivMock
                    </div>
                    <div
                      numberInChapter={6}
                      text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                    >
                      EditorVerseMock
                    </div>
                    <div
                      className="verse-placeholder"
                      setTooltipText={[MockFunction]}
                      tagName="span"
                      tooltipText="insert verse"
                    >
                      TooltipTriggerDivMock
                    </div>
                  </p>,
                ]
            `);
        });

        test('setTooltipText is passed correctly to the heading placeholder', () => {
            renderComponent();

            component.root
                .findByProps({ className: 'book-paragraph-heading-placeholder' })
                .props.setTooltipText('set chapter heading');

            expect(props.setTooltipText).toHaveBeenCalledWith('set chapter heading');
        });
    });
});
