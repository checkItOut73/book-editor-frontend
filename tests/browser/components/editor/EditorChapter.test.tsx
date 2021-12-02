import React from 'react';
import { create } from 'react-test-renderer';
import { EditorChapter } from '@components/editor/EditorChapter';

import { EditorParagraph } from '@components/editor/EditorParagraph';
import { EditChapterHeadingLayer } from '@components/editor/layers/EditChapterHeadingLayer';
import { InsertParagraphLayer } from '@components/editor/layers/InsertParagraphLayer';

jest.mock('@components/editor/EditorParagraph', () => ({
    EditorParagraph: (props) => <div {...props}>EditorParagraphMock</div>
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
}));

jest.mock('@components/editor/layers/EditChapterHeadingLayer', () => ({
    EditChapterHeadingLayer: (props) => <div {...props}>EditChapterHeadingLayerMock</div>
}));

jest.mock('@components/editor/layers/InsertParagraphLayer', () => ({
  InsertParagraphLayer: (props) => <div {...props}>InsertParagraphLayerMock</div>
}));

describe('<EditorChapter />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            heading: 'Chapter 1',
            paragraphs: [
                {
                    heading: 'The missing key',
                    verses: []
                },
                {
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
            <div>
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
                tooltipText="Paragraph einfügen"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="The missing key"
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
                tooltipText="Paragraph einfügen"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="A secret space"
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
                tooltipText="Paragraph einfügen"
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
            .findAllByProps({ className: 'paragraph-gap' })
            .forEach((tooltipTriggerDiv) => {
                props.setTooltipText.mockClear();
                tooltipTriggerDiv.props.onClick();

                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <InsertParagraphLayer />
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
                <EditChapterHeadingLayer heading="Chapter 1" />
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
                <div>
                  <h1>
                    Book Title
                  </h1>
                  <div
                    className="book-chapter-heading-placeholder"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Kapitelüberschrift festlegen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    className="paragraph-gap"
                    onClick={[Function]}
                    setTooltipText={[MockFunction]}
                    tooltipText="Paragraph einfügen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="The missing key"
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
                    tooltipText="Paragraph einfügen"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="A secret space"
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
                    tooltipText="Paragraph einfügen"
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
                    .findByProps({ className: 'book-chapter-heading-placeholder' })
                    .props.onClick();
            });

            test('setLayerContent is called with the correct content', () => {
                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <EditChapterHeadingLayer heading="" />
                );
            });
        });
    });
});
