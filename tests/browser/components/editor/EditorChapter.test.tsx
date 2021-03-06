import React from 'react';
import { create } from 'react-test-renderer';
import { EditorChapter } from '@components/editor/EditorChapter';

import { EditorParagraph } from '@components/editor/EditorParagraph';
import { EditChapterHeadingLayer } from '@components/editor/layers/EditChapterHeadingLayer';
import { InsertParagraphLayer } from '@components/editor/layers/InsertParagraphLayer';
import { DeleteChapterLayer } from '@components/editor/layers/DeleteChapterLayer';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

jest.mock('@components/editor/EditorParagraph', () => ({
    EditorParagraph: (props) => <div {...props}>EditorParagraphMock</div>
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
}));

jest.mock('@components/editor/layers/EditChapterHeadingLayer', () => ({
    EditChapterHeadingLayer: (props) => (
        <div {...props}>EditChapterHeadingLayerMock</div>
    )
}));

jest.mock('@components/editor/layers/InsertParagraphLayer', () => ({
    InsertParagraphLayer: (props) => (
        <div {...props}>InsertParagraphLayerMock</div>
    )
}));

jest.mock('@components/editor/layers/DeleteChapterLayer', () => ({
    DeleteChapterLayer: (props) => <div {...props}>DeleteChapterLayerMock</div>
}));

describe('<EditorChapter />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            id: 5,
            number: 3,
            heading: 'Chapter 1',
            paragraphs: [
                {
                    id: 33,
                    numberInChapter: 1,
                    heading: 'The missing key',
                    verses: []
                },
                {
                    id: 34,
                    numberInChapter: 2,
                    heading: 'A secret space',
                    verses: []
                }
            ],
            setTooltipText: jest.fn(),
            setLayerContent: jest.fn(),
            children: [<h1 key="title">Book Title</h1>]
        };
    });

    function renderComponent(options = {}) {
        component = create(<EditorChapter {...props} />, options);
    }

    test('<EditorChapter /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="chapter"
            >
              <span
                className="chapter__closer"
                onClick={[Function]}
              />
              <h1>
                Book Title
              </h1>
              <h2
                className="chapter-heading"
                onClick={[Function]}
              >
                Chapter 1
              </h2>
              <div
                className="paragraph-gap"
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Paragraph einf??gen"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="The missing key"
                id={33}
                numberInChapter={1}
                setLayerContent={[MockFunction]}
                setTooltipText={[MockFunction]}
                verses={Array []}
              >
                EditorParagraphMock
              </div>
              <div
                className="paragraph-gap"
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Paragraph einf??gen"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="A secret space"
                id={34}
                numberInChapter={2}
                setLayerContent={[MockFunction]}
                setTooltipText={[MockFunction]}
                verses={Array []}
              >
                EditorParagraphMock
              </div>
              <div
                className="paragraph-gap"
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Paragraph einf??gen"
              >
                TooltipTriggerDivMock
              </div>
            </div>
        `);
    });

    test('setTooltipText is passed correctly to the paragraphs', () => {
        renderComponent();

        component.root
            .findAllByType(EditorParagraph)
            .forEach((editorParagraph) => {
                props.setTooltipText.mockClear();
                editorParagraph.props.setTooltipText('click here!');

                expect(props.setTooltipText).toHaveBeenCalledWith(
                    'click here!'
                );
            });
    });

    test('setLayerContent is passed correctly to the paragraphs', () => {
        renderComponent();

        component.root
            .findAllByType(EditorParagraph)
            .forEach((editorParagraph) => {
                props.setTooltipText.mockClear();
                editorParagraph.props.setLayerContent(
                    <div>Paragraph Layer</div>
                );

                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <div>Paragraph Layer</div>
                );
            });
    });

    test('setTooltipText is passed correctly to the paragraph gaps', () => {
        renderComponent();

        component.root
            .findAllByProps({ className: 'paragraph-gap' })
            .forEach((tooltipTriggerDiv) => {
                props.setTooltipText.mockClear();
                tooltipTriggerDiv.props.setTooltipText('click here!');

                expect(props.setTooltipText).toHaveBeenCalledWith(
                    'click here!'
                );
            });
    });

    test('setLayerContent is called correctly when the paragraph gaps are clicked', () => {
        renderComponent();

        component.root
            .findAllByType(TooltipTriggerDiv)
            .forEach((tooltipTriggerDiv, index) => {
                props.setTooltipText.mockClear();
                tooltipTriggerDiv.props.onClick();

                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <InsertParagraphLayer chapterId={5} previousParagraphNumber={index} />
                );
            });
    });

    describe('when the heading is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'chapter-heading' })
                .props.onClick();
        });

        test('setLayerContent is called with the correct content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <EditChapterHeadingLayer id={5} heading="Chapter 1" />
            );
        });
    });

    describe('if no heading is given', () => {
        beforeEach(() => {
            props.heading = '';
        });

        test('<EditorChapter /> is rendered correctly with heading placeholder', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="chapter"
                >
                  <span
                    className="chapter__closer"
                    onClick={[Function]}
                  />
                  <h1>
                    Book Title
                  </h1>
                  <div
                    className="book-chapter-heading-placeholder"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Kapitel??berschrift festlegen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    className="paragraph-gap"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Paragraph einf??gen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="The missing key"
                    id={33}
                    numberInChapter={1}
                    setLayerContent={[MockFunction]}
                    setTooltipText={[MockFunction]}
                    verses={Array []}
                  >
                    EditorParagraphMock
                  </div>
                  <div
                    className="paragraph-gap"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Paragraph einf??gen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="A secret space"
                    id={34}
                    numberInChapter={2}
                    setLayerContent={[MockFunction]}
                    setTooltipText={[MockFunction]}
                    verses={Array []}
                  >
                    EditorParagraphMock
                  </div>
                  <div
                    className="paragraph-gap"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Paragraph einf??gen"
                  >
                    TooltipTriggerDivMock
                  </div>
                </div>
            `);
        });

        test('setTooltipText is passed correctly to the chapter heading placeholder', () => {
            renderComponent();

            component.root
                .findByProps({ className: 'book-chapter-heading-placeholder' })
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
                        className: 'book-chapter-heading-placeholder'
                    })
                    .props.onClick();
            });

            test('setLayerContent is called with the correct content', () => {
                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <EditChapterHeadingLayer id={5} heading="" />
                );
            });
        });
    });

    describe('when the chapter closer is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'chapter__closer' })
                .props.onClick();
        });

        test('setLayerContent is called with the correct content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <DeleteChapterLayer
                    id={5}
                    number={3}
                    heading="Chapter 1"
                    paragraphs={[
                        {
                            id: 33,
                            numberInChapter: 1,
                            heading: 'The missing key',
                            verses: []
                        },
                        {
                            id: 34,
                            numberInChapter: 2,
                            heading: 'A secret space',
                            verses: []
                        }
                    ]}
                />
            );
        });
    });
});
