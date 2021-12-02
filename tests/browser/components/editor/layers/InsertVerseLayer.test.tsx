import React from 'react';
import { create } from 'react-test-renderer';
import { InsertVerseLayer } from '@components/editor/layers/InsertVerseLayer';

describe('<InsertVerseLayer />', () => {
    let component;

    function renderComponent() {
        component = create(<InsertVerseLayer />);
    }

    test('<InsertVerseLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-verse-layer"
            >
              <h2
                className="insert-verse-layer__heading"
              >
                Neuen Vers einfügen
              </h2>
              <p>
                <textarea
                  autoFocus={true}
                  className="insert-verse-layer__textarea"
                />
                <button
                  className="insert-verse-layer__submit"
                >
                  Speichern
                </button>
              </p>
            </div>
        `);
    });
});
