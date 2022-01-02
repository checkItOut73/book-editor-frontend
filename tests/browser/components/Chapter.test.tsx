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
                    id: 4234,
                    numberInChapter: 1,
                    heading: 'The missing key',
                    verses: []
                },
                {
                    id: 4235,
                    numberInChapter: 2,
                    heading: 'A secret space',
                    verses: []
                }
            ],
            children: [<h1 key="title">Book Title</h1>]
        };
    });

    function renderComponent(options = {}) {
        component = create(<Chapter {...props} />, options);
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
                id={4234}
                numberInChapter={1}
                verses={Array []}
              >
                ParagraphMock
              </div>
              <div
                heading="A secret space"
                id={4235}
                numberInChapter={2}
                verses={Array []}
              >
                ParagraphMock
              </div>
            </div>
        `);
    });

    test('ref is forwarded correctly', (done) => {
        props.ref = React.createRef<HTMLDivElement>();

        function createNodeMock(element) {
            expect(element.type).toBe('div');
            expect(element.props.className).toBe('book-chapter');
            done();
        }

        renderComponent({ createNodeMock });
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
                    id={4234}
                    numberInChapter={1}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                  <div
                    heading="A secret space"
                    id={4235}
                    numberInChapter={2}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                </div>
            `);
        });
    });

    describe('if a classNameModifier is given', () => {
        beforeEach(() => {
            props.classNameModifier = 'lastActive';
        });

        test('<Chapter /> is rendered correctly with classNameModifier', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-chapter book-chapter--lastActive"
                >
                  <h1>
                    Book Title
                  </h1>
                  <h2>
                    Chapter 1
                  </h2>
                  <div
                    heading="The missing key"
                    id={4234}
                    numberInChapter={1}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                  <div
                    heading="A secret space"
                    id={4235}
                    numberInChapter={2}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                </div>
            `);
        });
    });

    describe('if a height prop is given', () => {
        beforeEach(() => {
            props.height = 750;
        });

        test('<Chapter /> is rendered correctly with height', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-chapter"
                  style={
                    Object {
                      "height": "750px",
                    }
                  }
                >
                  <h1>
                    Book Title
                  </h1>
                  <h2>
                    Chapter 1
                  </h2>
                  <div
                    heading="The missing key"
                    id={4234}
                    numberInChapter={1}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                  <div
                    heading="A secret space"
                    id={4235}
                    numberInChapter={2}
                    verses={Array []}
                  >
                    ParagraphMock
                  </div>
                </div>
            `);
        });
    });

    describe('if an onTransitionEnd handler is given', () => {
        beforeEach(() => {
            props.onTransitionEnd = jest.fn();

            renderComponent();
        });

        test('the handler is executed when the "transitionend" event is dispatched correctly', () => {
            expect(props.onTransitionEnd).not.toHaveBeenCalled();

            const event = {};
            component.root.props.onTransitionEnd(event);

            expect(props.onTransitionEnd).toHaveBeenCalledWith(event);
        });
    });
});
