import React from 'react';
import PropTypes from 'prop-types';

export const BookChapterNavigationElement = ({ chapterNumber, setActiveChapterNumber }) => {
    return (
        <div
            onClick={() => setActiveChapterNumber(chapterNumber)}
            key={chapterNumber}
            className="book-chapter-navigation-element"
        >
            {chapterNumber}
        </div>
    );
};

BookChapterNavigationElement.propTypes = {
    chapterNumber: PropTypes.number.isRequired,
    setActiveChapterNumber: PropTypes.func.isRequired
};