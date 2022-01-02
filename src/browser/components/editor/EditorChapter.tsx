import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@server/UseCase/GetApp/BookData';
import { EditorParagraph } from '@components/editor/EditorParagraph';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { EditChapterHeadingLayer } from '@components/editor/layers/EditChapterHeadingLayer';
import { InsertParagraphLayer } from '@components/editor/layers/InsertParagraphLayer';
import { DeleteChapterLayer } from '@components/editor/layers/DeleteChapterLayer';

export type ChapterProps = ChapterData & {
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
    children;
};
export const EditorChapter = ({ id, heading, number, paragraphs, setTooltipText, setLayerContent, children }: ChapterProps) => {
    return (
        <div className="chapter">
            <span
                className="chapter__closer"
                onClick={() => setLayerContent(
                    <DeleteChapterLayer id={id} heading={heading} number={number} paragraphs={paragraphs} />
                )}
            />
            { children }
            { getHeading() }
            <>
                <TooltipTriggerDiv
                    key="before"
                    className="paragraph-gap"
                    tooltipText="Paragraph einfügen"
                    setTooltipText={setTooltipText}
                    onClick={() => setLayerContent(<InsertParagraphLayer />)}
                />
                { paragraphs.map((paragraphData, index) => [
                    <EditorParagraph
                        key={index}
                        {...paragraphData}
                        setTooltipText={setTooltipText}
                        setLayerContent={setLayerContent}
                    />,
                    <TooltipTriggerDiv
                        key={index + 'after'}
                        className="paragraph-gap"
                        tooltipText="Paragraph einfügen"
                        setTooltipText={setTooltipText}
                        onClick={() => setLayerContent(<InsertParagraphLayer />)}
                    />
                ]) }
            </>
        </div>
    );

    function getHeading() {
        if ('' === heading) {
            return <TooltipTriggerDiv
                className="book-chapter-heading-placeholder"
                tooltipText="Kapitelüberschrift festlegen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<EditChapterHeadingLayer id={id} heading="" />)}
            />;
        }

        return (
            <h2
                key="chapter-heading"
                className="chapter-heading"
                onClick={() => setLayerContent(<EditChapterHeadingLayer id={id} heading={ heading } />)}
            >
                { heading }
            </h2>
        );
    }
};

EditorChapter.propTypes = {
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
    })).isRequired,
    setTooltipText: PropTypes.func.isRequired,
    setLayerContent: PropTypes.func.isRequired,
    children: PropTypes.node
};
