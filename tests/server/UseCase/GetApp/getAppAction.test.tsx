import React from 'react';
import { getAppAction } from '@server/UseCase/GetApp/getAppAction';
import { getBookData } from '@server/UseCase/GetApp/getBookData';
import { MockFunction } from '@tests/__types__/MockFunction';
import { Mock } from '@tests/__types__/Mock';
import fs from 'fs';

const getBookDataMock: MockFunction<typeof getBookData> = getBookData;

jest.mock('@server/UseCase/GetApp/getBookData');
jest.mock('@browser/components/App', () => ({ App: () => <div data-app /> }));
jest.mock('fs');

const fsMock: Mock<typeof fs> = fs;
const template = '<html><body><script type="text/javascript">' +
    'window.bookData = "{{{bookData}}}";</script>' +
    '<div id="app">{{{App}}}</div></body></html>';
fsMock.readFileSync.mockReturnValue(template);

describe('getAppAction | ', () => {
    let request;
    const reply = {
        code: jest.fn(() => reply),
        header: jest.fn(() => reply),
        send: jest.fn(() => reply)
    };

    beforeEach(() => {
        request = {
            params: { bookId: '52' }
        };
    });

    test('getAppAction calls getBookData correctly', () => {
        getAppAction(request, reply);

        expect(getBookDataMock).toHaveBeenCalledWith(52);
    });

    test('getAppAction reads the template file correctly', async () => {
        await getAppAction(request, reply);

        expect(fsMock.readFileSync).toHaveBeenCalledWith(
            process.cwd() + '/dist/browser/index.html',
            'utf-8'
        )
    });

    test('getAppAction sends the correct reply', async () => {
        getBookDataMock.mockReturnValue(
            Promise.resolve({
                title: 'Book Title',
                chapters: []
            })
        );

        await getAppAction(request, reply);

        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.header).toHaveBeenCalledWith(
            'Content-Type',
            'text/html; charset=utf-8'
        );
        expect(reply.send).toHaveBeenCalledWith(
            '<html><body><script type=\"text/javascript\">' +
            'window.bookData = \"{\"title\":\"Book Title\",\"chapters\":[]}\";' +
            '</script><div id=\"app\"><div data-app=\"true\" data-reactroot=\"\">' +
            '</div></div></body></html>'
        );
    });
});
