import React from 'react';
import { create, act } from 'react-test-renderer';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

describe('<TooltipTriggerDiv />', () => {
    let props;
    let component;

    beforeAll(() => {
        props = {
            className: 'some-class',
            tooltipText: 'some tooltip text',
            setTooltipText: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<TooltipTriggerDiv {...props} />);
    }

    test('<TooltipTriggerDiv /> is rendered correctly', () => {
        act(() => {
            renderComponent();
        });

        expect(component).toMatchInlineSnapshot(`
            <div
              className="some-class"
              onMouseEnter={[Function]}
              onMouseLeave={[Function]}
            />
        `);
    });

    describe('when the mouse enters the tooltip', () => {
        beforeEach(() => {
            act(() => {
                renderComponent();
            });

            component.root.findByType('div').props.onMouseEnter();
        });

        test('setTooltipText is called with the given tooltipText', () => {
            expect(props.setTooltipText).toHaveBeenCalledWith(
                props.tooltipText
            );
        });
    });

    describe('when the mouse leaves the tooltip', () => {
        beforeEach(() => {
            act(() => {
                renderComponent();
            });

            component.root.findByType('div').props.onMouseLeave();
        });

        test('setTooltipText is called with an empty string', () => {
            expect(props.setTooltipText).toHaveBeenCalledWith('');
        });
    });

    describe('if a custom tagName is given', () => {
        beforeEach(() => {
            props.tagName = 'span';
        });

        test('<TooltipTriggerDiv /> is rendered correctly with the given tagName', () => {
            act(() => {
                renderComponent();
            });

            expect(component).toMatchInlineSnapshot(`
                <span
                  className="some-class"
                  onMouseEnter={[Function]}
                  onMouseLeave={[Function]}
                />
            `);
        });
    });
});
