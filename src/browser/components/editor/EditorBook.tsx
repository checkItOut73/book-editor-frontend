import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorBookChapterBottomNavigation } from '@components/editor/navigation/EditorBookChapterBottomNavigation';
import { Tooltip } from '@components/ui/Tooltip';
import { Layer } from '@components/ui/Layer';

export const EditorBook = ({ title, chapters }: BookData) => {
    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [tooltipText, setTooltipText] = useState('');
    const [layerContent, setLayerContent] = useState(null);

    return <>
        <div className="book book--editor">
            <EditorBookChapterTopNavigation
                chapters={chapters}
                activeChapterNumber={activeChapterNumber}
                setActiveChapterNumber={setActiveChapterNumber}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
            <EditorBookContent
                title={title}
                chapters={chapters}
                activeChapterNumber={activeChapterNumber}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
            <EditorBookChapterBottomNavigation
                chapters={chapters}
                activeChapterNumber={activeChapterNumber}
                setActiveChapterNumber={setActiveChapterNumber}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
        </div>
        <Tooltip text={tooltipText} />
        <Layer
            layerContent={layerContent}
            setLayerContent={setLayerContent}
        />
    </>;
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