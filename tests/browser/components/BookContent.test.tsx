import React from 'react';
import { create } from 'react-test-renderer';
import { BookContent } from '@components/BookContent';

jest.mock('@components/Chapter', () => ({
    Chapter: (props) => <div {...props}>ChapterMock</div>
}));

describe('<BookContent />', () => {
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
            ],
            activeChapterNumber: 1
        };
    });

    function renderComponent() {
        component = create(<BookContent {...props} />);
    }

    test('<BookContent /> is rendered correctly with the active chapter', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-content"
            >
              <h1>
                Book Title
              </h1>
              <div
                heading="Chapter 1"
                number={1}
                paragraphs={Array []}
              >
                ChapterMock
              </div>
            </div>
        `);
    });

    describe('If no title is given', () => {
        beforeEach(() => {
            props.title = '';
        });

        test('<BookContent /> is rendered correctly without title', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    heading="Chapter 1"
                    number={1}
                    paragraphs={Array []}
                  >
                    ChapterMock
                  </div>
                </div>
            `);
        });
    });

    describe('If the activeChapterNumber is not 1', () => {
        beforeEach(() => {
            props.activeChapterNumber = 2;
        });

        test('<BookContent /> is rendered correctly without title', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    heading="Chapter 2"
                    number={2}
                    paragraphs={Array []}
                  >
                    ChapterMock
                  </div>
                </div>
            `);
        });
    });
});
