import React from 'react';
import { create } from 'react-test-renderer';
import { EditorVerse } from '@components/editor/EditorVerse';

describe('<EditorVerse />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.',
            numberInChapter: 5
        };
    });

    function renderComponent() {
        component = create(<EditorVerse {...props} />);
    }

    test('<EditorVerse /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <span
              className="verse"
            >
              <sup>
                5
              </sup>
              In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.
            </span>
        `);
    });
});
