import { ActionType } from '@actions/ActionType';
import { navigation } from '@browser/reducers/navigation';

describe('navigation | ', () => {
    test('navigation reducer returns correct default state', () => {
        expect(navigation()).toEqual({
            activeChapterNumber: 1
        });
    });

    test('navigation reducer decrements the active chapter number correctly', () => {
        const state = {
            activeChapterNumber: 4
        };

        const action = {
            type: ActionType.DECREMENT_ACTIVE_CHAPTER_NUMBER
        };

        expect(navigation(state, action)).toEqual({
            activeChapterNumber: 3
        });
    });

    test('navigation reducer does not decrement the active chapter number if it is already 1', () => {
        const state = {
            activeChapterNumber: 1
        };

        const action = {
            type: ActionType.DECREMENT_ACTIVE_CHAPTER_NUMBER
        };

        expect(navigation(state, action)).toEqual({
            activeChapterNumber: 1
        });
    });

    test('navigation reducer updates the active chapter number correctly', () => {
        const state = {
            activeChapterNumber: 1
        };

        const action = {
            type: ActionType.SET_ACTIVE_CHAPTER_NUMBER,
            chapterNumber: 3
        };

        expect(navigation(state, action)).toEqual({
            activeChapterNumber: 3
        });
    });
});
