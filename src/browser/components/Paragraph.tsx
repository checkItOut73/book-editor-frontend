import React from 'react';
import PropTypes from 'prop-types';
import { Verse } from '@components/Verse';
import { ParagraphData } from '@server/UseCase/GetApp/BookData';

export const Paragraph = ({ heading, verses }: ParagraphData) => {
    return <>
        { getHeading() }
        <p>
            { verses.map((verseData, index) => <Verse key={index} {...verseData} />) }
        </p>
    </>;

    function getHeading() {
        if ('' === heading) {
            return null;
        }

        return <h2>{ heading }</h2>;
    }
};

Paragraph.propTypes = {
    heading: PropTypes.string.isRequired,
    verses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        numberInParagraph: PropTypes.number.isRequired,
        numberInChapter: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired
};