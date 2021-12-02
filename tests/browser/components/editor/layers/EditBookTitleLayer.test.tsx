import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditBookTitleLayer } from '@components/editor/layers/EditBookTitleLayer';

describe('<EditBookTitleLayer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            title: 'Book Title'
        };
    });

    function renderComponent() {
        component = create(<EditBookTitleLayer {...props} />);
    }

    test('<EditBookTitleLayer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="edit-book-title-layer"
            >
              <h2>
                Buchtitel bearbeiten
              </h2>
              <p>
                <label>
                  Buchtitel:
                </label>
                <input
                  autoFocus={true}
                  onChange={[Function]}
                  value="Book Title"
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
                    value: 'The most wanted book'
                }
            };

            act(() => {
                component.root.findByType('input').props.onChange(event);
            });
        });

        test('the input value is updated correctly', () => {
            expect(
                component.root.findByType('input').props.value
            ).toBe('The most wanted book');
        });
    });
});
