import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { BookChapterNavigation } from '@components/BookChapterNavigation';
import { BookContent } from '@components/BookContent';

export const Book = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [lastActiveChapterNumber, setLastActiveChapterNumber] = useState(1);

    function setActiveActiveChapterNumberMemorisingLastValue(newActiveChapterNumber: number) {
        setLastActiveChapterNumber(activeChapterNumber);
        setActiveChapterNumber(newActiveChapterNumber);
    }

    return <div className="book">
        <BookChapterNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveActiveChapterNumberMemorisingLastValue}
        />
        <BookContent
            title={title}
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            lastActiveChapterNumber={lastActiveChapterNumber}
            setLastActiveChapterNumber={setLastActiveChapterNumber}
        />
        <BookChapterNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveActiveChapterNumberMemorisingLastValue}
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