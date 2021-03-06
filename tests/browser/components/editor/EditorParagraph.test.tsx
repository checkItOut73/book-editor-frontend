import React from 'react';
import { create } from 'react-test-renderer';
import { EditorParagraph } from '@components/editor/EditorParagraph';

import { EditorVerse } from '@components/editor/EditorVerse';
import { InsertVerseLayer } from '@components/editor/layers/InsertVerseLayer';
import { DeleteParagraphLayer } from '@components/editor/layers/DeleteParagraphLayer';
import { EditParagraphHeadingLayer } from '@components/editor/layers/EditParagraphHeadingLayer';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

jest.mock('@components/editor/EditorVerse', () => ({
    EditorVerse: (props) => <div {...props}>EditorVerseMock</div>
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
}));

jest.mock('@components/editor/layers/InsertVerseLayer', () => ({
    InsertVerseLayer: (props) => <div {...props}>InsertVerseLayerMock</div>
}));

jest.mock('@components/editor/layers/DeleteParagraphLayer', () => ({
    DeleteParagraphLayer: (props) => (
        <div {...props}>DeleteParagraphLayerMock</div>
    )
}));

jest.mock('@components/editor/layers/EditParagraphHeadingLayer', () => ({
    EditParagraphHeadingLayer: (props) => (
        <div {...props}>EditParagraphHeadingLayerMock</div>
    )
}));

describe('<EditorParagraph />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            id: 33,
            heading: 'The missing key',
            verses: [
                {
                    id: 192,
                    numberInParagraph: 1,
                    numberInChapter: 5,
                    text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.'
                },
                {
                    id: 193,
                    numberInParagraph: 2,
                    numberInChapter: 6,
                    text: "Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                }
            ],
            setTooltipText: jest.fn(),
            setLayerContent: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<EditorParagraph {...props} />);
    }

    test('<EditorParagraph /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="paragraph-container"
            >
              <h2
                className="paragraph-heading"
                onClick={[Function]}
              >
                The missing key
              </h2>
              <p
                className="paragraph"
              >
                <span
                  className="paragraph__closer"
                  onClick={[Function]}
                />
                <div
                  className="verse-placeholder"
                  onClick={[Function]}
                  setTooltipText={[MockFunction]}
                  tagName="strong"
                  tooltipText="Vers einf??gen"
                >
                  TooltipTriggerDivMock
                </div>
                <div
                  id={192}
                  numberInChapter={5}
                  numberInParagraph={1}
                  setLayerContent={[MockFunction]}
                  text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                >
                  EditorVerseMock
                </div>
                <div
                  className="verse-gap"
                  onClick={[Function]}
                  setTooltipText={[MockFunction]}
                  tagName="span"
                  tooltipText="Vers einf??gen"
                >
                  TooltipTriggerDivMock
                </div>
                <div
                  id={193}
                  numberInChapter={6}
                  numberInParagraph={2}
                  setLayerContent={[MockFunction]}
                  text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                >
                  EditorVerseMock
                </div>
                <div
                  className="verse-placeholder"
                  onClick={[Function]}
                  setTooltipText={[MockFunction]}
                  tagName="strong"
                  tooltipText="Vers einf??gen"
                >
                  TooltipTriggerDivMock
                </div>
              </p>
            </div>
        `);
    });

    describe('if no verses are given', () => {
        beforeEach(() => {
            props.verses = [];
        });

        test('<EditorParagraph /> is rendered correctly with only one "insert verse" tooltip trigger div', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="paragraph-container"
                >
                  <h2
                    className="paragraph-heading"
                    onClick={[Function]}
                  >
                    The missing key
                  </h2>
                  <p
                    className="paragraph"
                  >
                    <span
                      className="paragraph__closer"
                      onClick={[Function]}
                    />
                    <div
                      className="verse-placeholder"
                      onClick={[Function]}
                      setTooltipText={[MockFunction]}
                      tagName="strong"
                      tooltipText="Vers einf??gen"
                    >
                      TooltipTriggerDivMock
                    </div>
                  </p>
                </div>
            `);
        });
    });

    describe('when the paragraph closer is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'paragraph__closer' })
                .props.onClick();
        });

        test('setLayerContent is called with the correct layer content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <DeleteParagraphLayer
                    id={props.id}
                    heading={props.heading}
                    verses={props.verses}
                />
            );
        });
    });

    describe('verse placeholders and gaps | ', () => {
        test('setTooltipText is passed correctly to the verse placeholders and gaps', () => {
            renderComponent();

            component.root
                .findAllByType(TooltipTriggerDiv)
                .forEach((tooltipTriggerDiv) => {
                    props.setTooltipText.mockClear();
                    tooltipTriggerDiv.props.setTooltipText('insert verse');

                    expect(props.setTooltipText).toHaveBeenCalledWith(
                        'insert verse'
                    );
                });
        });

        test('setLayerContent is called correctly when the verse placeholders and gaps are clicked', () => {
            renderComponent();

            component.root
                .findAllByType(TooltipTriggerDiv)
                .forEach((tooltipTriggerDiv, index) => {
                    props.setTooltipText.mockClear();
                    tooltipTriggerDiv.props.onClick();

                    expect(props.setLayerContent).toHaveBeenCalledWith(
                        <InsertVerseLayer paragraphId={33} previousVerseNumber={index} />
                    );
                });
        });
    });

    test('setLayerContent is passed correctly to the verses', () => {
        renderComponent();

        component.root.findAllByType(EditorVerse).forEach((verse) => {
            props.setTooltipText.mockClear();
            verse.props.setLayerContent(<div>Verse Layer</div>);

            expect(props.setLayerContent).toHaveBeenCalledWith(
                <div>Verse Layer</div>
            );
        });
    });

    describe('when the heading is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'paragraph-heading' })
                .props.onClick();
        });

        test('setLayerContent is called with the correct content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <EditParagraphHeadingLayer id={33} heading="The missing key" />
            );
        });
    });

    describe('if no heading is given', () => {
        beforeEach(() => {
            props.heading = '';
        });

        test('<EditorParagraph /> is rendered correctly with heading placeholder', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="paragraph-container"
                >
                  <div
                    className="book-paragraph-heading-placeholder"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Paragraph??berschrift festlegen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <p
                    className="paragraph"
                  >
                    <span
                      className="paragraph__closer"
                      onClick={[Function]}
                    />
                    <div
                      className="verse-placeholder"
                      onClick={[Function]}
                      setTooltipText={[MockFunction]}
                      tagName="strong"
                      tooltipText="Vers einf??gen"
                    >
                      TooltipTriggerDivMock
                    </div>
                    <div
                      id={192}
                      numberInChapter={5}
                      numberInParagraph={1}
                      setLayerContent={[MockFunction]}
                      text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                    >
                      EditorVerseMock
                    </div>
                    <div
                      className="verse-gap"
                      onClick={[Function]}
                      setTooltipText={[MockFunction]}
                      tagName="span"
                      tooltipText="Vers einf??gen"
                    >
                      TooltipTriggerDivMock
                    </div>
                    <div
                      id={193}
                      numberInChapter={6}
                      numberInParagraph={2}
                      setLayerContent={[MockFunction]}
                      text="Hero is a student of the terrifying Madame Zero at the Scuola di Musica, where his fellow students include the aristocratic Count Telefino, an unscrupulous telephone-head who is planning a campaign of dirty tricks to help him win the school's graduation prize, the Abacus Scroll."
                    >
                      EditorVerseMock
                    </div>
                    <div
                      className="verse-placeholder"
                      onClick={[Function]}
                      setTooltipText={[MockFunction]}
                      tagName="strong"
                      tooltipText="Vers einf??gen"
                    >
                      TooltipTriggerDivMock
                    </div>
                  </p>
                </div>
            `);
        });

        test('setTooltipText is passed correctly to the heading placeholder', () => {
            renderComponent();

            component.root
                .findByProps({
                    className: 'book-paragraph-heading-placeholder'
                })
                .props.setTooltipText('set chapter heading');

            expect(props.setTooltipText).toHaveBeenCalledWith(
                'set chapter heading'
            );
        });

        describe('when the heading placeholder is clicked', () => {
            beforeEach(() => {
                renderComponent();

                component.root
                    .findByProps({
                        className: 'book-paragraph-heading-placeholder'
                    })
                    .props.onClick();
            });

            test('setLayerContent is called with the correct content', () => {
                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <EditParagraphHeadingLayer id={33} heading="" />
                );
            });
        });
    });
});
