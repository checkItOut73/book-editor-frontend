import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setChapterHeading } from '@actions/editor/setChapterHeading';

type Props = {
    id: number;
    heading: string;
};

export const EditChapterHeadingLayer = ({ id, heading }: Props) => {
    const { dispatch } = useContext(Context);
    const [headingInputValue, setHeadingInputValue] = useState(heading);

    async function fetchToSetChapterHeading() {
        dispatch(fetchApi(
            '/api/chapter/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    heading: headingInputValue
                })
            },
            () => {
                dispatch(setChapterHeading(id, headingInputValue));
            }
        ));
    }

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
                <RequestButton label="Speichern" onClick={fetchToSetChapterHeading} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

EditChapterHeadingLayer.propTypes = {
    id: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired
};
