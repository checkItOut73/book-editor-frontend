import React from 'react';
import { getAppAction } from '@server/UseCase/GetApp/getAppAction';
import { getBookJson } from '@server/UseCase/GetApp/getBookJson';
import { MockFunction } from '@tests/__types__/MockFunction';

const getBookJsonMock: MockFunction<typeof getBookJson> = getBookJson;

jest.mock('@server/UseCase/GetApp/getBookJson');
jest.mock('@browser/components/App', () => ({ App: () => <div data-app /> }));

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
        expect(reply.send).toHaveBeenCalledWith('<div data-app=\"true\" data-reactroot=\"\"></div>');
    });
});
