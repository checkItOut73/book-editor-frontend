import React, { useState } from 'react';
import PropTypes from 'prop-types';
import smoothScrollOperator from 'smooth-scroll-operator';

export const ActiveBookChapterBottomNavigationElement = ({ chapterNumber }) => {
    const [classNameModifier, setClassNameModifier] = useState<string>('');

    return (
        <div
            onMouseOver={() => setClassNameModifier(' book-chapter-navigation-element--hovered')}
            onMouseOut={() => setClassNameModifier('')}
            key={chapterNumber}
            className={
                'book-chapter-navigation-element book-chapter-navigation-element--active' + classNameModifier
            }
        >
            <span className="book-chapter-navigation-element__content">{chapterNumber}</span>
            <div
                className="book-chapter-navigation-element__scroll-to-top"
                onClick={() => {
                    smoothScrollOperator.scrollY(window, 0, {
                        duration: 2000,
                        easing: [0.43, 0.16, 0.00, 1.00]
                    });
                }}
            >↑</div>
        </div>
    );
};

ActiveBookChapterBottomNavigationElement.propTypes = {
    chapterNumber: PropTypes.number.isRequired
};
