import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { BookChapterNavigation } from './BookChapterNavigation';
import { BookContent } from './BookContent';

export const Book = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);

    return <div className="book">
        <BookChapterNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveChapterNumber}
        />
        <BookContent
            title={title}
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
        />
        <BookChapterNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveChapterNumber}
        />
    </div>;
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.shape({
            heading: PropTypes.string.isRequired,
            verses: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                numberInChapter: PropTypes.number.isRequired
            })).isRequired
        })).isRequired
    })).isRequired
};