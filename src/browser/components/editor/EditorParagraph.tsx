import React from 'react';
import PropTypes from 'prop-types';
import { ParagraphData } from '@server/UseCase/GetApp/BookData';
import { EditorVerse } from '@components/editor/EditorVerse';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { InsertVerseLayer } from '@components/editor/layers/InsertVerseLayer';
import { DeleteParagraphLayer } from '@components/editor/layers/DeleteParagraphLayer';
import { EditParagraphHeadingLayer } from '@components/editor/layers/EditParagraphHeadingLayer';

type Props = ParagraphData & {
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
}

export const EditorParagraph = ({ heading, verses, setTooltipText, setLayerContent }: Props) => {
    return <div className="paragraph-container">
        { getHeading() }
        <p className="paragraph">
            <span
                className="paragraph__closer"
                onClick={() => setLayerContent(
                    <DeleteParagraphLayer heading={heading} verses={verses} />
                )}
            />
            <TooltipTriggerDiv
                key="before"
                tagName="strong"
                className="verse-placeholder"
                tooltipText="Vers einfügen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<InsertVerseLayer />)}
            />
            { verses
                .map((verseData, index) => [
                    <EditorVerse
                        key={index}
                        {...verseData}
                        setLayerContent={setLayerContent}
                    />,
                    index !== verses.length - 1 ?
                        <TooltipTriggerDiv
                            key={index + 'after'}
                            tagName="span"
                            className="verse-gap"
                            tooltipText="Vers einfügen"
                            setTooltipText={setTooltipText}
                            onClick={() => setLayerContent(<InsertVerseLayer />)}
                        /> :
                        null
                ])
            }
            { verses.length > 0 ?
                <TooltipTriggerDiv
                    key="after"
                    tagName="strong"
                    className="verse-placeholder"
                    tooltipText="Vers einfügen"
                    setTooltipText={setTooltipText}
                    onClick={() => setLayerContent(<InsertVerseLayer />)}
                /> : null
            }
        </p>
    </div>;

    function getHeading() {
        if ('' === heading) {
            return <TooltipTriggerDiv
                key="paragraph-heading-placeholder"
                className="book-paragraph-heading-placeholder"
                tooltipText="Paragraphüberschrift festlegen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<EditParagraphHeadingLayer heading="" />)}
            />;
        }

        return (
            <h2
                className="paragraph-heading"
                onClick={() => setLayerContent(<EditParagraphHeadingLayer heading={ heading } />)}
            >
                { heading }
            </h2>
        );
    }
};

EditorParagraph.propTypes = {
    heading: PropTypes.string.isRequired,
    verses: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        numberInChapter: PropTypes.number.isRequired
    })).isRequired,
    setTooltipText: PropTypes.func.isRequired,
    setLayerContent: PropTypes.func.isRequired
};