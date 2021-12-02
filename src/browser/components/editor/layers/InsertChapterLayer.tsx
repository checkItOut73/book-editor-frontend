import React from 'react';
import PropTypes from 'prop-types';

type Props = {
};

export const InsertChapterLayer = ({  }: Props) => (
    <div className="insert-chapter-layer">
        <h2 className="insert-chapter-layer__heading">Kapitel hinzufügen</h2>
        <p>
            <label>Kapitelüberschrift:</label>
            <input className="insert-chapter-layer__heading" />
            <button className="insert-chapter-layer__submit">Hinzufügen</button>
        </p>
    </div>
);

InsertChapterLayer.propTypes = {
};
