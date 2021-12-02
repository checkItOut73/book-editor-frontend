import React from 'react';
import { create, act } from 'react-test-renderer';
import { Tooltip } from '@components/ui/Tooltip';

const EventEmitter = require('events');
const windowEventEmitter = new EventEmitter();

describe('<Tooltip />', () => {
    const tooltipElement = {
        style: {
            display: '',
            left: 0,
            top: 0
        }
    };
    let props;
    let component;

    beforeAll(() => {
        global.window = {
            addEventListener:
                windowEventEmitter.addListener.bind(windowEventEmitter),
            removeEventListener:
                windowEventEmitter.removeListener.bind(windowEventEmitter),
            scrollX: 50,
            scrollY: 1000
        } as Window & typeof globalThis;
    });

    beforeEach(() => {
        props = {
            text: ''
        };
    });

    function createNodeMock() {
        return tooltipElement;
    }

    function renderComponent() {
        component = create(<Tooltip {...props} />, { createNodeMock });
    }

    test('<Tooltip /> is rendered correctly without a text', () => {
        act(() => {
            renderComponent();
        });

        expect(component).toMatchInlineSnapshot(`
            <div
              className="tooltip"
            >
              
            </div>
        `);
    });

    describe('if the tooltip is rendered with a text', () => {
        beforeEach(() => {
            props.text = 'tooltip message';
        });

        test('the tooltip is displayed', () => {
            act(() => {
                renderComponent();
            });

            expect(tooltipElement.style.display).toBe('block');
        });

        test('the tooltip is fixed to the mouse', () => {
            act(() => {
                renderComponent();
            });

            windowEventEmitter.emit('mousemove', {
                clientX: 150,
                clientY: 90
            });
            expect(tooltipElement.style.left).toBe('207px');
            expect(tooltipElement.style.top).toBe('1093px');

            windowEventEmitter.emit('mousemove', {
                clientX: 155,
                clientY: 95
            });
            expect(tooltipElement.style.left).toBe('212px');
            expect(tooltipElement.style.top).toBe('1098px');
        });

        describe('and when the tooltip is rendered without a text after that', () => {
            beforeEach(() => {
                props.text = '';
            });

            test('the tooltip is not displayed', () => {
                act(() => {
                    renderComponent();
                });

                expect(tooltipElement.style.display).toBe('none');
            });

            test('the tooltip is not fixed to the mouse', () => {
                act(() => {
                    renderComponent();
                });

                windowEventEmitter.emit('mousemove', {
                    clientX: 160,
                    clientY: 100
                });
                expect(tooltipElement.style.left).not.toBe('218px');
                expect(tooltipElement.style.top).not.toBe('1088px');
            });
        });
    });
});
