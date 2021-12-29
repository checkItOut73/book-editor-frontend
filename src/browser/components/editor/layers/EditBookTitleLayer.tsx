import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setBookTitle } from '@actions/editor/setBookTitle';

type Props = {
    id: number;
    title: string;
};

export const EditBookTitleLayer = ({ id, title }: Props) => {
    const { dispatch } = useContext(Context);
    const [titleInputValue, setTitleInputValue] = useState(title);

    async function fetchToSetBookTitle() {
        dispatch(fetchApi(
            '/api/book/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    title: titleInputValue
                })
            },
            () => {
                dispatch(setBookTitle(titleInputValue));
            }
        ));
    }

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
                <RequestButton label="Speichern" onClick={fetchToSetBookTitle} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

EditBookTitleLayer.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};
