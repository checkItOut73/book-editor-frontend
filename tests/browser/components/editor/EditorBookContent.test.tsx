import React from 'react';
import { create } from 'react-test-renderer';
import { Context } from '@browser/context';
import { EditorBookContent } from '@components/editor/EditorBookContent';
import { EditorChapter } from '@components/editor/EditorChapter';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';
import { EditBookTitleLayer } from '@components/editor/layers/EditBookTitleLayer';

jest.mock('@components/editor/EditorChapter', () => ({
    EditorChapter: (props) => <div {...props} data-editor-chapter />
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div {...props}>TooltipTriggerDivMock</div>
}));

jest.mock('@components/editor/layers/EditBookTitleLayer', () => ({
    EditBookTitleLayer: (props) => <div {...props}>EditBookTitleLayerMock</div>
}));

describe('<EditorBookContent />', () => {
    let props;
    let component;
    let dispatch;
    let state;
    const getState = () => state;

    beforeEach(() => {
        props = {
            id: 23,
            title: 'Book Title',
            chapters: [
                {
                    id: 56,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 57,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: []
                }
            ],
            setTooltipText: jest.fn(),
            setLayerContent: jest.fn()
        };

        dispatch = jest.fn();
        state = {
            navigation: {
                activeChapterNumber: 1
            }
        };
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <EditorBookContent {...props} />
            </Context.Provider>
        );
    }

    test('<EditorBookContent /> renders the active chapter', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-content"
            >
              <div
                data-editor-chapter={true}
                heading="Chapter 1"
                id={56}
                number={1}
                paragraphs={Array []}
                setLayerContent={[MockFunction]}
                setTooltipText={[MockFunction]}
              >
                <h1
                  className="book-title"
                  onClick={[Function]}
                >
                  Book Title
                </h1>
              </div>
            </div>
        `);
    });

    test('setTooltipText is passed correctly to <EditorChapter />', () => {
        renderComponent();

        component.root
            .findByType(EditorChapter)
            .props.setTooltipText('click here!');

        expect(props.setTooltipText).toHaveBeenCalledWith('click here!');
    });

    test('setLayerContent is passed correctly to <EditorChapter />', () => {
        renderComponent();

        component.root
            .findByType(EditorChapter)
            .props.setLayerContent(<div>Chapter Layer</div>);

        expect(props.setLayerContent).toHaveBeenCalledWith(
            <div>Chapter Layer</div>
        );
    });

    describe('when the title is clicked', () => {
        beforeEach(() => {
            renderComponent();

            component.root
                .findByProps({ className: 'book-title' })
                .props.onClick();
        });

        test('setLayerContent is called with the correct layer content', () => {
            expect(props.setLayerContent).toHaveBeenCalledWith(
                <EditBookTitleLayer id={23} title="Book Title" />
            );
        });
    });
    describe('if no title is given', () => {
        beforeEach(() => {
            props.title = '';
        });

        test('<EditorBookContent /> renders the active chapter with title placeholder', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-editor-chapter={true}
                    heading="Chapter 1"
                    id={56}
                    number={1}
                    paragraphs={Array []}
                    setLayerContent={[MockFunction]}
                    setTooltipText={[MockFunction]}
                  >
                    <div
                      className="book-title-placeholder"
                      onClick={[Function]}
                      setTooltipText={[MockFunction]}
                      tooltipText="Buchtitel festlegen"
                    >
                      TooltipTriggerDivMock
                    </div>
                  </div>
                </div>
            `);
        });

        test('setTooltipText is passed correctly to <TooltipTriggerDiv />', () => {
            renderComponent();

            component.root
                .findByType(TooltipTriggerDiv)
                .props.setTooltipText('you have to check this!');

            expect(props.setTooltipText).toHaveBeenCalledWith(
                'you have to check this!'
            );
        });

        describe('when the title placeholder is clicked', () => {
            beforeEach(() => {
                renderComponent();

                component.root.findByType(TooltipTriggerDiv).props.onClick();
            });

            test('setLayerContent is called with the correct layer content', () => {
                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <EditBookTitleLayer id={23} title="" />
                );
            });
        });
    });

    describe('if the active chapter is not 1', () => {
        beforeEach(() => {
            state.navigation.activeChapterNumber = 2;
        });

        test('<EditorBookContent /> renders the active chapter without title', () => {
            renderComponent();

            expect(component).toMatchInlineSnapshot(`
                <div
                  className="book-content"
                >
                  <div
                    data-editor-chapter={true}
                    heading="Chapter 2"
                    id={57}
                    number={2}
                    paragraphs={Array []}
                    setLayerContent={[MockFunction]}
                    setTooltipText={[MockFunction]}
                  />
                </div>
            `);
        });
    });
});
