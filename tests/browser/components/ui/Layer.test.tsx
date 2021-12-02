import React from 'react';
import { create } from 'react-test-renderer';
import { Layer } from '@components/ui/Layer';

describe('<Layer />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            layerContent: <h1>Overview</h1>,
            setLayerContent: jest.fn()
        };
    });

    function renderComponent() {
        component = create(<Layer {...props} />);
    }

    test('<Layer /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="layer"
            >
              <div
                className="layer__overlay"
              />
              <div
                className="layer__content-container"
              >
                <div
                  className="layer__content"
                >
                  <h1>
                    Overview
                  </h1>
                </div>
                <span
                  className="layer__closer"
                  onClick={[Function]}
                >
                  x
                </span>
              </div>
            </div>
        `);
    });

    describe('if no layer content is given', () => {
        beforeEach(() => {
            props.layerContent = null;
        });

        test('<Layer /> does not render anything', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`null`);
        });
    });

    describe('when the layer closer is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'layer__closer' })
                .props.onClick();
        });

        test('setLayerContent is called with null', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(null);
        });
    });
});
