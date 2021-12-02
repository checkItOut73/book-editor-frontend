import React, {useState} from 'react';
import PropTypes from 'prop-types';

type Props = {
    heading: string
};

export const EditChapterHeadingLayer = ({ heading }: Props) => {
    const [headingInputValue, setHeadingInputValue] = useState(heading);

    return (
        <div className="edit-chapter-heading-layer">
            <h2>Kapitelüberschrift bearbeiten</h2>
            <p>
                <label>Kapitelüberschrift:</label>
                <input
                    value={headingInputValue}
                    onChange={(event) => setHeadingInputValue(event.target.value)}
                    autoFocus={true}
                />
                <button>Speichern</button>
            </p>
        </div>
    );
};

EditChapterHeadingLayer.propTypes = {
    heading: PropTypes.string.isRequired
};
