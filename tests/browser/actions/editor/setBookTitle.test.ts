import { setBookTitle } from '@actions/editor/setBookTitle';
import { ActionType } from '@actions/ActionType';

describe('setBookTitle | ', () => {
    test('setBookTitle returns correct action', () => {
        expect(setBookTitle('updated book title')).toEqual({
            type: ActionType.SET_BOOK_TITLE,
            title: 'updated book title'
        });
    });
});
