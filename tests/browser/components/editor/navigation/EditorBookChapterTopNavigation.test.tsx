import React from 'react';
import { create } from 'react-test-renderer';
import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';

import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';

jest.mock('@components/navigation/BookChapterNavigationElement', () => ({
    BookChapterNavigationElement: (props) => (
        <div data-book-chapter-navigation-element {...props} />
    )
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div data-tooltip-trigger-div {...props} />
}));

describe('<EditorBookChapterTopNavigation />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            chapters: [
                {
                    heading: 'Chapter 1',
                    number: 1,
                    paragraphs: []
                },
                {
                    heading: 'Chapter 2',
                    number: 2,
                    paragraphs: []
                }
            ],
            activeChapterNumber: 2,
            setActiveChapterNumber: jest.fn(),
            setTooltipText: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<EditorBookChapterTopNavigation {...props} />);
    }

    test('<EditorBookChapterTopNavigation /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation"
            >
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                setTooltipText={[MockFunction]}
                tooltipText="insert chapter"
              />
              <div
                chapterNumber={1}
                data-book-chapter-navigation-element={true}
                setActiveChapterNumber={[MockFunction]}
              />
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                setTooltipText={[MockFunction]}
                tooltipText="insert chapter"
              />
              <div
                className="book-chapter-navigation-element book-chapter-navigation-element--active"
              >
                2
              </div>
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                setTooltipText={[MockFunction]}
                tooltipText="insert chapter"
              />
            </div>
        `);
    });

    test('setActiveChapterNumber is passed correctly to the navigation elements', () => {
        renderComponent();

        component.root
            .findAllByType(BookChapterNavigationElement)
            .forEach((navigationElement) => {
                navigationElement.props.setActiveChapterNumber(3);

                expect(props.setActiveChapterNumber).toHaveBeenCalledWith(3);
            });
    });

    test('setTooltipText is passed correctly to the chapter placeholders', () => {
        renderComponent();

        component.root
            .findAllByProps({ className: 'chapter-placeholder' })
            .forEach((tooltipTriggerDiv) => {
                tooltipTriggerDiv.props.setTooltipText('insert chapter');

                expect(props.setTooltipText).toHaveBeenCalledWith('insert chapter');
            });
    });
});
