import React, { MouseEventHandler, useContext } from 'react';
import PropTypes from 'prop-types';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';

type Props = {
    className?: string;
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const RequestButton = ({ className, label, onClick }: Props) => {
    const { getState } = useContext(Context);
    const { requesting: { requestState }} = getState();

    const buttonProps = { onClick, ...(className ? { className } : {}) };

    return (
        <button {...buttonProps}>
            { label }
            { requestState === RequestState.PENDING ?
                <img width="20" className="loader" src="/loader.jpg" /> :
                null }
        </button>
    );
};

RequestButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
