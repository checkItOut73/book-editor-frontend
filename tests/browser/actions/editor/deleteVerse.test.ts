import { deleteVerse } from '@actions/editor/deleteVerse';
import { ActionType } from '@actions/ActionType';

describe('deleteVerse | ', () => {
    test('deleteVerse returns correct action', () => {
        expect(deleteVerse(234)).toEqual({
            type: ActionType.DELETE_VERSE,
            id: 234
        });
    });
});
