import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const EditorActiveBookChapterBottomNavigationElement = ({ chapterNumber }) => {
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
                    window.scrollTo(0, 0);
                }}
            >↑</div>
        </div>
    );
};

EditorActiveBookChapterBottomNavigationElement.propTypes = {
    chapterNumber: PropTypes.number.isRequired
};
