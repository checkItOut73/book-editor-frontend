import { RequestState } from '@actions/requesting/types/RequestState';
import { setRequestState } from '@actions/requesting/setRequestState';
import { setErrorMessage } from '@actions/requesting/setErrorMessage';
import { setSuccessMessage } from '@actions/requesting/setSuccessMessage';

export const fetchApi =
    (url, options, onSuccessCallback) => async (dispatch, getState) => {
        const {
            requesting: { requestState }
        } = getState();

        if (requestState !== RequestState.IDLE) {
            return;
        }

        dispatch(setRequestState(RequestState.PENDING));

        let response;

        try {
            response = await (await fetch(url, options)).json();
        } catch (error) {
            dispatch(setErrorMessage(error.message));
            return;
        }

        if (response.success) {
            dispatch(setSuccessMessage(response.success.message));
            onSuccessCallback(response);
        } else if (response.error) {
            dispatch(setErrorMessage(response.error.message));
        }
    };
