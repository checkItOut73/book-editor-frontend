import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { BookChapterNavigation } from '@components/BookChapterNavigation';

describe('<BookChapterNavigation />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
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
            activeChapterNumber: 2,
            setActiveChapterNumber: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<BookChapterNavigation
          {...props}
        />);
    }

    test('<BookChapterNavigation /> is rendered correctly with the active chapter number', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation"
            >
              <div
                className="book-chapter-navigation__element"
                onClick={[Function]}
              >
                1
              </div>
              <div
                className="book-chapter-navigation__element book-chapter-navigation__element--active"
                onClick={[Function]}
              >
                2
              </div>
            </div>
        `);
    });

    describe('when a navigation element is clicked', () => {
        beforeEach(() => {
            const wrapper = shallow(<BookChapterNavigation {...props} />)
            wrapper
                .find('.book-chapter-navigation__element')
                .first()
                .simulate('click');
        });

        test('the setActiveChapterNumber action is called correctly', () => {
            expect(props.setActiveChapterNumber).toHaveBeenCalledWith(1);
        });
    });
});
