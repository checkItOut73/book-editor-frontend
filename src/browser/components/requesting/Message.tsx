import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MessageType } from '@actions/requesting/types/MessageType';

type Props = {
    messageType: MessageType;
    message: string;
    onTransitionEnd: Function;
};

export const Message = ({ messageType, message, onTransitionEnd }: Props) => {
    const messageRef = React.createRef<HTMLDivElement>();
    const [className, setClassName] = useState('message');
    const baseClassName = `message message--${messageType}`;

    useEffect(() => {
        let expandTimeout;
        let collapseTimeout;
        const messageDiv = messageRef.current;

        if (messageDiv) {
            const height = messageDiv.clientHeight + 'px';

            setClassName(`${baseClassName} message--collapsed`);

            expandTimeout = setTimeout(() => {
                messageDiv.style.height = height;
                setClassName(`${baseClassName} message--expanded`);

                collapseTimeout = setTimeout(() => {
                    messageDiv.addEventListener('transitionend', () => {
                        setClassName(baseClassName);
                        onTransitionEnd();
                    });

                    setClassName(`${baseClassName} message--expanded message--collapsed`);
                }, 3000);
            }, 50);
        }

        return () => {
            clearTimeout(expandTimeout);
            clearTimeout(collapseTimeout);
        };
    }, [message]);

    if (!message) {
        return null;
    }

    return <p className={className} ref={messageRef}>{ message }</p>;
};

Message.propTypes = {
    messageType: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onTransitionEnd: PropTypes.func.isRequired
};
