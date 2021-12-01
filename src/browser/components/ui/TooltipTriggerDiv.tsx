import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    className: string;
    tooltipText: string;
    setTooltipText: (tooltipText: string) => void;
    tagName: string;
};
export const TooltipTriggerDiv = ({ className, tooltipText, setTooltipText, tagName }: Props) => {
    return React.createElement(
        tagName,
        {
            className,
            onMouseEnter: () => {
                setTooltipText(tooltipText);
            },
            onMouseLeave: () => {
                setTooltipText('');
            }
        }
    );
};

TooltipTriggerDiv.propTypes = {
    className: PropTypes.string.isRequired,
    tooltipText: PropTypes.string.isRequired,
    setTooltipText: PropTypes.func.isRequired,
    tagName: PropTypes.string.isRequired
};

TooltipTriggerDiv.defaultProps = {
    tagName: 'div'
};