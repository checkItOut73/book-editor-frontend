import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { EditorParagraph } from '@components/editor/EditorParagraph';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

export type ChapterProps = ChapterData & {
    setTooltipText: (tooltipText: string) => void;
    children;
};
export const EditorChapter = ({ heading, paragraphs, setTooltipText, children }: ChapterProps) => {
    return (
        <div>
            { children }
            { getHeading() }
            <>
                { <TooltipTriggerDiv
                    key="before"
                    className="paragraph-gap"
                    tooltipText="insert paragraph"
                    setTooltipText={setTooltipText}
                /> }
                { paragraphs.map((paragraphData, index) => [
                    <EditorParagraph key={index} {...paragraphData} setTooltipText={setTooltipText} />,
                    <TooltipTriggerDiv
                        key={index + 'after'}
                        className="paragraph-gap"
                        tooltipText="insert paragraph"
                        setTooltipText={setTooltipText}
                    />
                ]) }
            </>
        </div>
    );

    function getHeading() {
        if ('' === heading) {
            return <TooltipTriggerDiv
                className="book-chapter-heading-placeholder"
                tooltipText="set chapter heading"
                setTooltipText={setTooltipText}
            />;
        }

        return <h2 key="chapter-heading" className="chapter-heading">{ heading }</h2>;
    }
};

EditorChapter.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            numberInChapter: PropTypes.number.isRequired
        })).isRequired
    })).isRequired,
    setTooltipText: PropTypes.func.isRequired,
    children: PropTypes.node
};
