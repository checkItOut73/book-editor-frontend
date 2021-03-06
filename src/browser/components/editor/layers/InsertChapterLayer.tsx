import React, { useState, useContext } from 'react';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setChapters } from '@actions/editor/setChapters';
import { setActiveChapterNumber } from '@actions/navigation/setActiveChapterNumber';
import PropTypes from 'prop-types';

type Props = {
    previousChapterNumber: number;
};

export const InsertChapterLayer = ({ previousChapterNumber }: Props) => {
    const { dispatch, getState } = useContext(Context);
    const [headingInputValue, setHeadingInputValue] = useState('');

    async function fetchToInsertChapter() {
        const { book } = getState();
        const chapters = [];

        if (previousChapterNumber === 0) {
            chapters.push({ heading: headingInputValue });
        }

        book.chapters.forEach((chapter) => {
            chapters.push({ id: chapter.id });

            if (previousChapterNumber === chapter.number) {
                chapters.push({ heading: headingInputValue });
            }
        });

        dispatch(fetchApi(
            '/api/book/' + book.id + '?resultChaptersInResponse=1',
            {
                method: 'PATCH',
                body: JSON.stringify({ chapters })
            },
            (response) => {
                dispatch(setChapters(response.result.chapters));
                dispatch(setActiveChapterNumber(previousChapterNumber + 1));
            }
        ));
    }

    return (
        <div className="insert-chapter-layer">
            <h2 className="insert-chapter-layer__heading">Kapitel hinzufügen</h2>
            <p>
                <label>Kapitelüberschrift:</label>
                <input
                    className="insert-chapter-layer__input"
                    value={headingInputValue}
                    onChange={(event) => setHeadingInputValue(event.target.value)}
                    autoFocus={true}
                />
                <RequestButton className="insert-chapter-layer__submit" label="Hinzufügen" onClick={fetchToInsertChapter} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

InsertChapterLayer.propTypes = {
    previousChapterNumber: PropTypes.number.isRequired
};
