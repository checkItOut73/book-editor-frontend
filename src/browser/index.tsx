import './styles/main.scss';
import 'polyfill-array-includes';
import 'classlist-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@components/App';

declare global {
    interface Window { bookData: any; }
}

const searchParams = new URLSearchParams(window.location.search);

ReactDOM.hydrate(
    <App bookData={JSON.parse(window.bookData)} action={searchParams.get('action')} />,
    document.getElementById('root')
);
