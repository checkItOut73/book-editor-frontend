import { clearRequest } from '@actions/requesting/clearRequest';
import { ActionType } from '@actions/ActionType';

describe('clearRequest | ', () => {
    test('clearRequest returns correct action', () => {
        expect(clearRequest()).toEqual({
            type: ActionType.CLEAR_REQUEST
        });
    });
});
