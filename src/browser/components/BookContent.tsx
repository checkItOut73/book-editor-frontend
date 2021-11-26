import React from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { Chapter } from './Chapter';

type Props = BookData & { activeChapterNumber: number };

export const BookContent = ({ title, chapters, activeChapterNumber }: Props) => {
    return <div className="book-content">
        { chapters
            .filter((chapterData) => activeChapterNumber === chapterData.number)
            .map((chapterData, index) => <Chapter key={index} {...chapterData}>{ getTitle() }</Chapter>)
        }
    </div>;

    function getTitle() {
        if ('' === title || activeChapterNumber !== 1) {
            return null;
        }

        return <h1 key="title">{ title }</h1>;
    }
}

BookContent.propTypes = {
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.shape({
            heading: PropTypes.string.isRequired,
            verses: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                numberInChapter: PropTypes.number.isRequired
            })).isRequired
        })).isRequired
    })).isRequired,
    activeChapterNumber: PropTypes.number.isRequired
};