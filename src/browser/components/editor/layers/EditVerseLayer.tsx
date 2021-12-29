import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@browser/context';
import { fetchApi } from '@actions/requesting/fetchApi';
import { RequestReponseMessage } from '@components/requesting/RequestReponseMessage';
import { RequestButton } from '@components/requesting/RequestButton';
import { setVerseText } from '@actions/editor/setVerseText';

type Props = {
    id: number;
    text: string;
    numberInChapter: number;
};

export const EditVerseLayer = ({ id, text, numberInChapter }: Props) => {
    const { dispatch } = useContext(Context);
    const textareaRef = React.createRef<HTMLTextAreaElement>();

    async function fetchToSetVerseText() {
        const text = textareaRef.current.value;

        dispatch(fetchApi(
            '/api/verse/' + id,
            {
                method: 'PATCH',
                body: JSON.stringify({ text })
            },
            () => {
                dispatch(setVerseText(id, text));
            }
        ));
    }

    return (
        <div className="edit-verse-layer">
            <h2 className="edit-verse-layer__heading">Vers bearbeiten</h2>
            <p>
                <textarea
                    className="edit-verse-layer__textarea"
                    defaultValue={text}
                    ref={textareaRef}
                />
                <span className="textarea-flap">{ numberInChapter }</span>
                <RequestButton className="edit-verse-layer__submit" label="Speichern" onClick={fetchToSetVerseText} />
            </p>
            <RequestReponseMessage />
        </div>
    );
}

EditVerseLayer.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    numberInChapter: PropTypes.number.isRequired
};
