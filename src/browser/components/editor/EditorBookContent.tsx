import React from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@src/server/UseCase/GetApp/BookData';
import { EditorChapter } from '@components/editor/EditorChapter';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { EditBookTitleLayer } from '@components/editor/layers/EditBookTitleLayer';

type Props = BookData & {
    activeChapterNumber: number;
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
};

export const EditorBookContent = ({ title, chapters, activeChapterNumber, setTooltipText, setLayerContent }: Props) => {
    return (
        <div className="book-content">
            { chapters
                .filter((chapterData) => chapterData.number === activeChapterNumber)
                .map((chapterData) => (
                    <EditorChapter
                        key={chapterData.number}
                        {...chapterData}
                        setTooltipText={setTooltipText}
                        setLayerContent={setLayerContent}
                    >
                        { chapterData.number === 1 ? getBookTitle() : null }
                    </EditorChapter>
                ))
            }
        </div>
    );

    function getBookTitle() {
        if ('' === title) {
            return <TooltipTriggerDiv
                className="book-title-placeholder"
                tooltipText="Buchtitel festlegen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<EditBookTitleLayer title="" />)}
            />;
        }

        return (
            <h1
                key="book-title"
                className="book-title"
                onClick={() => setLayerContent(<EditBookTitleLayer title={ title } />)}
            >
                { title }
            </h1>
        );
    }
}

EditorBookContent.propTypes = {
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
    setTooltipText: PropTypes.func.isRequired,
    setLayerContent: PropTypes.func.isRequired
};