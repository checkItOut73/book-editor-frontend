import React from 'react';
import { create } from 'react-test-renderer';
import { BookChapterBottomNavigation } from '@components/navigation/BookChapterBottomNavigation';

jest.mock(
    '@components/navigation/ActiveBookChapterBottomNavigationElement',
    () => ({
        ActiveBookChapterBottomNavigationElement: (props) => (
            <div
                data-active-book-chapter-bottom-navigation-element
                {...props}
            />
        )
    })
);

jest.mock('@components/navigation/BookChapterNavigationElement', () => ({
    BookChapterNavigationElement: (props) => (
        <div data-book-chapter-navigation-element {...props} />
    )
}));

describe('<BookChapterBottomNavigation />', () => {
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

    function renderComponent(options = {}) {
        component = create(<BookChapterBottomNavigation {...props} />, options);
    }

    test('<BookChapterBottomNavigation /> is rendered correctly', () => {
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
                chapterNumber={2}
                data-active-book-chapter-bottom-navigation-element={true}
              />
            </div>
        `);
    });

    test('ref is forwarded correctly', (done) => {
        props.ref = React.createRef<HTMLDivElement>();

        function createNodeMock(element) {
            expect(element.type).toBe('div');
            expect(element.props.className).toBe('book-chapter-navigation');
            done();
        }

        renderComponent({ createNodeMock });
    });

    test('setActiveChapterNumber is passed correctly to the nested component', () => {
        renderComponent();

        component.root
            .findByProps({ 'data-book-chapter-navigation-element': true })
            .props.setActiveChapterNumber(2);

        expect(props.setActiveChapterNumber).toHaveBeenCalledWith(2);
    });
});
