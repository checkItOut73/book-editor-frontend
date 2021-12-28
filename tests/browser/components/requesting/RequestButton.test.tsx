import React from 'react';
import { create } from 'react-test-renderer';
import { RequestButton } from '@components/requesting/RequestButton';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';

describe('<RequestButton />', () => {
    let props;
    let component;
    let dispatch;
    let state;

    beforeEach(() => {
        dispatch = jest.fn();
        state = {
            requesting: {
                requestState: RequestState.IDLE
            }
        };

        props = {
            label: 'Abschicken',
            onClick: jest.fn()
        };
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState: () => state }}>
                <RequestButton {...props} />
            </Context.Provider>
        );
    }

    test('<RequestButton /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <button
              onClick={[MockFunction]}
            >
              Abschicken
            </button>
        `);
    });

    describe('when the request state is PENDING', () => {
        beforeEach(() => {
            state.requesting.requestState = RequestState.PENDING;

            renderComponent();
        });

        test('<RequestButton /> is rendered with loader', () => {
            expect(component).toMatchInlineSnapshot(`
                <button
                  onClick={[MockFunction]}
                >
                  Abschicken
                  <img
                    className="loader"
                    src="/loader.jpg"
                    width="20"
                  />
                </button>
            `);
        });
    });

    describe('when the button is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root.findByType('button').props.onClick();
        });

        test('the onClick callback is called', () => {
            expect(props.onClick).toHaveBeenCalled();
        });
    });
});
