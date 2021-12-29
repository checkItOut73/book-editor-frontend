import { deleteChapter } from '@actions/editor/deleteChapter';
import { ActionType } from '@actions/ActionType';

describe('deleteChapter | ', () => {
    test('deleteChapter returns correct action', () => {
        expect(deleteChapter(4)).toEqual({
            type: ActionType.DELETE_CHAPTER,
            id: 4
        });
    });
});
