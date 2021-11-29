import React from 'react';
import { create, act } from 'react-test-renderer';
import { ActiveBookChapterBottomNavigationElement } from '@components/navigation/ActiveBookChapterBottomNavigationElement';
import smoothScrollOperator from 'smooth-scroll-operator';

jest.mock('smooth-scroll-operator');

// @ts-ignore
global.window = {};

describe('<ActiveBookChapterBottomNavigationElement />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            chapterNumber: 2,
            setActiveChapterNumber: jest.fn()
        };
    });

    function renderComponent() {
        component = create(
            <ActiveBookChapterBottomNavigationElement {...props} />
        );
    }

    function getComponentRootDiv() {
        return component.root.findAllByType('div')[0];
    }

    test('<ActiveBookChapterBottomNavigationElement /> is rendered correctly', () => {
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
                .findByProps({ className: 'book-chapter-navigation-element__scroll-to-top' })
                .props.onClick();
        });

        test('the page is scrolled to the top correctly', () => {
            expect(smoothScrollOperator.scrollY).toHaveBeenCalledWith(
                window,
                0,
                {
                    duration: 2000,
                    easing: [0.43, 0.16, 0.00, 1.00]
                }
            );
        });
    });
});
