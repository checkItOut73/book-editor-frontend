import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorBookChapterBottomNavigation } from '@components/editor/navigation/EditorBookChapterBottomNavigation';
import { Tooltip } from '@components/ui/Tooltip';

export const EditorBook = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [tooltipText, setTooltipText] = useState('');

    return <div className="book book--editor">
        <EditorBookChapterTopNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveChapterNumber}
            setTooltipText={setTooltipText}
        />
        <EditorBookContent
            title={title}
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setTooltipText={setTooltipText}
        />
        <EditorBookChapterBottomNavigation
            chapters={chapters}
            activeChapterNumber={activeChapterNumber}
            setActiveChapterNumber={setActiveChapterNumber}
            setTooltipText={setTooltipText}
        />
        <Tooltip text={tooltipText} />
    </div>;
}

EditorBook.propTypes = {
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
    })).isRequired
};