import { ActionType } from '@actions/ActionType';
import { setChapters } from '@actions/editor/setChapters';

describe('setChapters | ', () => {
    test('setChapters returns correct action', () => {
        expect(setChapters([
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
            type: ActionType.SET_CHAPTERS,
            chapters: [
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
