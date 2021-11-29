import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';

describe('<BookChapterNavigationElement />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            chapterNumber: 2,
            setActiveChapterNumber: jest.fn()
        };
    });

    function renderComponent(options = {}) {
        component = create(
            <BookChapterNavigationElement {...props} />,
            options
        );
    }

    test('<BookChapterNavigationElement /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation-element"
              onClick={[Function]}
            >
              2
            </div>
        `);
    });

    describe('when the element is clicked', () => {
        beforeEach(() => {
            const wrapper = shallow(
                <BookChapterNavigationElement {...props} />
            );
            wrapper
                .find('.book-chapter-navigation-element')
                .first()
                .simulate('click');
        });

        test('the setActiveChapterNumber action is called correctly', () => {
            expect(props.setActiveChapterNumber).toHaveBeenCalledWith(2);
        });
    });
});
