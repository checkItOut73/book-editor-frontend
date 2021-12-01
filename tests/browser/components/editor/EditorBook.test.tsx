import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditorBook } from '@components/editor/EditorBook';

import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorBookChapterBottomNavigation } from '@components/editor/navigation/EditorBookChapterBottomNavigation';
import { Tooltip } from '@components/ui/Tooltip';

jest.mock(
    '@components/editor/navigation/EditorBookChapterTopNavigation',
    () => ({
        EditorBookChapterTopNavigation: (props) => (
            <div {...props}>EditorBookChapterTopNavigationMock</div>
        )
    })
);

jest.mock('@components/editor/EditorBookContent', () => ({
    EditorBookContent: (props) => <div {...props}>EditorBookContentMock</div>
}));

jest.mock(
    '@components/editor/navigation/EditorBookChapterBottomNavigation',
    () => ({
        EditorBookChapterBottomNavigation: (props) => (
            <div {...props}>EditorBookChapterBottomNavigationMock</div>
        )
    })
);

jest.mock('@components/ui/Tooltip', () => ({
    Tooltip: (props) => <div {...props}>TooltipMock</div>
}));

describe('<EditorBook />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            title: 'Book Title',
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
            ]
        };
    });

    function renderComponent() {
        component = create(<EditorBook {...props} />);
    }

    test('<EditorBook /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book book--editor"
            >
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "number": 1,
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "number": 2,
                      "paragraphs": Array [],
                    },
                  ]
                }
                setActiveChapterNumber={[Function]}
                setTooltipText={[Function]}
              >
                EditorBookChapterTopNavigationMock
              </div>
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "number": 1,
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "number": 2,
                      "paragraphs": Array [],
                    },
                  ]
                }
                setTooltipText={[Function]}
                title="Book Title"
              >
                EditorBookContentMock
              </div>
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "number": 1,
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "number": 2,
                      "paragraphs": Array [],
                    },
                  ]
                }
                setActiveChapterNumber={[Function]}
                setTooltipText={[Function]}
              >
                EditorBookChapterBottomNavigationMock
              </div>
              <div
                text=""
              >
                TooltipMock
              </div>
            </div>
        `);
    });

    describe('when activeChapterNumber is changed in the top navigation', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(EditorBookChapterTopNavigation)
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
            const bookContent = component.root.findByType(EditorBookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
        });

        describe('and when activeChapterNumber is changed back in the top navigation', () => {
            beforeEach(() => {
                act(() => {
                    component.root
                        .findByType(EditorBookChapterTopNavigation)
                        .props.setActiveChapterNumber(1);
                });
            });

            test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
                const bookContent =
                    component.root.findByType(EditorBookContent);

                expect(bookContent.props.activeChapterNumber).toBe(1);
            });
        });
    });

    describe('when the bottom navigation is clicked', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(EditorBookChapterBottomNavigation)
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
            const bookContent = component.root.findByType(EditorBookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
        });
    });

    describe('when the setTooltipText callback is called in the <EditorBookContent /> component', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(EditorBookContent)
                    .props.setTooltipText('some tooltip text');
            });
        });

        test('<EditorBook /> renders the tooltip correctly', () => {
            const tooltip = component.root.findByType(Tooltip);

            expect(tooltip.props.text).toBe('some tooltip text');
        });
    });
});
