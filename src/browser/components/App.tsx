import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Book } from './Book';

const AppInner = ({ bookData }) => (
    <Book {...bookData} />
);

export const App = hot(AppInner);