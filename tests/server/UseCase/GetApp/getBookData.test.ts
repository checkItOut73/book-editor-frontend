import { getBookData } from '@server/UseCase/GetApp/getBookData';
import { Mock } from '@tests/__types__/Mock';
import { HTTP_OK, HTTP_NOT_FOUND } from '@server/types/HttpStatusCodes';
import axios from 'axios';

jest.mock('axios');

const axiosMock: Mock<typeof axios> = axios;
axiosMock.get.mockReturnValue(
    Promise.resolve({
        status: HTTP_OK,
        data: { title: 'Book Title' }
    })
);

describe('getBookData | ', () => {
    test('getBookData performs the correct request', () => {
        getBookData(5);

        expect(axiosMock.get).toHaveBeenCalledWith(
            'http://docker-vm:8080/book/5'
        );
    });

    test('getBookData returns the response data correctly', () => {
        return expect(getBookData(5)).resolves.toEqual({ title: 'Book Title' });
    });

    describe('if the request fails with an error', () => {
        beforeEach(() => {
            axiosMock.get.mockReturnValue(
                Promise.reject(new Error('request error!'))
            );
        });

        test('getBookData rejects this error', () => {
            return expect(getBookData(5)).rejects.toEqual(
                new Error('request error!')
            );
        });
    });

    describe('if the request returns a bad status code', () => {
        beforeEach(() => {
            axiosMock.get.mockReturnValue(
                Promise.resolve({ status: HTTP_NOT_FOUND })
            );
        });

        test('getBookData rejects a corresponding error', () => {
            return expect(getBookData(5)).rejects.toEqual(
                new Error(
                    'The resource responded with a bad status code: ' +
                        HTTP_NOT_FOUND +
                        '!'
                )
            );
        });
    });
});
