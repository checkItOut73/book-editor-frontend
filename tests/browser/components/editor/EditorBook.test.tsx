import React from 'react';
import { create, act } from 'react-test-renderer';
import { EditorBook } from '@components/editor/EditorBook';

import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorBookChapterBottomNavigation } from '@components/editor/navigation/EditorBookChapterBottomNavigation';
import { Tooltip } from '@components/ui/Tooltip';
import { Layer } from '@components/ui/Layer';

jest.mock(
    '@components/editor/navigation/EditorBookChapterTopNavigation',
    () => ({
        EditorBookChapterTopNavigation: (props) => (
            <div {...props}>EditorBookChapterTopNavigationMock</div>
        )
    })
);

jest.mock('@components/editor/EditorBookContent', () => ({
    EditorBookContent: (props) => <div {...props}>EditorBookContentMock</div>
}));

jest.mock(
    '@components/editor/navigation/EditorBookChapterBottomNavigation',
    () => ({
        EditorBookChapterBottomNavigation: (props) => (
            <div {...props}>EditorBookChapterBottomNavigationMock</div>
        )
    })
);

jest.mock('@components/ui/Tooltip', () => ({
    Tooltip: (props) => <div {...props}>TooltipMock</div>
}));

jest.mock('@components/ui/Layer', () => ({
    Layer: (props) => <div {...props}>LayerMock</div>
}));

describe('<EditorBook />', () => {
    let props;
    let component;

    beforeEach(() => {
        props = {
            title: 'Book Title',
            chapters: [
                {
                    heading: 'Chapter 1',
                    number: 1,
                    paragraphs: []
                },
                {
                    heading: 'Chapter 2',
                    number: 2,
                    paragraphs: []
                }
            ]
        };
    });

    function renderComponent() {
        component = create(<EditorBook {...props} />);
    }

    test('<EditorBook /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            Array [
              <div
                className="book book--editor"
              >
                <div
                  activeChapterNumber={1}
                  chapters={
                    Array [
                      Object {
                        "heading": "Chapter 1",
                        "number": 1,
                        "paragraphs": Array [],
                      },
                      Object {
                        "heading": "Chapter 2",
                        "number": 2,
                        "paragraphs": Array [],
                      },
                    ]
                  }
                  setActiveChapterNumber={[Function]}
                  setLayerContent={[Function]}
                  setTooltipText={[Function]}
                >
                  EditorBookChapterTopNavigationMock
                </div>
                <div
                  activeChapterNumber={1}
                  chapters={
                    Array [
                      Object {
                        "heading": "Chapter 1",
                        "number": 1,
                        "paragraphs": Array [],
                      },
                      Object {
                        "heading": "Chapter 2",
                        "number": 2,
                        "paragraphs": Array [],
                      },
                    ]
                  }
                  setLayerContent={[Function]}
                  setTooltipText={[Function]}
                  title="Book Title"
                >
                  EditorBookContentMock
                </div>
                <div
                  activeChapterNumber={1}
                  chapters={
                    Array [
                      Object {
                        "heading": "Chapter 1",
                        "number": 1,
                        "paragraphs": Array [],
                      },
                      Object {
                        "heading": "Chapter 2",
                        "number": 2,
                        "paragraphs": Array [],
                      },
                    ]
                  }
                  setActiveChapterNumber={[Function]}
                  setLayerContent={[Function]}
                  setTooltipText={[Function]}
                >
                  EditorBookChapterBottomNavigationMock
                </div>
              </div>,
              <div
                text=""
              >
                TooltipMock
              </div>,
              <div
                layerContent={null}
                setLayerContent={[Function]}
              >
                LayerMock
              </div>,
            ]
        `);
    });

    describe('when activeChapterNumber is changed in the top navigation', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(EditorBookChapterTopNavigation)
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
            const bookContent = component.root.findByType(EditorBookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
        });

        describe('and when activeChapterNumber is changed back in the top navigation', () => {
            beforeEach(() => {
                act(() => {
                    component.root
                        .findByType(EditorBookChapterTopNavigation)
                        .props.setActiveChapterNumber(1);
                });
            });

            test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
                const bookContent =
                    component.root.findByType(EditorBookContent);

                expect(bookContent.props.activeChapterNumber).toBe(1);
            });
        });
    });

    describe('when the bottom navigation is clicked', () => {
        beforeEach(() => {
            renderComponent();

            act(() => {
                component.root
                    .findByType(EditorBookChapterBottomNavigation)
                    .props.setActiveChapterNumber(2);
            });
        });

        test('<EditorBook /> is rendered with correct activeChapterNumber', () => {
            const bookContent = component.root.findByType(EditorBookContent);

            expect(bookContent.props.activeChapterNumber).toBe(2);
        });
    });

    describe('setTooltipText | ', () => {
        describe('when the setTooltipText callback is called in the <EditorBookChapterTopNavigation /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookChapterTopNavigation)
                        .props.setTooltipText('click here');
                });
            });

            test('<EditorBook /> renders the tooltip correctly', () => {
                const tooltip = component.root.findByType(Tooltip);

                expect(tooltip.props.text).toBe('click here');
            });
        });

        describe('when the setTooltipText callback is called in the <EditorBookContent /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookContent)
                        .props.setTooltipText('some tooltip text');
                });
            });

            test('<EditorBook /> renders the tooltip correctly', () => {
                const tooltip = component.root.findByType(Tooltip);

                expect(tooltip.props.text).toBe('some tooltip text');
            });
        });

        describe('when the setTooltipText callback is called in the <EditorBookChapterBottomNavigation /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookChapterBottomNavigation)
                        .props.setTooltipText("that's awesome!");
                });
            });

            test('<EditorBook /> renders the tooltip correctly', () => {
                const tooltip = component.root.findByType(Tooltip);

                expect(tooltip.props.text).toBe("that's awesome!");
            });
        });
    });

    describe('setLayerContent | ', () => {
        describe('when the setLayerContent callback is called in the <EditorBookChapterTopNavigation /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookChapterTopNavigation)
                        .props.setLayerContent(<div>Top Navigation Layer</div>);
                });
            });

            test('<EditorBook /> renders the layer correctly', () => {
                const layer = component.root.findByType(Layer);

                expect(layer.props.layerContent).toEqual(
                    <div>Top Navigation Layer</div>
                );
            });
        });

        describe('when the setLayerContent callback is called in the <EditorBookContent /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookContent)
                        .props.setLayerContent(<div>Book Content Layer</div>);
                });
            });

            test('<EditorBook /> renders the layer correctly', () => {
                const layer = component.root.findByType(Layer);

                expect(layer.props.layerContent).toEqual(
                    <div>Book Content Layer</div>
                );
            });
        });

        describe('when the setLayerContent callback is called in the <EditorBookChapterBottomNavigation /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(EditorBookChapterBottomNavigation)
                        .props.setLayerContent(
                            <div>Bottom Navigation Layer</div>
                        );
                });
            });

            test('<EditorBook /> renders the layer correctly', () => {
                const layer = component.root.findByType(Layer);

                expect(layer.props.layerContent).toEqual(
                    <div>Bottom Navigation Layer</div>
                );
            });
        });

        describe('when the setLayerContent callback is called in the <Layer /> component', () => {
            beforeEach(() => {
                renderComponent();

                act(() => {
                    component.root
                        .findByType(Layer)
                        .props.setLayerContent(<div>Layer</div>);
                });
            });

            test('<EditorBook /> renders the layer correctly', () => {
                const layer = component.root.findByType(Layer);

                expect(layer.props.layerContent).toEqual(<div>Layer</div>);
            });
        });
    });
});
