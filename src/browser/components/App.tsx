import React from 'react';
import { hot } from 'react-hot-loader/root';
import { EditorBook } from '@components/editor/EditorBook';
import { Book } from '@components/Book';

const AppInner = ({ bookData, action }) => (
    action === 'edit' ?
        <EditorBook {...bookData} /> :
        <Book {...bookData} />
);

export const App = hot(AppInner);