import React from 'react';
import { create, act } from 'react-test-renderer';
import { BookContent } from '@components/BookContent';

jest.mock('@components/Chapter', () => ({
    Chapter: React.forwardRef((props, ref: any) => (
        <div data-chapter {...props} ref={ref} />
    ))
}));

describe('<BookContent />', () => {
    let props;
    let component;
    let activeChapterRefElement;

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
            activeChapterNumber: 1,
            lastActiveChapterNumber: 1,
            onTransitionEnd: jest.fn()
        };

        activeChapterRefElement = {
            classList: {
                add: jest.fn()
            },
            clientHeight: 850
        };
    });

    function createNodeMock(element) {
        if (element.props.number === props.activeChapterNumber) {
            return activeChapterRefElement;
        }
    }

    function renderComponent() {
        component = create(<BookContent {...props} />, { createNodeMock });
    }

    test('<BookContent /> is rendered correctly with the active chapter', () => {
        act(() => {
            renderComponent();
        });

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-content"
            >
              <div
                data-chapter={true}
                heading="Chapter 1"
                height={850}
                number={1}
                paragraphs={Array []}
              >
                <h1>
                  Book Title
                </h1>
              </div>
            </div>
        `);
    });

    test('the active chapter is faded in', () => {
        act(() => {
            renderComponent();
        });

        expect(activeChapterRefElement.classList.add).toHaveBeenCalledWith('opacity-fade-in');
    });

    describe('If no title is given', () => {
        beforeEach(() => {
            props.title = '';
        });

        test('<BookContent /> is rendered correctly without title', () => {
            act(() => {
                renderComponent();
            });

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-chapter={true}
                    heading="Chapter 1"
                    height={850}
                    number={1}
                    paragraphs={Array []}
                  />
                </div>
            `);
        });
    });

    describe('If the activeChapterNumber is not 1', () => {
        beforeEach(() => {
            props.activeChapterNumber = 2;
            props.lastActiveChapterNumber = 2;
        });

        test('<BookContent /> is rendered correctly without book title', () => {
            act(() => {
                renderComponent();
            });

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-chapter={true}
                    heading="Chapter 2"
                    height={850}
                    number={2}
                    paragraphs={Array []}
                  />
                </div>
            `);
        });
    });

    describe('if the activeChapterNumber has changed', () => {
        beforeEach(() => {
            props.lastActiveChapterNumber = 1;
            props.activeChapterNumber = 2;

            act(() => {
                renderComponent();
            });
        });

        test('<BookContent /> is rendered correctly with active and last active chapter', () => {
            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    classNameModifier="lastActive"
                    data-chapter={true}
                    heading="Chapter 1"
                    height={850}
                    number={1}
                    paragraphs={Array []}
                  >
                    <h1>
                      Book Title
                    </h1>
                  </div>
                  <div
                    data-chapter={true}
                    heading="Chapter 2"
                    number={2}
                    onTransitionEnd={[MockFunction]}
                    paragraphs={Array []}
                  />
                </div>
            `);
        });
    });

    describe('when the "transitionend" event of the new active chapter container is dispatched', () => {
        test('onTransitionEnd is called correctly', () => {
            props.lastActiveChapterNumber = 1;
            props.activeChapterNumber = 2;
            renderComponent();

            expect(props.onTransitionEnd).not.toHaveBeenCalled();

            const eventMock = {};
            component.root
                .findByProps({ number: props.activeChapterNumber })
                .props.onTransitionEnd(eventMock);

            expect(props.onTransitionEnd).toHaveBeenCalledWith(eventMock);
        });
    });
});
