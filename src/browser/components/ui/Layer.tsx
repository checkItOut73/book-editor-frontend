import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { RequestState } from '@actions/requesting/types/RequestState';
import { clearRequest } from '@actions/requesting/clearRequest';

type Props = {
    layerContent: JSX.Element;
    setLayerContent: (layerContent: JSX.Element) => void;
};

export const Layer = ({ layerContent, setLayerContent }: Props) => {
    const { dispatch, getState } = useContext(Context);
    const { requesting: { requestState }} = getState();

    if (!layerContent) {
        return null;
    }

    function onClick() {
        if (requestState !== RequestState.PENDING) {
            dispatch(clearRequest());
            setLayerContent(null);
        }
    }

    return (
        <div className="layer">
            <div className="layer__overlay" />
            <div className="layer__content-container">
                <div className="layer__content">
                    {layerContent}
                </div>
                <span className="layer__closer" onClick={onClick}>x</span>
            </div>
        </div>
    );
};

Layer.propTypes = {
    layerContent: PropTypes.node,
    setLayerContent: PropTypes.func.isRequired
};