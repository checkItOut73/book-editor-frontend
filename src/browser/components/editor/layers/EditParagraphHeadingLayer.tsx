import React, {useState} from 'react';
import PropTypes from 'prop-types';

type Props = {
    heading: string
};

export const EditParagraphHeadingLayer = ({ heading }: Props) => {
    const [headingInputValue, setHeadingInputValue] = useState(heading);

    return(
        <div className="edit-paragraph-heading-layer">
            <h2>Paragraphüberschrift bearbeiten</h2>
            <p>
                <label>Paragraphüberschrift:</label>
                <input
                    value={headingInputValue}
                    onChange={(event) => setHeadingInputValue(event.target.value)}
                    autoFocus={true}
                />
                <button>Speichern</button>
            </p>
        </div>
    )
};

EditParagraphHeadingLayer.propTypes = {
    heading: PropTypes.string.isRequired
};
