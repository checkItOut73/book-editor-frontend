/**
 * @jest-environment jsdom
 */

import React from 'react';

declare global {
    interface Window { bookData: any; }
}

const AppMock = (props) => <div {...props}>App</div>;

const mainScssRequireSpy = jest.fn();
jest.doMock('./styles/main.scss', () => {
    mainScssRequireSpy();
});

const polyfillArrayIncludesSpy = jest.fn();
jest.doMock('polyfill-array-includes', () => {
    polyfillArrayIncludesSpy();
});

const classListPolyfillSpy = jest.fn();
jest.doMock('classlist-polyfill', () => {
    classListPolyfillSpy();
});

const ReactDOMMock = {
    hydrate: jest.fn()
};
jest.doMock('react-dom', () => ReactDOMMock);

jest.mock('@components/App', () => ({ App: AppMock }));

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

    afterEach(() => {
        jest.resetModules();
    });

    test('the main.scss is loaded properly', () => {
        requireModule();

        expect(mainScssRequireSpy).toHaveBeenCalled();
    });

    test('the polyfill-array-includes is loaded properly', () => {
        requireModule();

        expect(polyfillArrayIncludesSpy).toHaveBeenCalled();
    });

    test('the classlist-polyfill is loaded properly', () => {
        requireModule();

        expect(classListPolyfillSpy).toHaveBeenCalled();
    });

    test('the <App /> in hydrated in the root element', () => {
        requireModule();

        expect(ReactDOMMock.hydrate).toHaveBeenCalledWith(<AppMock bookData={{ title: 'Book Title' }} />, rootElement);
    });
});
