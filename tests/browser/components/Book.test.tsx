import React, { forwardRef } from 'react';
import { create, act } from 'react-test-renderer';
import { Book } from '@components/Book';
import { BookContent } from '@components/BookContent';
import { BookChapterNavigation } from '@components/BookChapterNavigation';

jest.mock('@components/BookChapterNavigation', () => ({
    BookChapterNavigation: forwardRef((props, ref: any) => (
        <div {...props} ref={ref}>
            BookChapterNavigationMock
        </div>
    ))
}));

jest.mock('@components/BookContent', () => ({
    BookContent: (props) => <div {...props}>BookContentMock</div>
}));

jest.useFakeTimers();

// @ts-ignore
global.window = {
    scrollTo: jest.fn(),
    innerHeight: 500
};
const BOTTOM_NAVIGATION_OFFSET_TOP = 700;

describe('<Book />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            title: 'Book Title',
            chapters: [
                {
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    heading: 'Chapter 2',
                    paragraphs: []
                }
            ]
        };
    });

    function createNodeMock() {
        return {
            offsetTop: BOTTOM_NAVIGATION_OFFSET_TOP
        };
    }

    function renderComponent() {
        component = create(<Book {...props} />, { createNodeMock });
    }

    test('<Book /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book"
            >
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "paragraphs": Array [],
                    },
                  ]
                }
                setActiveChapterNumber={[Function]}
              >
                BookChapterNavigationMock
              </div>
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "paragraphs": Array [],
                    },
                  ]
                }
                lastActiveChapterNumber={1}
                onTransitionEnd={[Function]}
                title="Book Title"
              >
                BookContentMock
              </div>
              <div
                activeChapterNumber={1}
                chapters={
                  Array [
                    Object {
                      "heading": "Chapter 1",
                      "paragraphs": Array [],
                    },
                    Object {
                      "heading": "Chapter 2",
                      "paragraphs": Array [],
                    },
                  ]
                }
                setActiveChapterNumber={[Function]}
              >
                BookChapterNavigationMock
              </div>
            </div>
        `);
    });

    describe('when activeChapterNumber is changed in the navigation', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findAllByType(BookChapterNavigation)[0]
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<Book /> is rendered with correct activeChapterNumber and lastActiveChapterNumber', () => {
            const bookContent = component.root.findByType(BookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
            expect(bookContent.props.lastActiveChapterNumber).toBe(1);
        });

        describe('and when activeChapterNumber is changed back in the navigation', () => {
            beforeEach(() => {
                act(() => {
                    component.root
                        .findAllByType(BookChapterNavigation)[0]
                        .props.setActiveChapterNumber(1);
                });
            });

            test('<Book /> is rendered with correct activeChapterNumber and lastActiveChapterNumber', () => {
                const bookContent = component.root.findByType(BookContent);

                expect(bookContent.props.activeChapterNumber).toBe(1);
                expect(bookContent.props.lastActiveChapterNumber).toBe(2);
            });
        });

        describe('and when the "transitionend" event is dispatched', () => {
            beforeEach(() => {
                act(() => {
                    component.root.findByType(BookContent).props.onTransitionEnd();
                });
            });

            test('<Book /> is rendered with lastActiveChapterNumber set to activeChapterNumber', () => {
                const bookContent = component.root.findByType(BookContent);

                expect(bookContent.props.activeChapterNumber).toBe(2);
                expect(bookContent.props.lastActiveChapterNumber).toBe(2);
            });
        });
    });

    describe('when the bottom navigation is clicked (twice)', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findAllByType(BookChapterNavigation)[1]
                    .props.setActiveChapterNumber(2);

                component.root
                    .findAllByType(BookChapterNavigation)[1]
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<Book /> is rendered with correct activeChapterNumber and lastActiveChapterNumber', () => {
            const bookContent = component.root.findByType(BookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
            expect(bookContent.props.lastActiveChapterNumber).toBe(1);
        });

        test('the scrollbar is fixed to the bottom navigation until the "transitionend" event is dispatched', () => {
            for (let i = 0; i < 3; i++) {
                jest.advanceTimersByTime(19);
                expect(window.scrollTo).not.toHaveBeenCalled();

                jest.advanceTimersByTime(1);
                expect(window.scrollTo).toHaveBeenCalledWith(
                    0,
                    BOTTOM_NAVIGATION_OFFSET_TOP - window.innerHeight + 50
                );

                // @ts-ignore
                window.scrollTo.mockClear();
            }

            act(() => {
                component.root.findByType(BookContent).props.onTransitionEnd();
            });

            jest.advanceTimersByTime(20);
            expect(window.scrollTo).not.toHaveBeenCalled();
        });
    });
});
