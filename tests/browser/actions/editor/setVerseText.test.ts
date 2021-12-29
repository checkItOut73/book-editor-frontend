import { setVerseText } from '@actions/editor/setVerseText';
import { ActionType } from '@actions/ActionType';

describe('setVerseText | ', () => {
    test('setVerseText returns correct action', () => {
        expect(setVerseText(234, 'updated verse text')).toEqual({
            type: ActionType.SET_VERSE_TEXT,
            id: 234,
            text: 'updated verse text'
        });
    });
});
