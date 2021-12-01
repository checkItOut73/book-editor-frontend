import React from 'react';
import { create } from 'react-test-renderer';
import { App } from '@components/App';

jest.mock('react-hot-loader/root', () => ({
    hot: (App) => (props) =>
        (
            <div data-hot-loaded>
                <App {...props} />
            </div>
        )
}));

jest.mock('@components/editor/EditorBook', () => ({
    EditorBook: (props) => <div {...props}>EditorBookMock</div>
}));
jest.mock('@components/Book', () => ({
    Book: (props) => <div {...props}>BookMock</div>
}));

describe('<App />', () => {
    let component;
    let props;

    beforeEach(() => {
        props = {
            bookData: { title: 'Book Title' },
            action: null
        };
    });

    function renderComponent() {
        component = create(<App {...props} />);
    }

    test('<App /> renders <Book /> correctly with the hot loader', () => {
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

    describe('if "edit" action is given', () => {
        beforeEach(() => {
            props.action = 'edit';
        });

        test('<App /> renders <EditorBook/> correctly with the hot loader', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  data-hot-loaded={true}
                >
                  <div
                    title="Book Title"
                  >
                    EditorBookMock
                  </div>
                </div>
            `);
        });
    });
});
