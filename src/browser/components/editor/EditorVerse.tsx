import React from 'react';
import PropTypes from 'prop-types';
import { VerseData } from '@src/server/UseCase/GetApp/BookData';

export const EditorVerse = ({ text, numberInChapter }: VerseData) => {
    return <span className="verse"><sup>{ numberInChapter }</sup>{ text }</span>;
};

EditorVerse.propTypes = {
    text: PropTypes.string.isRequired,
    numberInChapter: PropTypes.number.isRequired
};