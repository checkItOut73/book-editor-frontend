import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditParagraphHeadingLayer } from '@components/editor/layers/EditParagraphHeadingLayer';

describe('<EditParagraphHeadingLayer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            heading: 'The unforgiven step'
        };
    });

    function renderComponent() {
        component = create(<EditParagraphHeadingLayer {...props} />);
    }

    test('<EditParagraphHeadingLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-paragraph-heading-layer"
            >
              <h2>
                Paragraphüberschrift bearbeiten
              </h2>
              <p>
                <label>
                  Paragraphüberschrift:
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
