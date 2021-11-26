import React from 'react';
import { create } from 'react-test-renderer';
import { BookContent } from '@components/BookContent';

jest.mock('@components/Chapter', () => ({
    Chapter: (props) => <div {...props} data-chapter />
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
            activeChapterNumber: 1,
            lastActiveChapterNumber: 1,
            setLastActiveChapterNumber: jest.fn()
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
              <div
                data-chapter={true}
                heading="Chapter 1"
                number={1}
                onTransitionEnd={[Function]}
                paragraphs={Array []}
              >
                <h1>
                  Book Title
                </h1>
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
                    data-chapter={true}
                    heading="Chapter 1"
                    number={1}
                    onTransitionEnd={[Function]}
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

        test('<BookContent /> is rendered correctly without title', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-chapter={true}
                    heading="Chapter 2"
                    number={2}
                    onTransitionEnd={[Function]}
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

            renderComponent();
        });

        test('<BookContent /> is rendered correctly with active and last active chapter', () => {
            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-chapter={true}
                    heading="Chapter 2"
                    number={2}
                    onTransitionEnd={[Function]}
                    paragraphs={Array []}
                  />
                  <div
                    classNameModifier="lastActive"
                    data-chapter={true}
                    heading="Chapter 1"
                    number={1}
                    onTransitionEnd={[Function]}
                    paragraphs={Array []}
                  >
                    <h1>
                      Book Title
                    </h1>
                  </div>
                </div>
            `);
        });
    });

    describe('when the "transitionend" event of the last active chapter container is dispatched ', () => {
        test('setLastActiveChapterNumber is called with the active chapter number', () => {
            props.activeChapterNumber = 2;
            renderComponent();

            expect(props.setLastActiveChapterNumber).not.toHaveBeenCalled();

            component.root
                .findByProps({ number: props.lastActiveChapterNumber })
                .props.onTransitionEnd();

            expect(props.setLastActiveChapterNumber).toHaveBeenCalledWith(2);
        });
    });
});
