import React from 'react';
import { useContext } from 'react';
import { Context } from '@browser/context';
import { clearRequest } from '@actions/requesting/clearRequest';
import { RequestState } from '@actions/requesting/types/RequestState';
import { MessageType } from '@actions/requesting/types/MessageType';
import { Message } from '@components/requesting/Message';

export const RequestReponseMessage = () => {
    const { dispatch, getState } = useContext(Context);
    const { requesting: { requestState, message }} = getState();

    if (requestState === RequestState.ERROR) {
        return <Message
            messageType={MessageType.error}
            message={message}
            onTransitionEnd={() => {
                dispatch(clearRequest());
            }}
        />;
    } else if (requestState === RequestState.SUCCESS) {
        return <Message
            messageType={MessageType.success}
            message={message}
            onTransitionEnd={() => {
                dispatch(clearRequest());
            }}
        />;
    } else {
        return null;
    }
};