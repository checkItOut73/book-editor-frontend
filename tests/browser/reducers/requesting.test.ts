import { requesting } from '@browser/reducers/requesting';
import { RequestState } from '@actions/requesting/types/RequestState';
import { ActionType } from '@actions/ActionType';

describe('requesting | ', () => {
    test('requesting reducer returns correct default state', () => {
        expect(requesting()).toEqual({
            requestState: RequestState.IDLE,
            message: ''
        });
    });

    test('requesting reducer sets request result correctly', () => {
        const state = {
            requestState: RequestState.IDLE,
            message: ''
        };

        const action = {
            type: ActionType.SET_REQUEST_RESULT,
            requestState: RequestState.ERROR,
            message: 'something went wrong...'
        };

        expect(requesting(state, action)).toEqual({
            requestState: RequestState.ERROR,
            message: 'something went wrong...'
        });
    });

    test('requesting reducer sets request state correctly', () => {
        const state = {
            requestState: RequestState.SUCCESS,
            message: ''
        };

        const action = {
            type: ActionType.SET_REQUEST_STATE,
            requestState: RequestState.SUCCESS,
            message: ''
        };

        expect(requesting(state, action)).toEqual({
            requestState: RequestState.SUCCESS,
            message: ''
        });
    });

    test('requesting reducer clears request result correctly', () => {
        const state = {
            requestState: RequestState.ERROR,
            message: 'something went wrong...'
        };

        const action = {
            type: ActionType.CLEAR_REQUEST
        };

        expect(requesting(state, action)).toEqual({
            requestState: RequestState.IDLE,
            message: ''
        });
    });
});
