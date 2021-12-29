import React, { MouseEventHandler, useContext } from 'react';
import PropTypes from 'prop-types';
import { RequestState } from '@actions/requesting/types/RequestState';
import { Context } from '@browser/context';

type Props = {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
}

export const RequestButton = ({ label, onClick, className, disabled }: Props) => {
    const { getState } = useContext(Context);
    const { requesting: { requestState }} = getState();

    const buttonProps = { onClick, ...(className ? { className } : {}), ...(disabled ? { disabled } : {}) };

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
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool
};
