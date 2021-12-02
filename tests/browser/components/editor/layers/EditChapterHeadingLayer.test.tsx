import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditChapterHeadingLayer } from '@components/editor/layers/EditChapterHeadingLayer';

describe('<EditChapterHeadingLayer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            heading: 'The unforgiven step'
        };
    });

    function renderComponent() {
        component = create(<EditChapterHeadingLayer {...props} />);
    }

    test('<EditChapterHeadingLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-chapter-heading-layer"
            >
              <h2>
                Kapitelüberschrift bearbeiten
              </h2>
              <p>
                <label>
                  Kapitelüberschrift:
                </label>
                <input
                  autoFocus={true}
                  onChange={[Function]}
                  value="The unforgiven step"
                />
                <button>
                  Speichern
                </button>
              </p>
            </div>
        `);
    });

    describe('when the input is changed', () => {
        beforeEach(() => {
            const event = {
                target: {
                    value: 'The path to the end'
                }
            };

            act(() => {
                component.root.findByType('input').props.onChange(event);
            });
        });

        test('the input value is updated correctly', () => {
            expect(component.root.findByType('input').props.value).toBe(
                'The path to the end'
            );
        });
    });
});
