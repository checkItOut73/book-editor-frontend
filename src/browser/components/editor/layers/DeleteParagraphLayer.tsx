import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { ParagraphData } from '@server/UseCase/GetApp/BookData';
import { Paragraph } from '@components/Paragraph';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { deleteParagraph } from '@actions/editor/deleteParagraph';

export const DeleteParagraphLayer = ({ id, heading, verses }: ParagraphData) => {
    const { dispatch } = useContext(Context);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    async function fetchToDeleteParagraph() {
        dispatch(fetchApi(
            '/api/paragraph/' + id,
            {
                method: 'DELETE'
            },
            () => {
                setButtonDisabled(true);
                dispatch(deleteParagraph(id));
            }
        ));
    }

    return (
        <div className="delete-paragraph-layer">
            <h2>Paragraph löschen</h2>
            <div className="delete-paragraph-layer__paragraph">
                <Paragraph heading={heading} verses={verses} />
            </div>
            <p>
                <RequestButton disabled={buttonDisabled} className="delete-paragraph-layer__submit" label="Bestätigen" onClick={fetchToDeleteParagraph} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

DeleteParagraphLayer.propTypes = {
    id: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    verses: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        numberInChapter: PropTypes.number.isRequired
    })).isRequired
};
