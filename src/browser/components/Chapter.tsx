import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { Paragraph } from './Paragraph';

export const Chapter = ({ heading, paragraphs }: ChapterData) => {
    return <div className="book-chapter">
        { getHeading() }
        <>
            { paragraphs.map((paragraphData, index) => <Paragraph key={index} {...paragraphData} />) }
        </>
    </div>;

    function getHeading() {
        if ('' === heading) {
            return null;
        }

        return <h2>{ heading }</h2>;
    }
};

Chapter.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            numberInChapter: PropTypes.number.isRequired
        })).isRequired
    })).isRequired
};