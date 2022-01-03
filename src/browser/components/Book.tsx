import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@server/UseCase/GetApp/BookData';
import { BookChapterTopNavigation } from '@components/navigation/BookChapterTopNavigation';
import { BookChapterBottomNavigation } from '@components/navigation/BookChapterBottomNavigation';
import { BookContent } from '@components/BookContent';

let bottomNavigationHeight;
let intervalForFixingBottomNavigation;

export const Book = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [lastActiveChapterNumber, setLastActiveChapterNumber] = useState(1);
    const bottomNavigationRef = React.createRef<HTMLDivElement>();

    if (chapters.length === 0) {
        return (
            <div className="book">
                <div className="book-content">
                    <p>Dieses Buch hat bisher noch keine Kapitel!</p>
                </div>
            </div>
        );
    }

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
        bottomNavigationHeight = bottomNavigation.clientHeight;

        if (intervalForFixingBottomNavigation) {
            stopFixingBottomNavigation();
        }
        intervalForFixingBottomNavigation = setInterval(() => {
            window.scrollTo(0, bottomNavigation.offsetTop - window.innerHeight + bottomNavigationHeight);
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
    })).isRequired
};