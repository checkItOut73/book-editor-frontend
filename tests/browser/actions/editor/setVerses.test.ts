import { ActionType } from '@actions/ActionType';
import { setVerses } from '@actions/editor/setVerses';

describe('setVerses | ', () => {
    test('setVerses returns correct action', () => {
        expect(setVerses(5, [
            {
                id: 9043,
                text: 'Als Epochenbezeichnung im Sinne geschichtlicher Periodisierung hat sich die Renaissance erst seit Mitte des 19. Jahrhunderts etabliert.'
            },
            {
                id: 9044,
                text: 'Die Vorstellung, in einer vom Mittelalter unterschiedenen, neuen Zeit zu leben, hatte sich unter Humanisten, Literaten und Künstlern in Italien allerdings bereits seit dem 14. Jahrhundert verbreitet.'
            },
            {
                id: 9045,
                text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
            }
        ])).toEqual({
            type: ActionType.SET_VERSES,
            paragraphId: 5,
            verses: [
                {
                    id: 9043,
                    text: 'Als Epochenbezeichnung im Sinne geschichtlicher Periodisierung hat sich die Renaissance erst seit Mitte des 19. Jahrhunderts etabliert.'
                },
                {
                    id: 9044,
                    text: 'Die Vorstellung, in einer vom Mittelalter unterschiedenen, neuen Zeit zu leben, hatte sich unter Humanisten, Literaten und Künstlern in Italien allerdings bereits seit dem 14. Jahrhundert verbreitet.'
                },
                {
                    id: 9045,
                    text: 'In ihrem Ursprung war die Renaissance eine kulturelle Bewegung zur Wiedergewinnung von Zeugnissen der Antike für die eigene Daseinsorientierung.'
                }
            ]
        });
    });
});
