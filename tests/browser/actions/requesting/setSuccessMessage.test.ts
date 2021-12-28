import { setSuccessMessage } from '@actions/requesting/setSuccessMessage';
import { ActionType } from '@actions/ActionType';
import { RequestState } from '@actions/requesting/types/RequestState';

describe('setSuccessMessage | ', () => {
    test('setSuccessMessage returns correct action', () => {
        expect(setSuccessMessage('Success!')).toEqual({
            type: ActionType.SET_REQUEST_RESULT,
            requestState: RequestState.SUCCESS,
            message: 'Success!'
        });
    });
});
