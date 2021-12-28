import React, { MouseEventHandler, useContext } from 'react';
import PropTypes from 'prop-types';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';

type Props = {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const RequestButton = ({ label, onClick }: Props) => {
    const { getState } = useContext(Context);
    const { requesting: { requestState }} = getState();

    return (
        <button onClick={onClick}>
            { label }
            { requestState === RequestState.PENDING ?
                <img width="20" className="loader" src="/loader.jpg" /> :
                null }
        </button>
    );
};

RequestButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
