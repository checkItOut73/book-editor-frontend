import React from 'react';
import { create } from 'react-test-renderer';
import { EditorVerse } from '@components/editor/EditorVerse';

import { EditVerseLayer } from '@components/editor/layers/EditVerseLayer';

jest.mock('@components/editor/layers/EditVerseLayer', () => ({
    EditVerseLayer: (props) => (
        <div {...props}>EditVerseLayerMock</div>
    )
}));

describe('<EditorVerse />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            id: 192,
            text: 'In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.',
            numberInChapter: 5,
            setLayerContent: jest.fn()
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
              onClick={[Function]}
            >
              <sup>
                5
              </sup>
              In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi.
            </span>
        `);
    });

    describe('when the verse is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root.findByProps({ className: 'verse' }).props.onClick();
        });

        test('setLayerContent is called with the correct content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <EditVerseLayer
                    id={192}
                    text="In a gloriously imagined 1920s world inhabited by people who have gramophones for heads, young composer Hero Wasabi has left Japan to study musical composition in Venice, accompanied by his oboe-playing cat Jacuzzi."
                    numberInChapter={5}
                />
            );
        });
    });
});
