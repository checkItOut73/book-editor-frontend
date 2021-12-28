import { rootReducer } from '@browser/reducers/rootReducer';
import * as bookReducer from '@reducers/book';
import * as requestingReducer from '@reducers/requesting';
import { RequestState } from '@actions/requesting/types/RequestState';
import { ActionType } from '@actions/ActionType';

const bookSpy = jest.spyOn(bookReducer, 'book');
bookSpy.mockImplementation((state = bookReducer.BOOK_DEFAULT_STATE) => state);

const requestingSpy = jest.spyOn(requestingReducer, 'requesting');
requestingSpy.mockImplementation(
    (state = requestingReducer.REQUESTING_DEFAULT_STATE) => state
);

describe('rootReducer | ', () => {
    test('rootReducer returns correct default state', () => {
        expect(rootReducer({}, {})).toEqual({
            book: {
                chapters: [],
                id: undefined,
                title: ''
            },
            requesting: {
                requestState: RequestState.IDLE,
                message: ''
            }
        });
    });

    test('rootReducer calls the book reducer correctly', () => {
        expect(
            rootReducer(
                {
                    book: {
                        id: 4234,
                        title: 'some title',
                        chapters: [{}]
                    }
                },
                {
                    type: ActionType.SET_BOOK_TITLE,
                    title: 'some new title'
                }
            )
        );

        expect(bookSpy).toHaveBeenCalledWith(
            {
                id: 4234,
                title: 'some title',
                chapters: [{}]
            },
            {
                type: ActionType.SET_BOOK_TITLE,
                title: 'some new title'
            }
        );
    });

    test('rootReducer calls the requesting reducer correctly', () => {
        expect(
            rootReducer(
                {
                    requesting: {
                        requestState: RequestState.ERROR,
                        message: 'something went wrong...'
                    }
                },
                {
                    type: ActionType.CLEAR_REQUEST
                }
            )
        );

        expect(requestingSpy).toHaveBeenCalledWith(
            {
                requestState: RequestState.ERROR,
                message: 'something went wrong...'
            },
            {
                type: ActionType.CLEAR_REQUEST
            }
        );
    });
});
