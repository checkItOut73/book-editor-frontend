import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BookData } from './BookData';
import { getBookData } from './getBookData';
import { App } from '@browser/components/App';
import fs from 'fs';
import Mustache from 'mustache';

const APP_TEMPLATE_FILE_PATH = process.cwd() + '/dist/browser/index.html';

export async function getAppAction(request, reply) {
    const bookData: BookData = await getBookData(
        parseInt(request.params.bookId)
    );

    // TODO error handling

    const template = fs.readFileSync(APP_TEMPLATE_FILE_PATH, 'utf-8');

    reply
        .code(200)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(Mustache.render(
            template.toString(),
            {
                bookData: JSON.stringify(bookData),
                App: ReactDOMServer.renderToString(<App
                    bookData={bookData}
                    action={request.query.action === 'edit' ? 'edit': null}
                />)
            }
        ));
}
