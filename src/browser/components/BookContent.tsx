import React, { useState, useEffect, RefObject } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { Chapter, ChapterProps } from './Chapter';
import debounce from 'debounce';

type Props = BookData & {
    activeChapterNumber: number;
    lastActiveChapterNumber: number;
    onTransitionEnd: () => void
};

export const BookContent = ({ title, chapters, activeChapterNumber, lastActiveChapterNumber, onTransitionEnd }: Props) => {
    const [chapterHeight, setChapterHeight] = useState(null);
    const activeChapter = React.createRef<HTMLDivElement>();

    useEffect(() => {
        window.onresize = debounce(() => {
            setChapterHeight(null);
        }, 200);
    }, []);

    useEffect(() => {
        activeChapter.current.classList.add('opacity-fade-in');
        setChapterHeight(activeChapter.current.clientHeight);
    });

    return <div className="book-content">
        { getLastActiveChapter() }
        { getActiveChapter() }
    </div>;

    function getLastActiveChapter() {
        if (!hasActiveChapterNumberChanged()) {
            return null;
        }

        return getChapter(
            lastActiveChapterNumber,
            {
                classNameModifier: 'lastActive',
                height: chapterHeight
            }
        );
    }

    function hasActiveChapterNumberChanged(): boolean {
        return activeChapterNumber !== lastActiveChapterNumber;
    }

    function getActiveChapter() {
        const additionalProps: { ref: RefObject<HTMLDivElement> } & Partial<ChapterProps> = {
            ref: activeChapter
        };

        if (hasActiveChapterNumberChanged()) {
            additionalProps.onTransitionEnd = onTransitionEnd;
        } else {
            additionalProps.height = chapterHeight;
        }

        return getChapter(activeChapterNumber, additionalProps);
    }

    function getChapter(chapterNumber, additionalProps: Partial<ChapterProps> & { ref?: RefObject<HTMLDivElement> }) {
        const chapterData = chapters.find((chapterData) => chapterNumber === chapterData.number);

        return (
            <Chapter
                key={chapterData.number}
                {...chapterData}
                {...additionalProps}
            >
                { chapterData.number === 1 ? getBookTitle() : null }
            </Chapter>
        );
    }

    function getBookTitle() {
        if ('' === title) {
            return null;
        }

        return <h1 key="book-title">{ title }</h1>;
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
    onTransitionEnd: PropTypes.func.isRequired
};