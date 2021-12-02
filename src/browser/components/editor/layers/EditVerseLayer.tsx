import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    text: string;
    numberInChapter: number;
};

export const EditVerseLayer = ({ text, numberInChapter }: Props) => {
    return (
        <div className="edit-verse-layer">
            <h2 className="edit-verse-layer__heading">Vers bearbeiten</h2>
            <p>
                <textarea
                    className="edit-verse-layer__textarea"
                    defaultValue={text}
                />
                <span className="textarea-flap">{ numberInChapter }</span>
                <button className="edit-verse-layer__submit">Speichern</button>
            </p>
        </div>
    );
}

EditVerseLayer.propTypes = {
    text: PropTypes.string.isRequired,
    numberInChapter: PropTypes.number.isRequired
};
