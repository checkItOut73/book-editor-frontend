import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@server/UseCase/GetApp/BookData';
import { EditorActiveBookChapterBottomNavigationElement } from '@components/editor/navigation/EditorActiveBookChapterBottomNavigationElement';
import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { InsertChapterLayer } from '@components/editor/layers/InsertChapterLayer';

interface Props {
    chapters: Array<ChapterData>;
    activeChapterNumber: number;
    setActiveChapterNumber: (chapterNumber: number) => void;
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
}
export const EditorBookChapterBottomNavigation = ({ chapters, activeChapterNumber, setActiveChapterNumber, setTooltipText, setLayerContent }: Props) => {
    return (
        <div className="book-chapter-navigation">
            <TooltipTriggerDiv
                key="before"
                className="chapter-placeholder"
                tooltipText="Kapitel hinzufügen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<InsertChapterLayer />)}
            />
            { chapters.map((chapterData) => [
                activeChapterNumber === chapterData.number ?
                    <EditorActiveBookChapterBottomNavigationElement
                        key={chapterData.number}
                        chapterNumber={chapterData.number}
                    /> :
                    <BookChapterNavigationElement
                        key={chapterData.number}
                        chapterNumber={chapterData.number}
                        setActiveChapterNumber={setActiveChapterNumber}
                    />,
                    <TooltipTriggerDiv
                        key={chapterData.number + ':after'}
                        className="chapter-placeholder"
                        tooltipText="Kapitel hinzufügen"
                        setTooltipText={setTooltipText}
                        onClick={() => setLayerContent(<InsertChapterLayer />)}
                    />
            ]) }
        </div>
    );
};

EditorBookChapterBottomNavigation.propTypes = {
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
    setActiveChapterNumber: PropTypes.func.isRequired,
    setTooltipText: PropTypes.func.isRequired,
    setLayerContent: PropTypes.func.isRequired
};
