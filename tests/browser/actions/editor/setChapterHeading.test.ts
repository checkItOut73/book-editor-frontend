import { setChapterHeading } from '@actions/editor/setChapterHeading';
import { ActionType } from '@actions/ActionType';

describe('setChapterHeading | ', () => {
    test('setChapterHeading returns correct action', () => {
        expect(setChapterHeading(234, 'updated chapter heading')).toEqual({
            type: ActionType.SET_CHAPTER_HEADING,
            id: 234,
            heading: 'updated chapter heading'
        });
    });
});
