import React from 'react';
import PropTypes from 'prop-types';
import { VerseData } from '@src/server/UseCase/GetApp/BookData';

export const Verse = ({ text, numberInChapter }: VerseData) => {
    return <span><sup>{ numberInChapter }</sup>{ text }</span>;
};

Verse.propTypes = {
    text: PropTypes.string.isRequired,
    numberInChapter: PropTypes.number.isRequired
};