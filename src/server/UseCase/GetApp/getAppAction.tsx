import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BookJson } from './BookJson';
import { getBookJson } from './getBookJson';
import { App } from '@browser/components/App';

export async function getAppAction(request, reply) {
    const bookJson: BookJson = await getBookJson(
        parseInt(request.params.bookId)
    );

    // TODO error handling

    reply
        .code(200)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(ReactDOMServer.renderToString(
            <App />
        ));
}
