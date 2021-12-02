import React from 'react';
import PropTypes from 'prop-types';
import { VerseData } from '@src/server/UseCase/GetApp/BookData';
import { EditVerseLayer } from '@components/editor/layers/EditVerseLayer';

type Props = VerseData & { setLayerContent: (layerContent:JSX.Element) => void };

export const EditorVerse = ({ text, numberInChapter, setLayerContent }: Props) => {
    return (
        <span
            className="verse"
            onClick={() => setLayerContent(<EditVerseLayer text={text} numberInChapter={numberInChapter} />)}
        >
            <sup>{ numberInChapter }</sup>
            { text }
        </span>
    );
};

EditorVerse.propTypes = {
    text: PropTypes.string.isRequired,
    numberInChapter: PropTypes.number.isRequired,
    setLayerContent: PropTypes.func.isRequired
};