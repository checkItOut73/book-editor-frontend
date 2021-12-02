import React from 'react';
import PropTypes from 'prop-types';

type Props = {
};

export const InsertParagraphLayer = ({  }: Props) => (
    <div className="insert-paragraph-layer">
        <h2>Neuen Paragraphen einfügen</h2>
        <p>
            <label>Paragraphüberschrift:</label>
            <input autoFocus={true} />
            <button>Hinzufügen</button>
        </p>
    </div>
);

InsertParagraphLayer.propTypes = {
};
