import React from 'react';
import { create, act } from 'react-test-renderer';
import { Book } from '@components/Book';
import { BookChapterNavigation } from '@components/BookChapterNavigation';
import { BookContent } from '@components/BookContent';

jest.mock('@components/BookChapterNavigation', () => ({
    BookChapterNavigation: (props) => (
        <div {...props}>BookChapterNavigationMock</div>
    )
}));

jest.mock('@components/BookContent', () => ({
    BookContent: (props) => <div {...props}>BookContentMock</div>
}));

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

    function renderComponent() {
        component = create(<Book {...props} />);
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
                setLastActiveChapterNumber={[Function]}
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
            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book"
                >
                  <div
                    activeChapterNumber={2}
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
                    activeChapterNumber={2}
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
                    setLastActiveChapterNumber={[Function]}
                    title="Book Title"
                  >
                    BookContentMock
                  </div>
                  <div
                    activeChapterNumber={2}
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

        describe('and when activeChapterNumber is changed back in the navigation', () => {
            beforeEach(() => {
                act(() => {
                    component.root
                        .findAllByType(BookChapterNavigation)[0]
                        .props.setActiveChapterNumber(1);
                });
            });

            test('<Book /> is rendered with correct activeChapterNumber and lastActiveChapterNumber', () => {
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
                        lastActiveChapterNumber={2}
                        setLastActiveChapterNumber={[Function]}
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
        });
    });

    describe('when the setLastActiveChapterNumber callback is executed in <BookContent>', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(BookContent)
                    .props.setLastActiveChapterNumber(2);
            });
        });

        test('<Book /> is rendered correctly with updated lastActiveChapterNumber', () => {
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
                    lastActiveChapterNumber={2}
                    setLastActiveChapterNumber={[Function]}
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
    });
});
