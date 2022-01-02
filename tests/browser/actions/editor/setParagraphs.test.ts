import { ActionType } from '@actions/ActionType';
import { setParagraphs } from '@actions/editor/setParagraphs';

describe('setParagraphs | ', () => {
    test('setParagraphs returns correct action', () => {
        expect(setParagraphs(5, [
            {
                id: 9043,
                heading: 'Do Androids Dream of Electric Sheep?'
            },
            {
                id: 9044,
                heading: 'Everything I Never Told You'
            },
            {
                id: 9045,
                heading: 'Cloudy with a Chance of Meatballs'
            }
        ])).toEqual({
            type: ActionType.SET_PARAGRAPHS,
            chapterId: 5,
            paragraphs: [
                {
                    id: 9043,
                    heading: 'Do Androids Dream of Electric Sheep?'
                },
                {
                    id: 9044,
                    heading: 'Everything I Never Told You'
                },
                {
                    id: 9045,
                    heading: 'Cloudy with a Chance of Meatballs'
                }
            ]
        });
    });
});
