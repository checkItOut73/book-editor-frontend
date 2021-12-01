import React from 'react';
import { create } from 'react-test-renderer';
import { EditorChapter } from '@components/editor/EditorChapter';

jest.mock('@components/editor/EditorParagraph', () => ({
    EditorParagraph: (props) => <div {...props}>EditorParagraphMock</div>
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
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
              >
                Chapter 1
              </h2>
              <div
                className="paragraph-gap"
                setTooltipText={[MockFunction]}
                tooltipText="insert paragraph"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="The missing key"
                setTooltipText={[MockFunction]}
                verses={Array []}
              >
                EditorParagraphMock
              </div>
              <div
                className="paragraph-gap"
                setTooltipText={[MockFunction]}
                tooltipText="insert paragraph"
              >
                TooltipTriggerDivMock
              </div>
              <div
                heading="A secret space"
                setTooltipText={[MockFunction]}
                verses={Array []}
              >
                EditorParagraphMock
              </div>
              <div
                className="paragraph-gap"
                setTooltipText={[MockFunction]}
                tooltipText="insert paragraph"
              >
                TooltipTriggerDivMock
              </div>
            </div>
        `);
    });

    test('setTooltipText is passed correctly to the paragraph gaps', () => {
        renderComponent();

        component.root
            .findAllByProps({ className: 'paragraph-gap' })
            .forEach((tooltipTriggerDiv) => {
                props.setTooltipText.mockClear();
                tooltipTriggerDiv.props.setTooltipText('click here!');

                expect(props.setTooltipText).toHaveBeenCalledWith('click here!');
            });
    })

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
                    setTooltipText={[MockFunction]}
                    tooltipText="set chapter heading"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    className="paragraph-gap"
                    setTooltipText={[MockFunction]}
                    tooltipText="insert paragraph"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="The missing key"
                    setTooltipText={[MockFunction]}
                    verses={Array []}
                  >
                    EditorParagraphMock
                  </div>
                  <div
                    className="paragraph-gap"
                    setTooltipText={[MockFunction]}
                    tooltipText="insert paragraph"
                  >
                    TooltipTriggerDivMock
                  </div>
                  <div
                    heading="A secret space"
                    setTooltipText={[MockFunction]}
                    verses={Array []}
                  >
                    EditorParagraphMock
                  </div>
                  <div
                    className="paragraph-gap"
                    setTooltipText={[MockFunction]}
                    tooltipText="insert paragraph"
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

            expect(props.setTooltipText).toHaveBeenCalledWith('set chapter heading');
        });
    });
});
