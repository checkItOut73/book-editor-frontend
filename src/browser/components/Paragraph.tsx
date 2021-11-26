import React from 'react';
import PropTypes from 'prop-types';
import { Verse } from './Verse';
import { ParagraphData } from '@src/server/UseCase/GetApp/BookData';

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
        text: PropTypes.string.isRequired,
        numberInChapter: PropTypes.number.isRequired
    })).isRequired
};