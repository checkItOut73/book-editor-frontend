import { setErrorMessage } from '@actions/requesting/setErrorMessage';
import { ActionType } from '@actions/ActionType';
import { RequestState } from '@actions/requesting/types/RequestState';

describe('setErrorMessage | ', () => {
    test('setErrorMessage returns correct action', () => {
        expect(setErrorMessage('something went wrong...')).toEqual({
            type: ActionType.SET_REQUEST_RESULT,
            requestState: RequestState.ERROR,
            message: 'something went wrong...'
        });
    });
});
