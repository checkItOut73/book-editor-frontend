import React from 'react';
import { create, act } from 'react-test-renderer';
import { BookContent } from '@components/BookContent';

jest.mock('@components/Chapter', () => ({
    Chapter: React.forwardRef((props, ref: any) => (
        <div data-chapter {...props} ref={ref} />
    ))
}));

const window: { onresize?: Function } = {};

// @ts-ignore
global.window = window;
jest.useFakeTimers();

describe('<BookContent />', () => {
    let props;
    let component;
    let activeChapterRefElement;

    beforeEach(() => {
        props = {
            title: 'Book Title',
            chapters: [
                {
                    id: 1,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 2,
                    number: 2,
                    heading: 'Chapter 2',
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
                id={1}
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

    test('the height is updated in the component when the window is resized', () => {
        act(() => {
            renderComponent();
        });

        activeChapterRefElement.clientHeight = 777;

        act(() => {
            window.onresize();
        });

        jest.advanceTimersByTime(199);
        expect(
            component.root.findByProps({ heading: 'Chapter 1' }).props.height
        ).toBe(850);

        act(() => {
            jest.advanceTimersByTime(1);
        });

        expect(
            component.root.findByProps({ heading: 'Chapter 1' }).props.height
        ).toBe(777);
    });

    test('the active chapter is faded in', () => {
        act(() => {
            renderComponent();
        });

        expect(activeChapterRefElement.classList.add).toHaveBeenCalledWith(
            'opacity-fade-in'
        );
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
                    id={1}
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
                    id={2}
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
                    id={1}
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
                    id={2}
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
            act(() => {
                renderComponent();
            });

            expect(props.onTransitionEnd).not.toHaveBeenCalled();

            const eventMock = {};
            component.root
                .findByProps({ number: props.activeChapterNumber })
                .props.onTransitionEnd(eventMock);

            expect(props.onTransitionEnd).toHaveBeenCalledWith(eventMock);
        });
    });
});
