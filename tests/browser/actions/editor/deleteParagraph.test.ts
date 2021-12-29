import { deleteParagraph } from '@actions/editor/deleteParagraph';
import { ActionType } from '@actions/ActionType';

describe('deleteParagraph | ', () => {
    test('deleteParagraph returns correct action', () => {
        expect(deleteParagraph(44)).toEqual({
            type: ActionType.DELETE_PARAGRAPH,
            id: 44
        });
    });
});
