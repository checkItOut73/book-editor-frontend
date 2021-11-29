import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { BookChapterNavigationElement } from '@src/browser/components/navigation/BookChapterNavigationElement';

interface Props {
    chapters: Array<ChapterData>;
    activeChapterNumber: number;
    setActiveChapterNumber: (chapterNumber: number) => void;
}
export const BookChapterTopNavigation = ({ chapters, activeChapterNumber, setActiveChapterNumber }: Props) => {
    return (
        <div className="book-chapter-navigation">
            { chapters.map((chapterData) =>
                activeChapterNumber === chapterData.number ?
                    getActiveBookChapterNavigationElement() :
                    <BookChapterNavigationElement
                        key={chapterData.number}
                        chapterNumber={chapterData.number}
                        setActiveChapterNumber={setActiveChapterNumber}
                    />
            ) }
        </div>
    );

    function getActiveBookChapterNavigationElement() {
        return (
            <div
                key={activeChapterNumber}
                className="book-chapter-navigation-element book-chapter-navigation-element--active"
            >
                {activeChapterNumber}
            </div>
        );
    }
};

BookChapterTopNavigation.propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
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