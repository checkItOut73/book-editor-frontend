import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { ChapterData } from '@server/UseCase/GetApp/BookData';
import { Chapter } from '@components/Chapter';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { deleteChapter } from '@actions/editor/deleteChapter';
import { decrementActiveChapterNumber } from '@actions/navigation/decrementActiveChapterNumber';

export const DeleteChapterLayer = ({ id, number, heading, paragraphs }: ChapterData) => {
    const { dispatch, getState } = useContext(Context);
    const { navigation: { activeChapterNumber }, book: { chapters }} = getState();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    async function fetchToDeleteChapter() {
        dispatch(fetchApi(
            '/api/chapter/' + id,
            {
                method: 'DELETE'
            },
            () => {
                setButtonDisabled(true);
                dispatch(deleteChapter(id));

                if (isLastChapterActive()) {
                    dispatch(decrementActiveChapterNumber());
                }
            }
        ));
    }

    function isLastChapterActive(): boolean {
        return chapters.length == activeChapterNumber;
    }

    return (
        <div className="delete-chapter-layer">
            <h2>Kapitel löschen</h2>
            <div className="delete-chapter-layer__chapter">
                <Chapter heading={heading} number={number} paragraphs={paragraphs} />
            </div>
            <p>
                <RequestButton
                    disabled={buttonDisabled}
                    className="delete-chapter-layer__submit"
                    label={ buttonDisabled ? 'Gelöscht' : 'Bestätigen' }
                    onClick={fetchToDeleteChapter}
                />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

DeleteChapterLayer.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        numberInChapter: PropTypes.number.isRequired,
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            numberInParagraph: PropTypes.number.isRequired,
            numberInChapter: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })).isRequired
    })).isRequired
};
