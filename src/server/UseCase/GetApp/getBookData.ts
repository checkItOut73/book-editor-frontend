import axios from 'axios';
import { BookData } from '@server/UseCase/GetApp/BookData';
import { HTTP_OK } from '@server/types/HttpStatusCodes';

export async function getBookData(bookId: number): Promise<BookData> {
    const response = await axios.get(
        'http://gateway.docker.internal:8080/book/' + bookId
    );

    if (HTTP_OK !== response.status) {
        throw new Error(
            'The resource responded with a bad status code: ' +
                response.status +
                '!'
        );
    }

    return response.data;
}
