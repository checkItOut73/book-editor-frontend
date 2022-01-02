import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorBookChapterBottomNavigation } from '@components/editor/navigation/EditorBookChapterBottomNavigation';
import { Tooltip } from '@components/ui/Tooltip';
import { Layer } from '@components/ui/Layer';
import { Context } from '@browser/context';
import { rootReducer } from '@reducers/rootReducer';

export const EditorBook = ({ id, title, chapters }) => {
    const [state, dispatchForPlainActions] = useReducer(rootReducer, rootReducer({ book: { id, title, chapters }},{}));
    const getState = () => state;
    ({ book: { id, title, chapters }} = state);

    function dispatch(action) {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        return dispatchForPlainActions(action);
    }

    const [tooltipText, setTooltipText] = useState('');
    const [layerContent, setLayerContent] = useState(null);

    return <Context.Provider value={{ dispatch, getState }}>
        <div className="book book--editor">
            <EditorBookChapterTopNavigation
                chapters={chapters}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
            <EditorBookContent
                id={id}
                title={title}
                chapters={chapters}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
            <EditorBookChapterBottomNavigation
                chapters={chapters}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
        </div>
        <Tooltip text={tooltipText} />
        <Layer
            layerContent={layerContent}
            setLayerContent={setLayerContent}
        />
    </Context.Provider>;
}

EditorBook.propTypes = {
    id: PropTypes.number.isRequired,
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
    })).isRequired,
};