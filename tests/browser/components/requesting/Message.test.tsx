import React from 'react';
import { create, act } from 'react-test-renderer';
import { Message } from '@components/requesting/Message';
import { MessageType } from '@actions/requesting/types/MessageType';
import EventEmitter from 'events';

jest.useFakeTimers();

describe('<Message />', () => {
    let props;
    let component;
    const componentNodeEventEmitter = new EventEmitter();
    let componentNode: {
        clientHeight: HTMLParagraphElement['clientHeight'],
        addEventListener: HTMLParagraphElement['addEventListener'],
        style: Partial<HTMLParagraphElement['style']>
    } = {
        clientHeight: 123,
        addEventListener: jest.fn(
            (eventName, callback: (...args: any) => void) => {
                componentNodeEventEmitter.on(eventName, callback);
            }
        ),
        style: {} as HTMLParagraphElement['style']
    };

    beforeEach(() => {
        props = {
            messageType: MessageType.success,
            message: 'Success!',
            onTransitionEnd: jest.fn()
        };
    });

    afterEach(() => {
        act(() => {
            jest.clearAllTimers();
        });
    });

    function createNodeMock() {
        return componentNode;
    }

    function renderComponent() {
        component = create(<Message {...props} />, { createNodeMock });
    }

    test('<Message /> is rendered correctly', () => {
        act(() => {
            renderComponent();
        });

        expect(component).toMatchInlineSnapshot(`
            <p
              className="message message--success message--collapsed"
            >
              Success!
            </p>
        `);
    });

    describe('after 49ms', () => {
        beforeEach(() => {
            act(() => {
                renderComponent();
            });
            jest.advanceTimersByTime(49);
        });

        test('the height is not set yet', () => {
            expect(componentNode.style.height).toBeUndefined();
        });

        test('the expanded modifier is not set yet', () => {
            expect(component).toMatchInlineSnapshot(`
                <p
                  className="message message--success message--collapsed"
                >
                  Success!
                </p>
            `);
        });

        describe('but after 50ms', () => {
            beforeEach(() => {
                act(() => {
                    jest.advanceTimersByTime(1);
                });
            });

            test('the height is set correctly', () => {
                expect(componentNode.style.height).toBe('123px');
            });

            test('the expanded modifier is set', () => {
                expect(component).toMatchInlineSnapshot(`
                    <p
                      className="message message--success message--expanded"
                    >
                      Success!
                    </p>
                `);
            });

            describe('after another 2999ms', () => {
                beforeEach(() => {
                    act(() => {
                        jest.advanceTimersByTime(2999);
                    });
                });

                test('the transitionend event listener is not set yet', () => {
                    expect(
                        componentNode.addEventListener
                    ).not.toHaveBeenCalled();
                });

                test('the collapsed modifier is not set yet', () => {
                    expect(component).toMatchInlineSnapshot(`
                        <p
                          className="message message--success message--expanded"
                        >
                          Success!
                        </p>
                    `);
                });

                describe('but after 3000ms', () => {
                    beforeEach(() => {
                        act(() => {
                            jest.advanceTimersByTime(1);
                        });
                    });

                    test('the transitionend event listener is set', () => {
                        expect(
                            componentNode.addEventListener
                        ).toHaveBeenCalledWith(
                            'transitionend',
                            expect.any(Function)
                        );
                    });

                    test('the collapsed modifier is set', () => {
                        expect(component).toMatchInlineSnapshot(`
                            <p
                              className="message message--success message--expanded message--collapsed"
                            >
                              Success!
                            </p>
                        `);
                    });

                    test('the onTransitionEnd callback is not called yet', () => {
                        expect(props.onTransitionEnd).not.toHaveBeenCalled();
                    });

                    describe('when the transitionend event is dispatched', () => {
                        beforeEach(() => {
                            act(() => {
                                componentNodeEventEmitter.emit('transitionend');
                            });
                        });

                        test('the class name is reset', () => {
                            expect(component).toMatchInlineSnapshot(`
                                <p
                                  className="message message--success"
                                >
                                  Success!
                                </p>
                            `);
                        });

                        test('the onTransitionEnd callback is called', () => {
                            expect(props.onTransitionEnd).toHaveBeenCalled();
                        });
                    });
                });
            });
        });
    });

    describe('if no message is given', () => {
        beforeEach(() => {
            props.message = '';
        });

        test('<Message /> does not render anything', () => {
            act(() => {
                renderComponent();
            });

            expect(component).toMatchInlineSnapshot(`null`);
        });
    });

    test('when the component unmounts during the first timeout, the state of the unmounted component is not changed', () => {
        act(() => {
            renderComponent();
        });

        const memoizedState = component.root._fiber.memoizedState;

        act(() => {
            component.unmount();
        });
        expect(memoizedState.queue.pending).toBeNull();

        act(() => {
            jest.advanceTimersByTime(50);
        });
        expect(memoizedState.queue.pending).toBeNull();
    });

    test('when the component unmounts during the second timeout, the state of the unmounted component is not changed', () => {
        act(() => {
            renderComponent();
        });

        const memoizedState = component.root._fiber.memoizedState;

        act(() => {
            jest.advanceTimersByTime(50);
        });
        act(() => {
            component.unmount();
        });
        expect(memoizedState.queue.pending).toBeNull();

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(memoizedState.queue.pending).toBeNull();
    });
});
