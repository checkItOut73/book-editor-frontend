import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setParagraphHeading } from '@actions/editor/setParagraphHeading';

type Props = {
    id: number;
    heading: string;
};

export const EditParagraphHeadingLayer = ({ id, heading }: Props) => {
    const { dispatch } = useContext(Context);
    const [headingInputValue, setHeadingInputValue] = useState(heading);

    async function fetchToSetParagraphHeading() {
        dispatch(fetchApi(
            '/api/paragraph/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    heading: headingInputValue
                })
            },
            () => {
                dispatch(setParagraphHeading(id, headingInputValue));
            }
        ));
    }

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
                <RequestButton label="Speichern" onClick={fetchToSetParagraphHeading} />
            </p>
            <RequestReponseMessage />
        </div>
    )
};

EditParagraphHeadingLayer.propTypes = {
    id: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired
};
