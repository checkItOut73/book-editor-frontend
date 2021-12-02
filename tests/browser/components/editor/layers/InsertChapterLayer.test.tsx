import React from 'react';
import { create } from 'react-test-renderer';
import { InsertChapterLayer } from '@components/editor/layers/InsertChapterLayer';

describe('<InsertChapterLayer />', () => {
    let component;

    function renderComponent() {
        component = create(<InsertChapterLayer />);
    }

    test('<InsertChapterLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="insert-chapter-layer"
            >
              <h2
                className="insert-chapter-layer__heading"
              >
                Kapitel hinzufügen
              </h2>
              <p>
                <label>
                  Kapitelüberschrift:
                </label>
                <input
                  className="insert-chapter-layer__heading"
                />
                <button
                  className="insert-chapter-layer__submit"
                >
                  Hinzufügen
                </button>
              </p>
            </div>
        `);
    });
});
