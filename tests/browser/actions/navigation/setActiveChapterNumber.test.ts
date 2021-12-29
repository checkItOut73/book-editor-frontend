import { setActiveChapterNumber } from '@actions/navigation/setActiveChapterNumber';
import { ActionType } from '@actions/ActionType';

describe('setActiveChapterNumber | ', () => {
    test('setActiveChapterNumber returns correct action', () => {
        expect(setActiveChapterNumber(8)).toEqual({
            type: ActionType.SET_ACTIVE_CHAPTER_NUMBER,
            chapterNumber: 8
        });
    });
});
