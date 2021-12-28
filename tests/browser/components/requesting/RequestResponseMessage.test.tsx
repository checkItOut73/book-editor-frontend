import React from 'react';
import { create } from 'react-test-renderer';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';
import { MessageType } from '@actions/requesting/types/MessageType';

jest.mock('@components/requesting/Message', () => ({
    Message: (props) => <div data-message {...props} />
}));

jest.mock('@actions/requesting/clearRequest', () => ({
    clearRequest: () => ({
        type: 'CLEAR_REQUEST'
    })
}));

describe('<RequestResponseMessage />', () => {
    let component;
    let dispatch;
    let state;

    beforeEach(() => {
        dispatch = jest.fn();
        state = {
            requesting: {
                requestState: RequestState.IDLE,
                message: ''
            }
        };
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState: () => state }}>
                <RequestReponseMessage />
            </Context.Provider>
        );
    }

    test('<RequestReponseMessage /> is not rendered if requestState is IDLE', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`null`);
    });

    describe('if the requestState is ERROR', () => {
        beforeEach(() => {
            state.requesting.requestState = RequestState.ERROR;
            state.requesting.message = 'Something went wrong...';
        });

        test('<RequestReponseMessage /> is not rendered correctly', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  data-message={true}
                  message="Something went wrong..."
                  messageType="error"
                  onTransitionEnd={[Function]}
                />
            `);
        });

        test('the clearRequest action is dispatched when the "transitionend" event is dispatched', () => {
            renderComponent();

            expect(dispatch).not.toHaveBeenCalled();

            component.root.findByProps({ messageType: MessageType.error }).props.onTransitionEnd();
            expect(dispatch).toHaveBeenCalledWith({
                type: 'CLEAR_REQUEST'
            });
        });
    });

    describe('if the requestState is SUCCESS', () => {
        beforeEach(() => {
            state.requesting.requestState = RequestState.SUCCESS;
            state.requesting.message = 'Success!';
        });

        test('<RequestReponseMessage /> is not rendered correctly', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  data-message={true}
                  message="Success!"
                  messageType="success"
                  onTransitionEnd={[Function]}
                />
            `);
        });

        test('the clearRequest action is dispatched when the "transitionend" event is dispatched', () => {
            renderComponent();

            expect(dispatch).not.toHaveBeenCalled();

            component.root.findByProps({ messageType: MessageType.success }).props.onTransitionEnd();
            expect(dispatch).toHaveBeenCalledWith({
                type: 'CLEAR_REQUEST'
            });
        });
    });
});
