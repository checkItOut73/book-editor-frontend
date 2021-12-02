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
            setTooltipText: jest.fn(),
            onClick: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<TooltipTriggerDiv {...props} />);
    }

    test('<TooltipTriggerDiv /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="some-class"
              onClick={[MockFunction]}
              onMouseEnter={[Function]}
              onMouseLeave={[Function]}
            />
        `);
    });

    describe('when the mouse enters the tooltip', () => {
        beforeEach(() => {
            renderComponent();

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
            renderComponent();

            component.root.findByType('div').props.onMouseLeave();
        });

        test('setTooltipText is called with an empty string', () => {
            expect(props.setTooltipText).toHaveBeenCalledWith('');
        });
    });

    describe('when the trigger div is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root.findByType('div').props.onClick();
        });

        test('the onClick callback is called correctly', () => {
            expect(props.onClick).toHaveBeenCalled();
        });
    });

    describe('if a custom tagName is given', () => {
        beforeEach(() => {
            props.tagName = 'span';
        });

        test('<TooltipTriggerDiv /> is rendered correctly with the given tagName', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <span
                  className="some-class"
                  onClick={[MockFunction]}
                  onMouseEnter={[Function]}
                  onMouseLeave={[Function]}
                />
            `);
        });
    });
});
