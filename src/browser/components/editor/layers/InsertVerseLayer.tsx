import React, { useState, useContext } from 'react';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setVerses } from '@actions/editor/setVerses';
import PropTypes from 'prop-types';

type Props = {
    paragraphId: number;
    previousVerseNumber: number;
};

export const InsertVerseLayer = ({ paragraphId, previousVerseNumber }: Props) => {
    const { dispatch, getState } = useContext(Context);
    const textareaRef = React.createRef<HTMLTextAreaElement>();

    async function fetchToInsertVerse() {
        const text = textareaRef.current.value;
        const { book: { chapters }} = getState();
        const paragraph = chapters.map((chapter) => chapter.paragraphs).flat().find((paragraph) => paragraph.id === paragraphId);

        const verses = [];

        if (previousVerseNumber === 0) {
            verses.push({ text });
        }

        paragraph.verses.forEach((verse) => {
            verses.push({ id: verse.id });

            if (previousVerseNumber === verse.numberInChapter) {
                verses.push({ text });
            }
        });

        dispatch(fetchApi(
            '/api/paragraph/' + paragraphId + '?resultVersesInResponse=1',
            {
                method: 'PATCH',
                body: JSON.stringify({ verses })
            },
            (response) => {
                dispatch(setVerses(paragraphId, response.result.verses));
            }
        ));
    }

    return (
        <div className="insert-verse-layer">
            <h2 className="insert-verse-layer__heading">Neuen Vers einfügen</h2>
            <p>
                <textarea
                    className="insert-verse-layer__textarea"
                    autoFocus={true}
                    ref={textareaRef}
                />
                <RequestButton className="insert-verse-layer__submit" label="Hinzufügen" onClick={fetchToInsertVerse} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

InsertVerseLayer.propTypes = {
    paragraphId: PropTypes.number.isRequired,
    previousVerseNumber: PropTypes.number.isRequired
};
