import { book, BOOK_DEFAULT_STATE } from '@reducers/book';
import { requesting, REQUESTING_DEFAULT_STATE } from '@reducers/requesting';
import { Action } from '@actions/ActionType';

type State = {
    book?: typeof BOOK_DEFAULT_STATE;
    requesting?: typeof REQUESTING_DEFAULT_STATE;
};

export const rootReducer = (state: State, action: Action) => {
    return {
        book: book(state.book, action),
        requesting: requesting(state.requesting, action)
    };
};
