import React from 'react';
import { create } from 'react-test-renderer';
import { BookChapterTopNavigation } from '@components/navigation/BookChapterTopNavigation';

jest.mock('@components/navigation/BookChapterNavigationElement', () => ({
    BookChapterNavigationElement: (props) => (
        <div data-book-chapter-navigation-element {...props} />
    )
}));

describe('<BookChapterTopNavigation />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
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
            activeChapterNumber: 2,
            setActiveChapterNumber: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<BookChapterTopNavigation {...props} />);
    }

    test('<BookChapterTopNavigation /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation"
            >
              <div
                chapterNumber={1}
                data-book-chapter-navigation-element={true}
                setActiveChapterNumber={[MockFunction]}
              />
              <div
                className="book-chapter-navigation-element book-chapter-navigation-element--active"
              >
                2
              </div>
            </div>
        `);
    });

    test('setActiveChapterNumber is passed correctly to the nested component', () => {
        renderComponent();

        component.root
            .findByProps({ 'data-book-chapter-navigation-element': true })
            .props.setActiveChapterNumber(2);

        expect(props.setActiveChapterNumber).toHaveBeenCalledWith(2);
    });
});
