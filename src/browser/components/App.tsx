import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Test } from './Test';

const AppInner = () => (
    <h1>hello world ! <Test /></h1>
);

export const App = hot(AppInner);
