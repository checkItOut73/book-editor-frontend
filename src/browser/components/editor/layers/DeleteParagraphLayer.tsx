import React from 'react';
import PropTypes from 'prop-types';
import { ParagraphData } from '@server/UseCase/GetApp/BookData';
import { Paragraph } from '@components/Paragraph';

export const DeleteParagraphLayer = ({ heading, verses }: ParagraphData) => (
    <div className="delete-paragraph-layer">
        <h2>Paragraph löschen</h2>
        <div className="delete-paragraph-layer__paragraph">
            <Paragraph heading={heading} verses={verses} />
        </div>
        <p>
            <button className="delete-paragraph-layer__submit">Bestätigen</button>
        </p>
    </div>
);

DeleteParagraphLayer.propTypes = {
    heading: PropTypes.string.isRequired,
    verses: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        numberInChapter: PropTypes.number.isRequired
    })).isRequired,
};
