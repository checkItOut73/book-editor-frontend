import { decrementActiveChapterNumber } from '@actions/navigation/decrementActiveChapterNumber';
import { ActionType } from '@actions/ActionType';

describe('decrementActiveChapterNumber | ', () => {
    test('decrementActiveChapterNumber returns correct action', () => {
        expect(decrementActiveChapterNumber()).toEqual({
            type: ActionType.DECREMENT_ACTIVE_CHAPTER_NUMBER
        });
    });
});
