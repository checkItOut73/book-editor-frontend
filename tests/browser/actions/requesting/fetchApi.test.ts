import { RequestState } from '@actions/requesting/types/RequestState';
import { fetchApi } from '@actions/requesting/fetchApi';
import { SettablePromise } from '@tests/__test_helpers__/SettablePromise';

jest.mock('@actions/requesting/setRequestState', () => ({
    setRequestState: (requestState) => ({
        type: 'SET_REQUEST_STATE_MOCK',
        requestState
    })
}));

jest.mock('@actions/requesting/setErrorMessage', () => ({
    setErrorMessage: (message) => ({
        type: 'SET_ERROR_MESSAGE_MOCK',
        message
    })
}));

jest.mock('@actions/requesting/setSuccessMessage', () => ({
    setSuccessMessage: (message) => ({
        type: 'SET_SUCCESS_MESSAGE_MOCK',
        message
    })
}));

describe('fetchApi | ', () => {
    const dispatch = jest.fn();
    let state;
    const onSuccessCallback = jest.fn();
    let fetchSettablePromise;

    function callFetchApi() {
        return fetchApi(
            '/api/book/1',
            { method: 'GET' },
            onSuccessCallback
        )(dispatch, () => state);
    }

    beforeEach(() => {
        state = {
            requesting: {
                requestState: RequestState.IDLE
            }
        };

        fetchSettablePromise = SettablePromise();
        global.fetch = jest.fn(() => fetchSettablePromise);
    });

    test('fetchApi sets the requestState correctly to PENDING', () => {
        callFetchApi();

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'SET_REQUEST_STATE_MOCK',
            requestState: RequestState.PENDING
        });
    });

    describe('if there still is a pending request', () => {
        beforeEach(() => {
            state.requesting.requestState = RequestState.PENDING;
        });

        test('the request state in not changed', async () => {
            await callFetchApi();

            expect(dispatch).not.toHaveBeenCalled();
        });

        test('no fetch is started', async () => {
            await callFetchApi();

            expect(fetch).not.toHaveBeenCalled();
        });
    });

    describe('if there is a success response', () => {
        beforeEach(async () => {
            let fetchResponse = callFetchApi();

            fetchSettablePromise.resolve({
                json: () =>
                    Promise.resolve({
                        success: {
                            message: 'Success!'
                        }
                    })
            });

            await fetchResponse;
        });

        test('fetchApi sets the success message result correctly', () => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
                type: 'SET_SUCCESS_MESSAGE_MOCK',
                message: 'Success!'
            });
        });

        test('fetchApi calls the onSuccessCallback', () => {
            expect(onSuccessCallback).toHaveBeenCalled();
        });
    });

    describe('if there is an error response', () => {
        beforeEach(async () => {
            let fetchResponse = callFetchApi();

            fetchSettablePromise.resolve({
                json: () =>
                    Promise.resolve({
                        error: {
                            message: 'Error!'
                        }
                    })
            });
            await fetchResponse;
        });

        test('fetchApi sets the error message correctly', () => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
                type: 'SET_ERROR_MESSAGE_MOCK',
                message: 'Error!'
            });
        });

        test('fetchApi does not call the onSuccessCallback', () => {
            expect(onSuccessCallback).not.toHaveBeenCalled();
        });
    });

    describe('if the response json is invalid', () => {
        beforeEach(async () => {
            let fetchResponse = callFetchApi();

            fetchSettablePromise.resolve({
                json: () => {
                    throw new Error('invalid json');
                }
            });
            await fetchResponse;
        });

        test('fetchApi sets the error message correctly', () => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
                type: 'SET_ERROR_MESSAGE_MOCK',
                message: 'invalid json'
            });
        });

        test('fetchApi does not call the onSuccessCallback', () => {
            expect(onSuccessCallback).not.toHaveBeenCalled();
        });
    });

    describe('if the requests fails', () => {
        beforeEach(async () => {
            let fetchResponse = callFetchApi();

            fetchSettablePromise.reject(new Error('request error'));
            await fetchResponse;
        });

        test('fetchApi sets the error message correctly', () => {
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenCalledWith({
                type: 'SET_ERROR_MESSAGE_MOCK',
                message: 'request error'
            });
        });

        test('fetchApi does not call the onSuccessCallback', () => {
            expect(onSuccessCallback).not.toHaveBeenCalled();
        });
    });
});
