import { setParagraphHeading } from '@actions/editor/setParagraphHeading';
import { ActionType } from '@actions/ActionType';

describe('setParagraphHeading | ', () => {
    test('setParagraphHeading returns correct action', () => {
        expect(setParagraphHeading(234, 'updated paragraph heading')).toEqual({
            type: ActionType.SET_PARAGRAPH_HEADING,
            id: 234,
            heading: 'updated paragraph heading'
        });
    });
});
