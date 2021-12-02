import React from 'react';
import { create } from 'react-test-renderer';
import { InsertParagraphLayer } from '@components/editor/layers/InsertParagraphLayer';

describe('<InsertParagraphLayer />', () => {
    let component;

    function renderComponent() {
        component = create(<InsertParagraphLayer />);
    }

    test('<InsertParagraphLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-paragraph-layer"
            >
              <h2>
                Neuen Paragraphen einfügen
              </h2>
              <p>
                <label>
                  Paragraphüberschrift:
                </label>
                <input
                  autoFocus={true}
                />
                <button>
                  Hinzufügen
                </button>
              </p>
            </div>
        `);
    });
});
