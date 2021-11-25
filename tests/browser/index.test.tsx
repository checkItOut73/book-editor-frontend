/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';

declare global {
    interface Window { bookData: any; }
}

const AppMock = (props) => <div {...props}>App</div>;
jest.mock('@components/App', () => ({ App: AppMock }));
jest.mock('react-dom');

describe('index | ', () => {
    let rootElement;

    function requireModule() {
        require('@browser/index.tsx');
    }

    beforeAll(() => {
        window.bookData = '{"title":"Book Title"}';
    });

    beforeEach(() => {
        rootElement = document.createElement('div');
        rootElement.id = 'root';
        document.body.appendChild(rootElement);
    });

    test('the <App /> in hydrated in the root element', () => {
        requireModule();

        expect(ReactDOM.hydrate).toHaveBeenCalledWith(<AppMock bookData={{ title: 'Book Title' }} />, rootElement);
    });
});
