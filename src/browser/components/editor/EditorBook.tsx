import React, { useReducer, useState } from 'react';
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

    // TODO test!! + refactor!!
    function dispatch(action) {
        if (typeof action === 'function') {
            // TODO test dispatch2
            return action(dispatch, getState);
        }

        return dispatchForPlainActions(action);
    }

    const [activeChapterNumber, setActiveChapterNumber] = useState(1);
    const [tooltipText, setTooltipText] = useState('');
    const [layerContent, setLayerContent] = useState(null);

    return <Context.Provider value={{ dispatch, getState }}>
        <div className="book book--editor">
            <EditorBookChapterTopNavigation
                chapters={chapters}
                activeChapterNumber={activeChapterNumber}
                setActiveChapterNumber={setActiveChapterNumber}
                setTooltipText={setTooltipText}
                setLayerContent={setLayerContent}
            />
            <EditorBookContent
                id={id}
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
    </Context.Provider>;
}
