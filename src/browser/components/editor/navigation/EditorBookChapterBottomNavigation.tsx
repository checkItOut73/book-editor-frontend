import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@server/UseCase/GetApp/BookData';
import { EditorActiveBookChapterBottomNavigationElement } from '@components/editor/navigation/EditorActiveBookChapterBottomNavigationElement';
import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { InsertChapterLayer } from '@components/editor/layers/InsertChapterLayer';
import { Context } from '@browser/context';
import { setActiveChapterNumber } from '@actions/navigation/setActiveChapterNumber';

interface Props {
    chapters: Array<ChapterData>;
    setTooltipText: (tooltipText: string) => void;
    setLayerContent: (layerContent: JSX.Element) => void;
}
export const EditorBookChapterBottomNavigation = ({ chapters, setTooltipText, setLayerContent }: Props) => {
    const { dispatch, getState } = useContext(Context);
    const { navigation: { activeChapterNumber }, book: { id: bookId }} = getState();

    return (
        <div className="book-chapter-navigation">
            <TooltipTriggerDiv
                key="before"
                className="chapter-placeholder"
                tooltipText="Kapitel hinzufügen"
                setTooltipText={setTooltipText}
                onClick={() => setLayerContent(<InsertChapterLayer previousChapterNumber={0} />)}
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
                        setActiveChapterNumber={(chapterNumber) => dispatch(setActiveChapterNumber(chapterNumber))}
                    />,
                    <TooltipTriggerDiv
                        key={chapterData.number + ':after'}
                        className="chapter-placeholder"
                        tooltipText="Kapitel hinzufügen"
                        setTooltipText={setTooltipText}
                        onClick={() => setLayerContent(<InsertChapterLayer previousChapterNumber={chapterData.number} />)}
                    />
            ]) }
        </div>
    );
};

EditorBookChapterBottomNavigation.propTypes = {
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
