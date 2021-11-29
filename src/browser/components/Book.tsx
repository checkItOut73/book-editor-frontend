import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { BookChapterTopNavigation } from '@components/navigation/BookChapterTopNavigation';
import { BookChapterBottomNavigation } from '@components/navigation/BookChapterBottomNavigation';
import { BookContent } from '@components/BookContent';

let intervalForFixingBottomNavigation;
const BOTTOM_NAVIGATION_HEIGHT = 50;

export const Book = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [lastActiveChapterNumber, setLastActiveChapterNumber] = useState(1);
    const bottomNavigationRef = React.createRef<HTMLDivElement>();

    return <div className="book">
        <BookChapterTopNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveChapterNumberMemorisingLastValue}
        />
        <BookContent
            title={title}
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            lastActiveChapterNumber={lastActiveChapterNumber}
            onTransitionEnd={() => {
                setLastActiveChapterNumber(activeChapterNumber);
                stopFixingBottomNavigation();
            }}
        />
        <BookChapterBottomNavigation
            ref={bottomNavigationRef}
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={(activeChapterNumber) => {
                fixBottomNavigation();
                setActiveChapterNumberMemorisingLastValue(activeChapterNumber);
            }}
        />
    </div>;

    function setActiveChapterNumberMemorisingLastValue(newActiveChapterNumber: number) {
        setLastActiveChapterNumber(activeChapterNumber);
        setActiveChapterNumber(newActiveChapterNumber);
    }

    function fixBottomNavigation() {
        const bottomNavigation = bottomNavigationRef.current;

        if (intervalForFixingBottomNavigation) {
            stopFixingBottomNavigation();
        }
        intervalForFixingBottomNavigation = setInterval(() => {
            window.scrollTo(0, bottomNavigation.offsetTop - window.innerHeight + BOTTOM_NAVIGATION_HEIGHT);
        }, 20);
    }

    function stopFixingBottomNavigation() {
        clearInterval(intervalForFixingBottomNavigation);
        intervalForFixingBottomNavigation = null;
    }

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