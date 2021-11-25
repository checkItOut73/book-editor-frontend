import React from 'react';
import { getAppAction } from '@server/UseCase/GetApp/getAppAction';
import { getBookJson } from '@server/UseCase/GetApp/getBookJson';
import { MockFunction } from '@tests/__types__/MockFunction';
import { Mock } from '@tests/__types__/Mock';
import fs from 'fs';

const getBookJsonMock: MockFunction<typeof getBookJson> = getBookJson;

jest.mock('@server/UseCase/GetApp/getBookJson');
jest.mock('@browser/components/App', () => ({ App: () => <div data-app /> }));
jest.mock('fs');

const fsMock: Mock<typeof fs> = fs;
const template = '<html><body>{{{App}}}</body></html>';
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

    test('getAppAction calls getBookJson correctly', () => {
        getAppAction(request, reply);

        expect(getBookJsonMock).toHaveBeenCalledWith(52);
    });

    test('getAppAction reads the template file correctly', async () => {
        await getAppAction(request, reply);

        expect(fsMock.readFileSync).toHaveBeenCalledWith(
            process.cwd() + '/dist/browser/index.html',
            'utf-8'
        )
    });

    test('getAppAction sends the correct reply', async () => {
        getBookJsonMock.mockReturnValue(
            Promise.resolve({ title: 'Book Title' })
        );

        await getAppAction(request, reply);

        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.header).toHaveBeenCalledWith(
            'Content-Type',
            'text/html; charset=utf-8'
        );
        expect(reply.send).toHaveBeenCalledWith('<html><body><div data-app=\"true\" data-reactroot=\"\"></div></body></html>');
    });
});
