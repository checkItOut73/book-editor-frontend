import React from 'react';
import PropTypes from 'prop-types';
import { VerseData } from '@server/UseCase/GetApp/BookData';
import { EditVerseLayer } from '@components/editor/layers/EditVerseLayer';

type Props = VerseData & { setLayerContent: (layerContent:JSX.Element) => void };

export const EditorVerse = ({ id, numberInChapter, text, setLayerContent }: Props) => {
    return (
        <span
            className="verse"
            onClick={() => setLayerContent(<EditVerseLayer id={id} text={text} numberInChapter={numberInChapter} />)}
        >
            <sup>{ numberInChapter }</sup>
            { text }
        </span>
    );
};

EditorVerse.propTypes = {
    id: PropTypes.number.isRequired,
    numberInChapter: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    setLayerContent: PropTypes.func.isRequired
};