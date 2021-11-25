import React from 'react';
import { create } from 'react-test-renderer';
import { App } from '@components/App';

jest.mock('@components/Book', () => ({ Book: (props) => <div {...props}>BookMock</div> }));

jest.mock('react-hot-loader/root', () => ({
    hot: (App) => (props) =>
        (
            <div data-hot-loaded>
                <App {...props} />
            </div>
        )
}));

describe('<App />', () => {
    let component;

    function renderComponent() {
        component = create(<App bookData={{ title: 'Book Title' }} />);
    }

    test('<App /> is rendered correctly with the hot loader', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              data-hot-loaded={true}
            >
              <div
                title="Book Title"
              >
                BookMock
              </div>
            </div>
        `);
    });
});
