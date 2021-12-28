import { setRequestState } from '@actions/requesting/setRequestState';
import { ActionType } from '@actions/ActionType';
import { RequestState } from '@actions/requesting/types/RequestState';

describe('setRequestState | ', () => {
    test('setRequestState returns correct action', () => {
        expect(setRequestState(RequestState.ERROR)).toEqual({
            type: ActionType.SET_REQUEST_STATE,
            requestState: RequestState.ERROR
        });
    });
});
