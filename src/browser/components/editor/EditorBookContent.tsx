import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BookData } from '@server/UseCase/GetApp/BookData';
import { EditorChapter } from '@components/editor/EditorChapter';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { EditBookTitleLayer } from '@components/editor/layers/EditBookTitleLayer';
import { Context } from '@browser/context';

type Props = BookData & {
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
};

export const EditorBookContent = ({ id, title, chapters, setTooltipText, setLayerContent }: Props) => {
    const { getState } = useContext(Context);
    const { navigation: { activeChapterNumber }} = getState();

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
                onClick={() => setLayerContent(<EditBookTitleLayer id={id} title="" />)}
            />;
        }

        return (
            <h1
                key="book-title"
                className="book-title"
                onClick={() => setLayerContent(<EditBookTitleLayer id={id} title={ title } />)}
            >
                { title }
            </h1>
        );
    }
}

EditorBookContent.propTypes = {
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
    setTooltipText: PropTypes.func.isRequired,
    setLayerContent: PropTypes.func.isRequired
};