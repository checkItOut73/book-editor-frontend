import React from 'react';
import { create } from 'react-test-renderer';
import { Chapter } from '@components/Chapter';

jest.mock('@components/Paragraph', () => ({
    Paragraph: (props) => <div {...props}>ParagraphMock</div>
}));

describe('<Chapter />', () => {
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
            children: [<h1 key="title">Book Title</h1>]
        };
    });

    function renderComponent() {
        component = create(<Chapter {...props} />);
    }

    test('<Chapter /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter"
            >
              <h1>
                Book Title
              </h1>
              <h2>
                Chapter 1
              </h2>
              <div
                heading="The missing key"
                verses={Array []}
              >
                ParagraphMock
              </div>
              <div
                heading="A secret space"
                verses={Array []}
              >
                ParagraphMock
              </div>
            </div>
        `);
    });

    describe('if no heading is given', () => {
        beforeEach(() => {
            props.heading = '';
        });

        test('<Chapter /> is rendered correctly without heading', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-chapter"
                >
                  <h1>
                    Book Title
                  </h1>
                  <div
                    heading="The missing key"
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                  <div
                    heading="A secret space"
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                </div>
            `);
        });
    });
});