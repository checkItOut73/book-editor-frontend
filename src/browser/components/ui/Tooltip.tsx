import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

let tooltipRef;

function fixTooltipToMouse(event) {
    tooltipRef.current.style.left = (event.clientX + window.scrollX + 7) + 'px';
    tooltipRef.current.style.top = (event.clientY + window.scrollY + 3) + 'px';
}

export const Tooltip = ({ text }) => {
    tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (text !== '') {
            window.addEventListener('mousemove', fixTooltipToMouse);
            tooltipRef.current.style.display = 'block';
        } else {
            window.removeEventListener('mousemove', fixTooltipToMouse);
            tooltipRef.current.style.display = 'none';
        }
    }, [text]);

    return <div className="tooltip" ref={tooltipRef}>{ text }</div>;
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired
};