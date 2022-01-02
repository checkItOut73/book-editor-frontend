import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@server/UseCase/GetApp/BookData';
import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';

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
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        heading: PropTypes.string.isRequired,
        paragraphs: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            numberInChapter: PropTypes.number.isRequired,
            heading: PropTypes.string.isRequired,
            verses: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                numberInParagraph: PropTypes.number.isRequired,
                numberInChapter: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })).isRequired
        })).isRequired
    })).isRequired,
    activeChapterNumber: PropTypes.number.isRequired,
    setActiveChapterNumber: PropTypes.func.isRequired
};