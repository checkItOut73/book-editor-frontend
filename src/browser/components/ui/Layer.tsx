import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    layerContent: JSX.Element;
    setLayerContent: (layerContent: JSX.Element) => void;
};

export const Layer = ({ layerContent, setLayerContent }: Props) => {
    if (!layerContent) {
        return null;
    }

    return (
        <div className="layer">
            <div className="layer__overlay" />
            <div className="layer__content-container">
                <div className="layer__content">
                    {layerContent}
                </div>
                <span className="layer__closer" onClick={() => setLayerContent(null)}>x</span>
            </div>
        </div>
    );
};

Layer.propTypes = {
    layerContent: PropTypes.node,
    setLayerContent: PropTypes.func.isRequired
};