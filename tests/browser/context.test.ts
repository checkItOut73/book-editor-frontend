import React from 'react';

jest.spyOn(React, 'createContext');

describe('context | ', () => {
    let context;

    function requireModule() {
        context = require('@browser/context');
    }

    test('React.createContext is called correctly', () => {
        requireModule();

        expect(React.createContext).toHaveBeenCalledWith(null);
    });

    test('the context is returned correctly', () => {
        requireModule();

        expect(context.Context).toEqual(React.createContext(null));
    });
});
