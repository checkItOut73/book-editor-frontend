import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditorActiveBookChapterBottomNavigationElement } from '@components/editor/navigation/EditorActiveBookChapterBottomNavigationElement';

// @ts-ignore
global.window = {
    scrollTo: jest.fn()
};

describe('<EditorActiveBookChapterBottomNavigationElement />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            chapterNumber: 2
        };
    });

    function renderComponent() {
        component = create(
            <EditorActiveBookChapterBottomNavigationElement {...props} />
        );
    }

    function getComponentRootDiv() {
        return component.root.findAllByType('div')[0];
    }

    test('<EditorActiveBookChapterBottomNavigationElement /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation-element book-chapter-navigation-element--active"
              onMouseOut={[Function]}
              onMouseOver={[Function]}
            >
              <span
                className="book-chapter-navigation-element__content"
              >
                2
              </span>
              <div
                className="book-chapter-navigation-element__scroll-to-top"
                onClick={[Function]}
              >
                ↑
              </div>
            </div>
        `);
    });

    describe('when the mouse enters the element', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                getComponentRootDiv().props.onMouseOver();
            });
        });

        test('the hovered modifier is set', () => {
            expect(getComponentRootDiv().props.className).toBe(
                'book-chapter-navigation-element book-chapter-navigation-element--active book-chapter-navigation-element--hovered'
            );
        });

        describe('and when the mouse leaves the element after that', () => {
            beforeEach(() => {
                act(() => {
                    getComponentRootDiv().props.onMouseOut();
                });
            });

            test('the hovered modifier is removed', () => {
                expect(getComponentRootDiv().props.className).toBe(
                    'book-chapter-navigation-element book-chapter-navigation-element--active'
                );
            });
        });
    });

    describe('when the scroll to top element is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({
                    className: 'book-chapter-navigation-element__scroll-to-top'
                })
                .props.onClick();
        });

        test('the page is scrolled to the top', () => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
    });
});
