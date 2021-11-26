import React from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { Paragraph } from './Paragraph';

type Props = ChapterData & { children };

export const Chapter = ({ children, heading, paragraphs }: Props) => {
    return <div className="book-chapter">
        { children }
        { getHeading() }
        <>
            { paragraphs.map((paragraphData, index) => <Paragraph key={index} {...paragraphData} />) }
        </>
    </div>;

    function getHeading() {
        if ('' === heading) {
            return null;
        }

        return <h2 key="chapter-heading">{ heading }</h2>;
    }
};

Chapter.propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            numberInChapter: PropTypes.number.isRequired
        })).isRequired
    })).isRequired
};