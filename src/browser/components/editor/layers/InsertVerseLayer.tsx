import React from 'react';
import PropTypes from 'prop-types';

type Props = {
};

export const InsertVerseLayer = ({ }: Props) => (
    <div className="insert-verse-layer">
        <h2 className="insert-verse-layer__heading">Neuen Vers einfügen</h2>
        <p>
            <textarea className="insert-verse-layer__textarea" autoFocus={true}></textarea>
            <button className="insert-verse-layer__submit">Speichern</button>
        </p>
    </div>
);

InsertVerseLayer.propTypes = {
};
