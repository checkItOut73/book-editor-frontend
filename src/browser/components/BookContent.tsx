import React from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { Chapter } from './Chapter';

type Props = BookData & {
    activeChapterNumber: number;
    lastActiveChapterNumber: number;
    setLastActiveChapterNumber: (chapterNumber: number) => void
};

export const BookContent = ({ title, chapters, activeChapterNumber, lastActiveChapterNumber, setLastActiveChapterNumber }: Props) => {
    return <div className="book-content">
        { getActiveChapter() }
        { getLastActiveChapter() }
    </div>;

    function getActiveChapter() {
        return getChapter(activeChapterNumber);
    }

    function getChapter(chapterNumber, additionalProps = {}) {
        const chapterData = chapters.find((chapterData) => chapterNumber === chapterData.number);

        return <Chapter key={chapterData.number} {...chapterData} {...additionalProps}>
            { chapterData.number === 1 ? getBookTitle() : null }
        </Chapter>;
    }

    function getBookTitle() {
        if ('' === title) {
            return null;
        }

        return <h1 key="book-title">{ title }</h1>;
    }

    function getLastActiveChapter() {
        if (!hasActiveChapterNumberChanged()) {
            return null;
        }

        return getChapter(
            lastActiveChapterNumber,
            {
                classNameModifier: 'lastActive',
                onTransitionEnd: () => {
                    setLastActiveChapterNumber(activeChapterNumber);
                }
            }
        );
    }

    function hasActiveChapterNumberChanged(): boolean {
        return activeChapterNumber !== lastActiveChapterNumber;
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
    activeChapterNumber: PropTypes.number.isRequired,
    lastActiveChapterNumber: PropTypes.number.isRequired,
    setLastActiveChapterNumber: PropTypes.func.isRequired
};