import React, { useState } from 'react';
import PropTypes from 'prop-types';

type Props = {
    title: string
};

export const EditBookTitleLayer = ({ title }: Props) => {
    const [titleInputValue, setTitleInputValue] = useState(title);

    return (
        <div className="edit-book-title-layer">
            <h2>Buchtitel bearbeiten</h2>
            <p>
                <label>Buchtitel:</label>
                <input
                    value={titleInputValue}
                    onChange={(event) => setTitleInputValue(event.target.value)}
                    autoFocus={true}
                />
                <button>Speichern</button>
            </p>
        </div>
    );
};

EditBookTitleLayer.propTypes = {
    title: PropTypes.string.isRequired
};
