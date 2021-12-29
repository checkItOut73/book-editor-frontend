import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    chapterNumber: number;
    setActiveChapterNumber: (chapterNumber: number) => void;
}
export const BookChapterNavigationElement = ({ chapterNumber, setActiveChapterNumber }: Props) => {
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