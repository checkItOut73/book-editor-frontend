import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';

interface Props {
    chapters: Array<ChapterData>;
    activeChapterNumber: number;
    setActiveChapterNumber: (chapterNumber: number) => void;
}
export const BookChapterNavigation = ({ chapters, activeChapterNumber, setActiveChapterNumber }: Props) => (
    <div className="book-chapter-navigation">
        { chapters.map((chapterData, index) =>
            <div
                onClick={() => setActiveChapterNumber(chapterData.number)}
                key={index}
                className={
                    'book-chapter-navigation__element' +
                        (activeChapterNumber === chapterData.number ? ' book-chapter-navigation__element--active' : '')
                }
            >
                {chapterData.number}
            </div>
        ) }
    </div>
);

BookChapterNavigation.propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.shape({
            heading: PropTypes.string.isRequired,
            verses: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                numberInChapter: PropTypes.number.isRequired
            })).isRequired
        })).isRequired
    })).isRequired,
    activeChapterNumber: PropTypes.number.isRequired,
    setActiveChapterNumber: PropTypes.func.isRequired
};