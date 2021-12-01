import React from 'react';
import PropTypes from 'prop-types';
import { ParagraphData } from '@src/server/UseCase/GetApp/BookData';
import { EditorVerse } from '@components/editor/EditorVerse';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

type Props = ParagraphData & { setTooltipText: (tooltipText: string) => void }

export const EditorParagraph = ({ heading, verses, setTooltipText }: Props) => {
    return <>
        { getHeading() }
        <p className="paragraph">
            { <TooltipTriggerDiv
                key="before"
                tagName="span"
                className="verse-placeholder"
                tooltipText="insert verse"
                setTooltipText={setTooltipText}
            /> }
            { verses
                .map((verseData, index) => [
                    <EditorVerse key={index} {...verseData} />,
                    index !== verses.length - 1 ?
                        <TooltipTriggerDiv
                            key={index + 'after'}
                            tagName="span"
                            className="verse-gap"
                            tooltipText="insert verse"
                            setTooltipText={setTooltipText}
                        /> :
                        null
                ])
            }
            { <TooltipTriggerDiv
                key="after"
                tagName="span"
                className="verse-placeholder"
                tooltipText="insert verse"
                setTooltipText={setTooltipText}
            /> }
        </p>
    </>;

    function getHeading() {
        if ('' === heading) {
            return <TooltipTriggerDiv
                key="paragraph-heading-placeholder"
                className="book-paragraph-heading-placeholder"
                tooltipText="set paragraph heading"
                setTooltipText={setTooltipText}
            />;
        }

        return <h2 className="paragraph-heading">{ heading }</h2>;
    }
};

EditorParagraph.propTypes = {
    heading: PropTypes.string.isRequired,
    verses: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        numberInChapter: PropTypes.number.isRequired
    })).isRequired,
    setTooltipText: PropTypes.func.isRequired
};