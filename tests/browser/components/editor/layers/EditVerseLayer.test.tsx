import React from 'react';
import { create } from 'react-test-renderer';
import { EditVerseLayer } from '@components/editor/layers/EditVerseLayer';

describe('<EditVerseLayer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.',
            numberInChapter: 5
        };
    });

    function renderComponent() {
        component = create(<EditVerseLayer {...props} />);
    }

    test('<EditVerseLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-verse-layer"
            >
              <h2
                className="edit-verse-layer__heading"
              >
                Vers bearbeiten
              </h2>
              <p>
                <textarea
                  className="edit-verse-layer__textarea"
                  defaultValue="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                />
                <span
                  className="textarea-flap"
                >
                  5
                </span>
                <button
                  className="edit-verse-layer__submit"
                >
                  Speichern
                </button>
              </p>
            </div>
        `);
    });
});
