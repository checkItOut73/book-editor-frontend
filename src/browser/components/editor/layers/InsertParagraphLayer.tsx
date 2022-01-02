import React, { useState, useContext } from 'react';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setParagraphs } from '@actions/editor/setParagraphs';
import PropTypes from 'prop-types';

type Props = {
    chapterId: number;
    previousParagraphNumber: number;
};

export const InsertParagraphLayer = ({ chapterId, previousParagraphNumber }: Props) => {
    const { dispatch, getState } = useContext(Context);
    const [headingInputValue, setHeadingInputValue] = useState('');

    async function fetchToInsertParagraph() {
        const { book: { chapters }} = getState();
        const chapter = chapters.find((chapter) => chapter.id === chapterId);

        const paragraphs = [];

        if (previousParagraphNumber === 0) {
            paragraphs.push({ heading: headingInputValue });
        }

        chapter.paragraphs.forEach((paragraph) => {
            paragraphs.push({ id: paragraph.id });

            if (previousParagraphNumber === paragraph.numberInChapter) {
                paragraphs.push({ heading: headingInputValue });
            }
        });

        dispatch(fetchApi(
            '/api/chapter/' + chapterId + '?resultParagraphsInResponse=1',
            {
                method: 'PATCH',
                body: JSON.stringify({ paragraphs })
            },
            (response) => {
                dispatch(setParagraphs(chapterId, response.result.paragraphs));
            }
        ));
    }

    return (
        <div className="insert-paragraph-layer">
            <h2 className="insert-paragraph-layer__heading">Paragraph hinzufügen</h2>
            <p>
                <label>Paragraphüberschrift:</label>
                <input
                    className="insert-paragraph-layer__input"
                    value={headingInputValue}
                    onChange={(event) => setHeadingInputValue(event.target.value)}
                    autoFocus={true}
                />
                <RequestButton className="insert-paragraph-layer__submit" label="Hinzufügen" onClick={fetchToInsertParagraph} />
            </p>
            <RequestReponseMessage />
        </div>
    );
};

InsertParagraphLayer.propTypes = {
    chapterId: PropTypes.number.isRequired,
    previousParagraphNumber: PropTypes.number.isRequired
};
