import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    className: string;
    tooltipText: string;
    setTooltipText: (tooltipText: string) => void;
    onClick: () => void;
    tagName: string;
};
export const TooltipTriggerDiv = ({ className, tooltipText, setTooltipText, onClick, tagName }: Props) => {
    return React.createElement(
        tagName,
        {
            className,
            onMouseEnter: () => {
                setTooltipText(tooltipText);
            },
            onMouseLeave: () => {
                setTooltipText('');
            },
            onClick
        }
    );
};

TooltipTriggerDiv.propTypes = {
    className: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    setTooltipText: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    tagName: PropTypes.string.isRequired
};

TooltipTriggerDiv.defaultProps = {
    tagName: 'div'
};