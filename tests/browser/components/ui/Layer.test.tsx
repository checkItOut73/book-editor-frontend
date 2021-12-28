import React from 'react';
import { create } from 'react-test-renderer';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';
import { Layer } from '@components/ui/Layer';

jest.mock('@actions/requesting/clearRequest', () => ({
    clearRequest: () => ({
        type: 'CLEAR_REQUEST'
    })
}));

describe('<Layer />', () => {
    let props;
    let component;
    let dispatch;
    let state;

    beforeEach(() => {
        props = {
            layerContent: <h1>Overview</h1>,
            setLayerContent: jest.fn()
        };
        dispatch = jest.fn();
        state = {
            requesting: {
                requestState: RequestState.IDLE
            }
        };
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState: () => state }}>
                <Layer {...props} />
            </Context.Provider>
        );
    }

    test('<Layer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="layer"
            >
              <div
                className="layer__overlay"
              />
              <div
                className="layer__content-container"
              >
                <div
                  className="layer__content"
                >
                  <h1>
                    Overview
                  </h1>
                </div>
                <span
                  className="layer__closer"
                  onClick={[Function]}
                >
                  x
                </span>
              </div>
            </div>
        `);
    });

    describe('if no layer content is given', () => {
        beforeEach(() => {
            props.layerContent = null;
        });

        test('<Layer /> does not render anything', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`null`);
        });
    });

    describe('when the layer closer is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'layer__closer' })
                .props.onClick();
        });

        test('the CLEAR_REQUEST action is called', () => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'CLEAR_REQUEST'
            })
        });

        test('setLayerContent is called with null', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(null);
        });
    });

    describe('but when the request state is PENDING', () => {
        beforeEach(() => {
            state.requesting.requestState = RequestState.PENDING;
        });

        describe('and the layer closer is clicked', () => {
            beforeEach(() => {
                renderComponent();

                component.root
                    .findByProps({ className: 'layer__closer' })
                    .props.onClick();
            });

            test('no dispatch is triggered', () => {
                expect(dispatch).not.toHaveBeenCalled();
            });

            test('setLayerContent is not called', () => {
                expect(props.setLayerContent).not.toHaveBeenCalled();
            });
        });
    });
});
