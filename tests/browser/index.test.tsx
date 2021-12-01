import React from 'react';

declare global {
    interface Window {
        bookData: any;
        location: Location;
    }
}

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

const AppMock = (props) => <div {...props}>App</div>;
jest.mock('@components/App', () => ({ App: AppMock }));

describe('index | ', () => {
    const rootElement = 'html root element';

    function requireModule() {
        jest.isolateModules(() => {
            require('@browser/index.tsx');
        });
    }

    beforeAll(() => {
        global.window = {
            bookData: '{"title":"Book Title"}',
            location: {
                search: undefined
            } as Location
        } as Window & typeof globalThis;

        // @ts-ignore
        global.document = {
            // @ts-ignore
            getElementById: (id) => {
                if (id === 'root') {
                    return rootElement;
                }
            }
        };
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

    test('the <App /> is hydrated in the root element', () => {
        requireModule();

        expect(ReactDOMMock.hydrate).toHaveBeenCalledWith(
            <AppMock bookData={{ title: 'Book Title' }} action={null} />,
            rootElement
        );
    });

    test('the <App /> is hydrated in the root element with action', () => {
        window.location.search = '?action=edit';

        requireModule();

        expect(ReactDOMMock.hydrate).toHaveBeenCalledWith(
            <AppMock bookData={{ title: 'Book Title' }} action="edit" />,
            rootElement
        );
    });
});
