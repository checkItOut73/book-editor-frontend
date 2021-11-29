import React, { RefObject } from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { ActiveBookChapterBottomNavigationElement } from '@src/browser/components/navigation/ActiveBookChapterBottomNavigationElement';
import { BookChapterNavigationElement } from '@src/browser/components/navigation/BookChapterNavigationElement';

interface Props {
    chapters: Array<ChapterData>;
    activeChapterNumber: number;
    setActiveChapterNumber: (chapterNumber: number) => void;
}
export const BookChapterBottomNavigation = React.forwardRef(({ chapters, activeChapterNumber, setActiveChapterNumber }: Props, ref: RefObject<HTMLDivElement>) => {
    return (
        <div className="book-chapter-navigation" ref={ref}>
            { chapters.map((chapterData) =>
                activeChapterNumber === chapterData.number ?
                    <ActiveBookChapterBottomNavigationElement
                        key={chapterData.number}
                        chapterNumber={chapterData.number}
                    /> :
                    <BookChapterNavigationElement
                        key={chapterData.number}
                        chapterNumber={chapterData.number}
                        setActiveChapterNumber={setActiveChapterNumber}
                    />
            ) }
        </div>
    );
});

BookChapterBottomNavigation.propTypes = {
    // @ts-ignore
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
