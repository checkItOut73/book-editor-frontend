import React from 'react';
import PropTypes from 'prop-types';

interface Props {
    title: string
};
export const Book = ({ title }: Props) => (
    <h1>{ title }</h1>
);

Book.propTypes = {
    title: PropTypes.string
};