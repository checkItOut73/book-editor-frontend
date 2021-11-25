import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@components/App';

declare global {
    interface Window { bookData: any; }
}

ReactDOM.hydrate(<App bookData={JSON.parse(window.bookData)} />, document.getElementById('root'));
