import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BookJson } from './BookJson';
import { getBookJson } from './getBookJson';
import { App } from '@browser/components/App';
import fs from 'fs';
import Mustache from 'mustache';

const APP_TEMPLATE_FILE_PATH = process.cwd() + '/dist/browser/index.html';

export async function getAppAction(request, reply) {
    const bookJson: BookJson = await getBookJson(
        parseInt(request.params.bookId)
    );

    // TODO error handling

    const template = fs.readFileSync(APP_TEMPLATE_FILE_PATH, 'utf-8');

    reply
        .code(200)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(Mustache.render(
            template.toString(),
            { App: ReactDOMServer.renderToString(<App />) }
        ));
}
