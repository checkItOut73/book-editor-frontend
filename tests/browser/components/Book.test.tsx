import React from 'react';
import { create } from 'react-test-renderer';
import { Book } from '@components/Book';

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
