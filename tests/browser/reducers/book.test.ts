import { book } from '@browser/reducers/book';
import { ActionType } from '@actions/ActionType';

describe('book | ', () => {
    test('book reducer returns correct default state', () => {
        expect(book()).toEqual({
            id: undefined,
            title: '',
            chapters: []
        });
    });

    test('book reducer updates title correctly', () => {
        const state = {
            id: 93,
            title: 'old title',
            chapters: []
        };

        const action = {
            type: ActionType.SET_BOOK_TITLE,
            title: 'new title'
        };

        expect(book(state, action)).toEqual({
            id: 93,
            title: 'new title',
            chapters: []
        });
    });
});
